#!/bin/bash
chown www-data:www-data frontend -R
git reset --hard
git pull
npm install
pm2 stop all
npm run production