const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const path = require('path');
const webpush = require('web-push');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.use('/', express.static(path.join(__dirname + '/app')));

const publicKey = "BO0F0XHp7t7jaqtikbJ5jKS4am5ke3EyIwdA5_sXKBZEmKsm-JDuN_i1otDbpOkj6phMBspg4RpGx6iJrho7goI";
const privateKey = "p3go19O6WMpj76xP5g1cNZNQXqREwJnH7k-EPk345BM";

app.post('/api/send-push-msg', (req, res) => {
    const options = {
      vapidDetails: {
        subject: 'https://developers.google.com/web/fundamentals/',
        publicKey: publicKey,
        privateKey: privateKey
      },
      // 1 hour in seconds.
      TTL: 60 * 60
    };
  
    webpush.sendNotification(
      req.body.subscription,
      req.body.data,
      options
    )
    .then(() => {
      res.status(200).send({success: true});
    })
    .catch((err) => {
      if (err.statusCode) {
        res.status(err.statusCode).send(err.body);
      } else {
        res.status(400).send(err.message);
      }
    });
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT);