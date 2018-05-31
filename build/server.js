var express = require('express');
var CasClient = require('connect-cas2');
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var MemoryStore = require('session-memory-store')(session);
var history = require('connect-history-api-fallback');
let cors = require('cors');
const http = require('http')
const fs = require('fs')

var app = express();
app.use(cors());

app.use(cookieParser());
app.use(session({
  name: 'NSESSIONID',
  secret: 'Hello I am a long long long secret',
  store: new MemoryStore()  // or other session store
}));
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"
var casClient = new CasClient({
    debug: false,
    ignore: [],
    match: [],
    servicePrefix: 'http://127.0.0.1:3000',
    serverPath: 'https://cas.spark.com:8443',
    paths: {
      // validate: '',
      // serviceValidate: '/cas/serviceValidate',
      proxy: false,
      login: '/cas/login',
      logout: '/cas/logout',
      proxyCallback: false
    },
    restletIntegration: false,
    redirect: false,
    gateway: false,
    renew: false,
    slo: true,
    cache: {
      enable: false,
      ttl: 5 * 60 * 1000,
      filter: []
    },
    fromAjax: {
      header: 'x-client-ajax',
      status: 418
    }
});

app.use(casClient.core());

// NOTICE: If you want to enable single sign logout, you must use casClient middleware before bodyParser.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('dist'));
app.get('/', (req, res) => {
  res.sendFile(path.resolve('../dist/index.html'));
});

app.get('/logout', casClient.logout());

app.get('/getUser', (req, res) => {
  let user = req.session.cas.user
  res.send(user);
});

// or do some logic yourself
app.get('/logout', function(req, res, next) {
  // Do whatever you like here, then call the logout middleware
  casClient.logout()(req, res, next);
});

app.listen(3000);
