#!/bin/env node

var  http = require('http');
var  https = require('https');
var  fs = require('fs');
var  ws = require('ws');

var myname = "OpenShift-WSEcho";

function bin2hex (s) {
     var i, l, o = "", n;

     s += "";
     for (i = 0, l = s.length; i < l; i++) {
        n = s.charCodeAt(i).toString(16)
        o += n.length < 2 ? "0" + n : n;
     }

     return o;
}

var createWebSocketServer = function(proto_server) {
   var ws_server = new ws.Server({server: proto_server });
   ws_server.on('connection', function(conn) {
     console.log("connection = " + conn + ",  headers properties: ");
     console.log("websocket to host = " + conn.upgradeReq.headers.host);
     conn.on('message', function(msg, flags) {
       console.log('got a websocket message: ' + bin2hex(msg) );
       console.log('sending the same websocket message back - echo');
var myname = "OpenShift-WSEcho";
       conn.send(myname + ": " + msg, flags);
     });
     conn.on('close', function() { console.log('client said byebye'); });
     conn.send('websocket server app:  hello from wsapp');
   });
   return ws_server;
};

var app8080 = http.createServer(function(req,res) {
  console.log('got request ' + req.headers.host + req.url);
  res.end('hello world');
});
app8080.listen(8080, process.env.OPENSHIFT_DIY_IP);
createWebSocketServer(app8080);

