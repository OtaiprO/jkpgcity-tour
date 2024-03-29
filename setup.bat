@echo off

npm init -y
npm install

cd server
npm init -y
npm install

cd ..
cd client
npm init -y
npm install

cd ..