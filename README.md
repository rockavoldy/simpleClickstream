# simpleClickstream
Simple Clickstream built with express, redis, kue, mongoose

requirement:

- mongoDB server
- redis-server

clone this repository, and install packages
```
npm install
```
when npm install done, run this command in different terminal
```
redis-server
node index.js
node worker.js
```
