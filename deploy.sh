#!/bin/sh
set -e

ssh_run() {
    ssh -oStrictHostKeyChecking=no -i ./travis.key ${SSH_USER}@${SSH_HOST} "$1"
}

openssl aes-256-cbc -K $encrypted_16292a871be3_key -iv $encrypted_16292a871be3_iv -in travis.key.enc -out travis.key -d
chmod 0600 ./travis.key

ssh_run "systemctl --user stop sora-request.service"

rsync -avzh -e 'ssh -oStrictHostKeyChecking=no -i ./travis.key' --exclude node_modules --exclude .git --exclude design . ${SSH_USER}@${SSH_HOST}:${DEPLOY_PATH}
ssh_run "sh -c 'cd ${DEPLOY_PATH} && yarn install'"

ssh_run "systemctl --user start sora-request.service"