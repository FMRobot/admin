#!/usr/bin/env bash
echo "Starting deployment"
echo "Creating archive"
echo "\n"

mkdir build$TRAVIS_COMMIT
if [ $? != 0 ]; then
    echo 'Can not create folder\n'
    quit
fi

mv -v ./* ./build$TRAVIS_COMMIT
if [ $? != 0 ]; then
    echo 'Can not move files\n'
    quit
fi

tar -czf package.tgz build$TRAVIS_COMMIT
if [ $? != 0 ]; then
    echo 'Can not create archive\n'
    quit
fi

export SSHPASS=$SSH_PASS
sshpass -e scp package.tgz $SSH_USER@$SSH_IP:$WEB_PATH
if [ $? != 0 ]; then
    echo 'Can not upload files\n'
    quit
fi