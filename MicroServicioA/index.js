const express = require('express');
const AWS = require('aws-sdk');
const app = express();
const port = 3000;

AWS.config.update({ region: 'us-east-1' }); 

const sqs = new AWS.SQS({ apiVersion: '2012-11-05' });
const queueUrl = 'https://sqs.us-east-1.amazonaws.com/153462137084/Microhomework';

app.get('/publish', (req, res) => {
  const params = {
    MessageBody: 'Pago procesado con éxito',
    QueueUrl: queueUrl,
  };

  sqs.sendMessage(params, (err, data) => {
    if (err) {
      console.log('Error al publicar el mensaje:', err);
      res.status(500).send('Error al publicar el mensaje');
    } else {
      console.log('Mensaje publicado con éxito:', data.MessageId);
      res.send('Mensaje publicado con éxito');
    }
  });
});

app.listen(port, () => {
  console.log(`Servicio A escuchando en el puerto ${port}`);
});
