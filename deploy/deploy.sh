#!/usr/bin/env bash

export RESULT_DIR=build_$TRAVIS_BUILD_NUMBER
export SSHPASS=$SSH_PASS

echo "Starting deployment"
echo
echo ""

mkdir build_$TRAVIS_COMMIT
if [ $? != 0 ]; then
    echo $?
    echo 'Can not create folder'
    quit
fi

shopt -s extglob
mv -vf !(build_$TRAVIS_COMMIT) ./build_$TRAVIS_COMMIT/
if [ $? != 0 ]; then
    echo $?
    echo 'Can not move files'
    exit
fi

tar -czf package.tgz build_$TRAVIS_COMMIT
if [ $? != 0 ]; then
    echo $?
    echo 'Can not create archive'
    exit
fi

sshpass -e scp -o StrictHostKeyChecking=no package.tgz $SSH_USER@$SSH_IP:$WEB_PATH

if [ $? != 0 ]; then
    echo $?
    echo 'Can not upload files'
    exit
fi

sshpass -e ssh $SSH_USER@$SSH_IP << EOF
cd $WEB_PATH;
mkdir -p admin.server;
echo 'Extracting';
tar -xzf ./package.tgz -C ./;
echo 'Cleaning';
rm ./package.tgz;
echo 'Deploying';
cd $RESULT_DIR;
npm install;
if [ $? != 0 ]; then
    echo 'NPM INSTALL FAILED';
    quit;
fi
cd ..
rm -dRf admin.server
ln -ds $RESULT_DIR ./admin.server
cd admin.server
pm2
pm2 start server.js --name="admin.server"
pm2 stop admin.server
EOF