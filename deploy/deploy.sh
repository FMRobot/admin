#!/usr/bin/env bash
echo "Starting deployment"
echo "Creating archive"
echo ""

mkdir bxuild$TRAVIS_COMMIT
if [ $? != 0 ]; then
    echo $?
    echo 'Can not create folder'
    quit
fi

shopt -s extglob
mv -vfR !(build$TRAVIS_COMMIT) ./build$TRAVIS_COMMIT
if [ $? != 0 ]; then
    echo $?
    echo 'Can not move files'
    exit
fi

tar -czf package.tgz build$TRAVIS_COMMIT
if [ $? != 0 ]; then
    echo $?
    echo 'Can not create archive'
    exit
fi

export SSHPASS=$SSH_PASS
sshpass -e scp package.tgz $SSH_USER@$SSH_IP:$WEB_PATH
if [ $? != 0 ]; then
    echo $?
    echo 'Can not upload files'
    exit
fi