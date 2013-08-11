killall -9 node
supervisor -e 'js|ejs|node|coffee' -- --debug=60342 server.js
