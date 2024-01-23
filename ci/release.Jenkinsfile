def externalScripts

pipeline {
  agent {
      kubernetes {
          label 'ci-build-agent'
          defaultContainer 'ci-build-agent'
      }
  }
  parameters {
    choice(name: 'PUBLISH_ARTIFACTS', choices: ['YES', 'NO'], description: 'Do you want to publish artifacts? IMPORTANT: It is mandatory to publsih artifacts in order to deploy')
    string(name: 'BRANCH_TO_BUILD', defaultValue: 'main', description: 'Which branch do you want to build from?')
    choice(name: 'PRODUCT_RELEASE', choices: ['NO', 'YES'], description: 'Do you want to trigger downstream product release pipelines for this release?')
    choice(name: 'RELEASE_TYPE', choices: ['PATCH', 'MINOR', 'MAJOR', 'NONE'], description: 'Select the release type. Given the current release version as x.y.z in pom.xml, Select PATCH for x.y.z+1, MINOR for x.y+1.0, MAJOR for x+1.0.0 and NONE for x.y.z')  
  }
  environment {
    GITHUB_API_TOKEN = credentials('zinkworks-github-ci-user-credentials')
    TEAMS_WEBHOOK_URL = credentials('zinkworks-teams-webhooks-url')
    ARTIFACTSHUB_CREDS = credentials('artifactshub-credentials')
    IMAGE_REGISTRY = "artifactshub.zinkworks.path-finders.link"
    STABLE_IMAGE_REPOSITORY = "release"
    UNSTABLE_IMAGE_REPOSITORY = "pre-release"
    IMAGE_NAME = "rapp-ui"
    STABLE_CHART_REPO = "https://artifactshub.zinkworks.path-finders.link/chartrepo/release"
    UNSTABLE_CHART_REPO = "https://artifactshub.zinkworks.path-finders.link/chartrepo/pre-release"
    ECR_REGISTRY = "115473357299.dkr.ecr.eu-west-1.amazonaws.com"
    CHART_NAME = "rapp-ui"
    AWS_DEFAULT_REGION = "eu-west-1"
    AWS_API_CREDENTIALS = credentials('zinkworks-aws-access-credentials')
    RELEASE_BRANCH="main"
    AWS_ROLE_TO_ASSUME = "arn:aws:iam::115473357299:role/pms-codepipeline-role"
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
          //8. Assume AWS role
          env.AWS_ACCESS_KEY_ID = sh ( script: 'echo $AWS_API_CREDENTIALS_USR', returnStdout: true ).trim()
          env.AWS_SECRET_ACCESS_KEY = sh ( script: 'echo $AWS_API_CREDENTIALS_PSW', returnStdout: true ).trim()
          env.GIT_REPO_URL = sh ( script: "echo https://\$(git config --get remote.origin.url | cut -f 2 -d '@' | tr ':' /)", returnStdout: true ).trim()
          env.GIT_BRANCH = sh ( script: 'git name-rev --name-only HEAD', returnStdout: true ).trim()
          env.COMMITTER_NAME = sh ( script: 'git log --pretty=oneline --format="%cn" | head -n 1', returnStdout: true ).trim()
          env.COMMITTER_EMAIL = sh ( script: 'git log --pretty=oneline --format="%ce" | head -n 1', returnStdout: true ).trim()
          env.COMMIT_HASH = sh ( script: 'git log --pretty=oneline --format="%H" | head -n 1', returnStdout: true ).trim()
          env.COMMIT_DATE = sh ( script: 'git log --pretty=oneline --format="%cd" | head -n 1', returnStdout: true ).trim()
          env.IMAGE_TAG = sh ( script: "./ci/scripts/common-scripts/bash/generate-semantic-version.sh ${env.BRANCH_TO_BUILD} ${env.RELEASE_BRANCH} ./package.json ${env.RELEASE_TYPE}", returnStdout: true ).trim()
          env.CHART_VERSION = env.IMAGE_TAG
          if ( params.BRANCH_TO_BUILD == env.RELEASE_BRANCH ){
            env.IMAGE_REPOSITORY = env.STABLE_IMAGE_REPOSITORY
            env.CHART_REPO = env.STABLE_CHART_REPO
            env.CHART_REPO_LOCAL = "release"
          }
          else {
            env.IMAGE_REPOSITORY = env.UNSTABLE_IMAGE_REPOSITORY
            env.CHART_REPO = env.UNSTABLE_CHART_REPO
            env.CHART_REPO_LOCAL = "pre-release"
          }
          // ECR is not used anymore but leaving the ecr login temporarily to allow full cutover is done for all images in docker-compose.yaml
          sh "aws ecr get-login-password --region ${env.AWS_DEFAULT_REGION} | docker login --username AWS --password-stdin ${env.ECR_REGISTRY}"
          sh "echo \'${env.ARTIFACTSHUB_CREDS_PSW}\' | docker login --username \'${env.ARTIFACTSHUB_CREDS_USR}\' --password-stdin ${env.IMAGE_REGISTRY}"
          sh "helm repo add --username \'${env.ARTIFACTSHUB_CREDS_USR}\' --password \'${env.ARTIFACTSHUB_CREDS_PSW}\' ${env.CHART_REPO_LOCAL} ${env.CHART_REPO} && helm repo list"
          sh 'git config --global user.email "beep.boop@Zinkworks.com"'
          sh 'git config --global user.name "ZinkworksBotBeepBoop"'
          sh "mkdir -p ~/.ssh && ssh-keyscan github.com >> ~/.ssh/known_hosts"
        }
        //Copy ssh private key to the agent
        withCredentials(bindings: [sshUserPrivateKey(credentialsId: 'zinkworks-ci-bot-ssh-key', \
                                  keyFileVariable: 'SSH_KEY_FOR_GITHUB', \
                                  passphraseVariable: '', \
                                  usernameVariable: 'ZinkworksBotBeepBoop')]) {
          sh "mkdir -p ~/.ssh && ssh-keyscan github.com >> ~/.ssh/known_hosts"
          sh "rm -rf ~/.ssh/id_rsa || echo '~/.ssh/id_rsa doesnt exist'"
          sh "cp \$SSH_KEY_FOR_GITHUB ~/.ssh/id_rsa"
        }
        //Load external.groovy script from mvt-ci submodule path
        script {
            externalScripts = load 'ci/scripts/common-scripts/groovy/external.groovy'
        }
      }
    }
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
    stage("Publish Artifacts"){
      when { expression { env.PUBLISH_ARTIFACTS == 'YES' }}
      steps {
        //1. Update origin repo with tags and the new pom.xml version
        //2. Publish docker image
        //3. Publish helm charts
        sh "./ci/scripts/common-scripts/bash/update-origin-version-file.sh ${env.BRANCH_TO_BUILD} ./package.json ${env.CHART_NAME} ${env.CHART_VERSION}"
        sh "docker push ${env.IMAGE_REGISTRY}/${env.IMAGE_REPOSITORY}/${env.IMAGE_NAME}:${env.IMAGE_TAG}"
        sh "helm cm-push --force ./${env.CHART_NAME}-${env.CHART_VERSION}.tgz ${env.CHART_REPO_LOCAL}"
        script {
            env.PUBLISHED_HELM_CHART = "${env.CHART_REPO}/${env.CHART_NAME}-${env.CHART_VERSION}.tgz"
            env.PUBLISHED_DOCKER_IMAGE = "${env.IMAGE_REGISTRY}/${env.IMAGE_REPOSITORY}/${env.IMAGE_NAME}:${env.IMAGE_TAG}"
        }
      }
    }
  }
    post {
        failure {
            script {
                env.NOTIFICATION_STATUS = "Failure"
                env.NOTIFICATION_COLOR  = "ff0000"
                externalScripts.notifyReleaseBuildStatus()
            }
        }
        success {
            script {
                if (params.PRODUCT_RELEASE == "YES"){
                  externalScripts.triggerProductRelease()
                }
                env.NOTIFICATION_STATUS = "Success"
                env.NOTIFICATION_COLOR  = "42FF00"
                externalScripts.notifyReleaseBuildStatus()
            }
        }
    }
}
