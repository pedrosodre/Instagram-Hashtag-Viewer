#!/bin/bash
git reset --hard
git pull
npm install
pm2 stop all
npm run production