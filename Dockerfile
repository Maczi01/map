FROM artifactshub.zinkworks.path-finders.link/3pp/node:18.12-slim

# define variables
ENV APP_NAME="rapp-ui"
ARG WORKING_DIR="/app"
ENV APP_DIR=$WORKING_DIR
ENV SSL_ENABLED="false"
ENV DEFAULT_PORT="5000"
ARG USERNAME="testuser"
ARG USER_UID=10001
ARG USER_GID=$USER_UID
ARG GROUP_NAME="zinkworks"

# switch to working dir
WORKDIR ${WORKING_DIR}
EXPOSE 5000

# create user
RUN addgroup --group $GROUP_NAME --gid $USER_GID
RUN adduser --system --uid $USER_UID --gid $USER_GID $USERNAME

# install serve
RUN npm install -g serve

# copy source code
COPY public public/
COPY .env package.json package-lock.json .eslintrc.json .eslintignore tsconfig.json tsconfig.app.json ./
COPY commitlint.config.js custom.d.ts index.html nx.json project.json tsconfig.spec.json tsconfig.storybook.json vite.config.ts ./
COPY src src/

# copy start script
COPY start-server.sh start-server.sh
RUN chmod +x start-server.sh

# change permissions
RUN chown -R $USERNAME:$GROUP_NAME $WORKING_DIR

# switch to user
USER $USERNAME

# install dependencies
RUN npm install

# Build application. This is to ensure application can be built. Application will be built again when container
# starts with correct environment variables
RUN npx nx build rapp-ui --configuration=production

# start application
ENTRYPOINT ["bash", "start-server.sh"]
