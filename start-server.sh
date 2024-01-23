#!/usr/bin/env bash

if [ -f /tmp/app/.env ]
then
  echo "[INFO][$(date)]: Copying environment variables file (/tmp/app/.env) to /app/.env"
  cat /tmp/app/.env  > /app/.env
  cat /app/.env
  echo ""
fi

echo "[INFO][$(date)]: Running the build in the production mode"
npx nx build rapp-ui --configuration=production
if [ $? -ne 0 ]; then
  echo "[ERROR][$(date)]: Build failed"
  exit -1
fi

OPTIONAL_ARGS=" "

if [ ${SSL_ENABLED} == "true" ]
then
	OPTIONAL_ARGS=" ${OPTIONAL_ARGS} --ssl-key ${APP_DIR}/ssl/${APP_NAME}/tls.key --ssl-cert ${APP_DIR}/ssl/${APP_NAME}/tls.crt "
fi

echo "[INFO][$(date)]: Starting application in the production mode"
serve -l ${DEFAULT_PORT} ${OPTIONAL_ARGS} -s dist/${APP_NAME}/
