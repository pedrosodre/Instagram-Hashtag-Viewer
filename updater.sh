#!/bin/bash
git stash
git pull
npm install
pm2 stop all
npm run production