#!/bin/bash

source /etc/reuters/user_data

export CLOUD_DATACENTER=Amazon
export LOG=/opt/reuters/data/nodejs/logs
export APP=/opt/reuters/apps/nodejs/server

sudo -E -u nodejs pm2 --merge-logs --log-date-format='YYYY-MM-DD HH:mm Z' -e ${LOG}/err.log -o ${LOG}/out.log start ${APP}/server-runner.js
sudo -E -u nodejs pm2 save
sudo -E -u nodejs pm2 startup