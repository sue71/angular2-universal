// the polyfills must be the first thing imported in node.js
import 'angular2-universal/polyfills';

import * as path from 'path';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';

// dummy server
import { serverApi } from './backend/api';

import { enableProdMode } from '@angular/core';
import { expressEngine } from 'angular2-universal';

if (process.env.NODE_ENV === 'production') {
  enableProdMode();
}

const app = express();
const ROOT = path.join(path.resolve(__dirname, '..'));

// Express View
app.engine('.html', expressEngine);
app.set('views', __dirname);
app.set('view engine', 'html');

app.use(cookieParser());
app.use(bodyParser.json());

// Serve static files
app.use('/assets', express.static(path.join(__dirname, 'assets'), {maxAge: 30}));
app.use(express.static(path.join(ROOT, 'dist/client'), {index: false}));

import { ngApp } from './main.node';

app.get('/data.json', serverApi);

// TODO: use route settings
app.get('/', ngApp);
app.get('/home', ngApp);
app.get('/home/*', ngApp);

app.get('*', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  const pojo = { status: 404, message: 'No Content' };
  const json = JSON.stringify(pojo, null, 2);
  res.status(404).send(json);
});

// Server
let server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on: http://localhost:${server.address().port}`);
});
