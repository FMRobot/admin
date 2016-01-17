#!/usr/bin/env bash

export RESULT_DIR=admin.frontend.$TRAVIS_BUILD_NUMBER
export SSHPASS=$SSH_PASS
export ARCH_NAME=frontend.package.tgz
export SYMLINK_NAME=admin.frontend

echo "Starting deploy"

mkdir $RESULT_DIR
if [ $? != 0 ]; then
    echo $?
    echo 'Can not create folder'
    quit
fi

shopt -s extglob
mv -vf ./build/* ./$RESULT_DIR
if [ $? != 0 ]; then
    echo $?
    echo 'Can not move files'
    exit
fi

tar -czf $ARCH_NAME $RESULT_DIR
if [ $? != 0 ]; then
    echo $?
    echo 'Can not create archive'
    exit
fi

sshpass -e scp -C -o StrictHostKeyChecking=no $ARCH_NAME $SSH_USER@$SSH_IP:$WEB_PATH

if [ $? != 0 ]; then
    echo $?
    echo 'Can not upload files'
    exit
fi

sshpass -e ssh -C $SSH_USER@$SSH_IP << EOF
cd $WEB_PATH;
echo 'Extracting';
tar -xzf ./$ARCH_NAME -C ./;
echo 'Cleaning';
rm ./$ARCH_NAME;
echo 'Linking';
rm -dRf $SYMLINK_NAME
ln -ds $RESULT_DIR ./$SYMLINK_NAME
EOF