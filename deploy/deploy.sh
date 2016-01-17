#!/usr/bin/env bash

export RESULT_DIR=admin.server.${TRAVIS_BUILD_NUMBER}
export SSHPASS=${SSH_PASS}
export ARCH_NAME=server.package.tgz
export SYMLINK_NAME=admin.server
export PROCESS_NAME=admin.server

mkdir ${RESULT_DIR}
shopt -s extglob
mv -f !(${RESULT_DIR}) ./${RESULT_DIR}
tar -czf ${ARCH_NAME} ${RESULT_DIR}
sshpass -e scp -C -o StrictHostKeyChecking=no ${ARCH_NAME} ${SSH_USER}@${SSH_IP}:${WEB_PATH}
sshpass -e ssh -C ${SSH_USER}@${SSH_IP} << EOF
cd ${WEB_PATH};
tar -xzf ./${ARCH_NAME} -C ./;
rm ./${ARCH_NAME};
if [ ! -f ".env" ]; then
    echo APP_SECRET=${APP_SECRET} >> .env;
    echo APP_PUBLIC=${APP_PUBLIC} >> .env;
fi
cd ${RESULT_DIR};
npm install;
cd ..
rm -dRf ${SYMLINK_NAME}
ln -ds ${RESULT_DIR} ./${SYMLINK_NAME}
cd ./${SYMLINK_NAME}
pm2 stop ${PROCESS_NAME}
pm2 delete ${PROCESS_NAME}
pm2 start server.js --name="${PROCESS_NAME}"
EOF