#!/usr/bin/env bash
echo "Starting deployment"
echo "Creating archive"
echo $PWD
mkdir build$TRAVIS_COMMIT
mv * build$TRAVIS_COMMIT
tar -czf package.tgz build$TRAVIS_COMMIT
ls
export SSHPASS=$SSH_PASS
sshpass -e scp package.tgz $SSH_USER@$SSH_IP:$WEB_PATH
sshpass -e ssh $SSH_USER@$SSH_IP $WEB_PATH/build/deploy/deploy.sh