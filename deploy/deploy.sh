#!/usr/bin/env bash
echo $PWD
mkdir build
mv * build
tar -czf package.tgz build
ls
export SSHPASS=$SSH_PASS
sshpass -e scp package.tgz $SSH_USER@$SSH_IP:$WEB_PATH
sshpass -e ssh $SSH_USER@$SSH_IP $WEB_PATH/build/deploy/deploy.sh