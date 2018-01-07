const express = require('express');
const app = express();
const { fork } = require('child_process');

const urlencodedParser = express.urlencoded({extended: false})

let childProcess = fork('rpc.js');

app.post('/taiga', urlencodedParser, (req, res) => {
  console.log(req.body);
  if (req.body && req.body.playstatus === 'stopped') {
    console.log('stop');
    childProcess.send({type: 'stop'});
    childProcess = fork('rpc.js');
  } else if (req.body && req.body.playstatus === 'playing') {
    console.log('start');
    childProcess.send({type: 'update', payload: req.body});
  }
  res.send('OK')
});

app.listen(5000);
