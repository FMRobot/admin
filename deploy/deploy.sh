#!/usr/bin/env bash
echo "Starting deployment"
echo "Creating archive"
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

export SSHPASS=$SSH_PASS
sshpass -e scp -o StrictHostKeyChecking=no package.tgz $SSH_USER@$SSH_IP:$WEB_PATH

if [ $? != 0 ]; then
    echo $?
    echo 'Can not upload files'
    exit
fi

sshpass -e ssh $SSH_USER@$SSH_IP << EOF
bash;
type cd;
cd $WEB_PATH;
echo $PWD;
whoami;
tar -xvzf ./package.tgz;
rm ./package.tgz;
source ./build_$TRAVIS_COMMIT/deploy/deploy.sh;
EOF