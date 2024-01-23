def externalScripts

pipeline {
    agent {
        kubernetes {
            label 'ci-build-agent'
            defaultContainer 'ci-build-agent'
        }
    }
    environment {
      GITHUB_API_TOKEN = credentials('zinkworks-github-ci-user-credentials')
      TEAMS_WEBHOOK_URL = credentials('zinkworks-teams-webhooks-url')
      ARTIFACTSHUB_CREDS = credentials('artifactshub-credentials')
      IMAGE_REGISTRY = "artifactshub.zinkworks.path-finders.link"
      IMAGE_REPOSITORY = "pre-release"
      IMAGE_NAME = "rapp-ui"
      CHART_REPO = "https://artifactshub.zinkworks.path-finders.link/chartrepo/pre-release"
      CHART_NAME = "rapp-ui"
      ECR_REGISTRY = "115473357299.dkr.ecr.eu-west-1.amazonaws.com"
      AWS_DEFAULT_REGION = "eu-west-1"
      AWS_API_CREDENTIALS = credentials('zinkworks-aws-access-credentials')
      AWS_ROLE_TO_ASSUME = "arn:aws:iam::115473357299:role/pms-codepipeline-role"
      DEPLOYMENT_CLUSTER = "path-finders-integration"
      RELEASE_BRANCH = "main"
      RELEASE_TYPE = "NONE"
			SONARQUBE_SERVER_NAME = 'sonar.path-finders.link'
      SONARQUBE_APITOKEN_CREDS_ID = 'zinkworks-sonarqube-api-token'
    }
    stages {
      stage ("Wait For Docker Daemon"){
        steps {
          //Wait until docker-daemon sidecar container starts [This is required as we run jenkins agents as pods]
          sh "until docker ps 1>&2 2>/dev/null; do echo '[INFO] Waiting for docker daemon to be available'; sleep 5s;done"
        }
      }
      stage ("Cleanup Workspace"){
        steps {
            //1. Cleaning up workspace for any previous artifacts.
            //2. Cleaning up docker containers history for any previous runs.
            //3. Cleaning up docker volumes for any previous runs.
            sh "git config --global --add safe.directory ${env.WORKSPACE} && git clean -f"
            sh "docker rm \$(docker ps -aq) 2>/dev/null || echo [INFO] No docker containers found."
            sh "docker volume rm \$(docker volume ls -q) 2>/dev/null || echo [INFO] No docker volumes found."
          }
      }
      stage ("Initialize Environment"){
        steps {
          script {
            //1. Set AWS access key for the build
            //2. Set AWS Secret key for the build
            //3. Get git pr details
            //4. Set versions for the build
            //5. Update settings.xml with credentials
            //6. Login to ECR
            //7. Initiallize local helm repo
            //8. Update kubeconfig
            //9. Set build status on github PR
            env.AWS_ACCESS_KEY_ID = sh ( script: 'echo $AWS_API_CREDENTIALS_USR', returnStdout: true ).trim()
            env.AWS_SECRET_ACCESS_KEY = sh ( script: 'echo $AWS_API_CREDENTIALS_PSW', returnStdout: true ).trim()
            env.GIT_REPO_URL = sh ( script: "echo https://\$(git config --get remote.origin.url | cut -f 2 -d '@' | tr ':' /)", returnStdout: true ).trim()
            env.GIT_BRANCH = sh ( script: 'git name-rev --name-only HEAD', returnStdout: true ).trim()
            env.COMMITTER_NAME = sh ( script: 'git log --pretty=oneline --format="%cn" | head -n 1', returnStdout: true ).trim()
            env.COMMITTER_EMAIL = sh ( script: 'git log --pretty=oneline --format="%ce" | head -n 1', returnStdout: true ).trim()
            env.COMMIT_HASH = sh ( script: 'git log --pretty=oneline --format="%H" | head -n 1', returnStdout: true ).trim()
            env.COMMIT_DATE = sh ( script: 'git log --pretty=oneline --format="%cd" | head -n 1', returnStdout: true ).trim()
            env.IMAGE_TAG = sh ( script: "./ci/scripts/common-scripts/bash/generate-semantic-version.sh ${env.GIT_BRANCH} ${env.RELEASE_BRANCH} ./package.json ${env.RELEASE_TYPE}", returnStdout: true ).trim()
            env.CHART_VERSION = env.IMAGE_TAG
						env.CHART_REPO_LOCAL = "pre-release"
            // ECR is not used anymore but leaving the ecr login temporarily to allow full cutover is done for all images in docker-compose.yaml
            sh "aws ecr get-login-password --region ${env.AWS_DEFAULT_REGION} | docker login --username AWS --password-stdin ${env.ECR_REGISTRY}"
            sh "echo \'${env.ARTIFACTSHUB_CREDS_PSW}\' | docker login --username \'${env.ARTIFACTSHUB_CREDS_USR}\' --password-stdin ${env.IMAGE_REGISTRY}"
            sh "helm repo add --username \'${env.ARTIFACTSHUB_CREDS_USR}\' --password \'${env.ARTIFACTSHUB_CREDS_PSW}\' ${env.CHART_REPO_LOCAL} ${env.CHART_REPO} && helm repo list"
            sh "aws eks update-kubeconfig --name ${env.DEPLOYMENT_CLUSTER} --role-arn ${env.AWS_ROLE_TO_ASSUME} && kubectl version"
            setGitHubPullRequestStatus context: 'Jenkins rapp-ui Precode-Review', state: 'PENDING', message: 'Pull request verification has started.'
          }

          //Load external.groovy script from mvt-ci submodule path
          script {
            externalScripts = load 'ci/scripts/common-scripts/groovy/external.groovy'
          }
        }
      }
			/*stage('SonarQube Analysis') {
        steps {
          withSonarQubeEnv  ( credentialsId: env.SONARQUBE_APITOKEN_CREDS_ID, 
                              installationName: env.SONARQUBE_SERVER_NAME ) { 
						//TO-DO
          }
        }
      }*/
      stage("Build Docker Image"){
        steps {
          //1. Build docker image
          sh "docker build \
              --label COMMIT_HASH=\"${env.COMMIT_HASH}\" \
              --label COMMIT_DATE=\"${env.COMMIT_DATE}\" \
              --label COMMITTER_NAME=\"${env.COMMITTER_NAME}\" \
              --label COMMITTER_EMAIL=\"${env.COMMITTER_EMAIL}\" \
              --label GIT_REPO_URL=\"${env.GIT_REPO_URL}\" \
              --label GIT_BRANCH=\"${env.GIT_BRANCH}\" \
              --label APP_VERSION=\"${env.IMAGE_TAG}\" \
              --label BUILD_DATE=\"\$(date)\" \
              -t ${env.IMAGE_REGISTRY}/${env.IMAGE_REPOSITORY}/${env.IMAGE_NAME}:${env.IMAGE_TAG} ."
        }
      }
      stage("Package Helm Chart"){
        steps {
          //1. Package helm chart
          sh "./ci/scripts/common-scripts/bash/helm-package.sh ./charts/${env.CHART_NAME} \
                                                                CHART_VERSION=${env.CHART_VERSION} \
                                                                IMAGE_TAG=${env.IMAGE_TAG} \
                                                                IMAGE_REGISTRY=${env.IMAGE_REGISTRY}\
                                                                IMAGE_REPOSITORY=${env.IMAGE_REPOSITORY}"
        }
      }
      stage("Validate Kubernetes Manifests"){
        steps {
          //1. Validate kubernetes manifests
          //2. Validate helm installation
          sh "helm template ./${env.CHART_NAME}-${env.CHART_VERSION}.tgz | kubectl apply --dry-run=server -f -"
          sh "helm install --namespace default ${env.CHART_NAME}-precode ./${env.CHART_NAME}-${env.CHART_VERSION}.tgz --debug --dry-run"
        }
      }
      stage("Publish Artifacts"){
        when { expression { env.PUBLISH_ARTIFACTS == 'YES' }}
        steps {
          //1. Publish docker image
          //2. Publish helm charts
          sh "docker push ${env.IMAGE_REGISTRY}/${env.IMAGE_REPOSITORY}/${env.IMAGE_NAME}:${env.IMAGE_TAG}"
          sh "helm cm-push --force ./${env.CHART_NAME}-${env.CHART_VERSION}.tgz ${env.CHART_REPO_LOCAL}"
        }
      }
    }
    post {
      failure {
        setGitHubPullRequestStatus context: 'Jenkins rapp-ui Precode-Review', state: 'FAILURE', message: 'Pull request verification has failed.'
        script {
          env.NOTIFICATION_STATUS = "Failure"
          env.NOTIFICATION_COLOR  = "ff0000"
          externalScripts.notifyPrBuildStatus()
        }
      }
      success {
        setGitHubPullRequestStatus context: 'Jenkins rapp-ui Precode-Review', state: 'SUCCESS', message: 'Pull request verification has passed.'
        script {
          env.NOTIFICATION_STATUS = "Success"
          env.NOTIFICATION_COLOR  = "42FF00"
          externalScripts.notifyPrBuildStatus()
        }
      }
    }
}
