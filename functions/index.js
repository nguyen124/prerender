//module.exports = require('./lib');
const express = require('express');
const app = express();
const functions = require('firebase-functions');
const bodyParser = require('body-parser');
const compression = require('compression');
const prerender = require('./lib');
const server = prerender();

server.use(prerender.sendPrerenderHeader());
// server.use(prerender.blockResources());
server.use(prerender.removeScriptTags());
server.use(prerender.httpHeaders());

app.disable('x-powered-by');
app.use(compression());

app.get('*', server.onRequest);

//dont check content-type and just always try to parse body as json
app.post('*', bodyParser.json({ type: () => true }), server.onRequest);
app.listen({ port: 3001 }, () => console.log(`Prerender server accepting requests on port 3001`))

server.start();

exports.prerender = functions.https.onRequest(app);
