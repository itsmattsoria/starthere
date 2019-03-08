#!/usr/bin/env bash

npm install bower
npm install
cd assets
bower install

cd ./
gulp
