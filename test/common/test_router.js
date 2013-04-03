#!/usr/bin/env node
 
// Generated by CoffeeScript 1.4.0
(function() {
  var Router, argv, http, router, server;

  try {
    Router = require('node-simple-router');
  } catch (e) {
    Router = require('../../lib/router');
  }

  http = require('http');

  router = Router({
    list_dir: true
  });

  /*
  Example routes
  */


  router.get("/hello", function(req, res) {
    return res.end("Hello, World!, Hola, Mundo!");
  });

  router.get("/users", function(req, res) {
    res.writeHead(200, {
      'Content-type': 'text/html'
    });
    return res.end("<h1 style='color: navy; text-align: center;'>Active members registry</h1>");
  });

  router.post("/users", function(req, res) {
    var key, val, _ref, _ref1, _ref2;
    router.log("\n\nBody of request is: " + (req.body.toString()) + "\nRequest content type is: " + req.headers['content-type']);
    router.log("\nRequest Headers");
    _ref = req.headers;
    for (key in _ref) {
      val = _ref[key];
      router.log("" + key + " = " + val);
    }
    router.log("\nRequest body object properties");
    res.write("\nRequest body object properties\n");
    try {
      _ref1 = req.body;
      for (key in _ref1) {
        val = _ref1[key];
        router.log("" + key + ": " + val);
      }
    } catch (e) {
      res.write("Looks like you did something dumb: " + (e.toString()) + "\n");
    }
    _ref2 = req.body;
    for (key in _ref2) {
      val = _ref2[key];
      res.write("" + key + " = " + val + "\n");
    }
    return res.end();
  });

  router.get("/users/:id", function(req, res) {
    res.writeHead(200, {
      'Content-type': 'text/html'
    });
    return res.end("<h1>User No: <span style='color: red;'>" + req.params.id + "</span></h1>");
  });

  /*
  End of example routes
  */


  argv = process.argv.slice(2);

  server = http.createServer(router);

  server.on('listening', function() {
    var addr;
    addr = server.address() || {
      address: '0.0.0.0',
      port: argv[0] || 8000
    };
    return router.log("Serving web content at " + addr.address + ":" + addr.port);
  });

  process.on("SIGINT", function() {
    server.close();
    router.log("\n Server shutting up...\n");
    return process.exit(0);
  });

  server.listen((argv[0] != null) && !isNaN(parseInt(argv[0])) ? parseInt(argv[0]) : 8000);

}).call(this);
