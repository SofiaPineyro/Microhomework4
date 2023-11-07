const AWS = require('aws-sdk');

AWS.config.update({ region: 'us-east-1' }); 

const sqs = new AWS.SQS({ apiVersion: '2012-11-05' });
const queueUrl = 'https://sqs.us-east-1.amazonaws.com/153462137084/Microhomework';

const pollMessages = () => {
  const params = {
    QueueUrl: queueUrl,
    MaxNumberOfMessages: 1,
    WaitTimeSeconds: 20, 
  };

  sqs.receiveMessage(params, (err, data) => {
    if (err) {
      console.log('Error al recibir mensajes:', err);
    } else if (data.Messages) {
      data.Messages.forEach((message) => {
        console.log('Mensaje recibido:', message.Body);

        // Eliminar el mensaje de la cola después de procesarlo
        const deleteParams = {
          QueueUrl: queueUrl,
          ReceiptHandle: message.ReceiptHandle,
        };
        sqs.deleteMessage(deleteParams, (err) => {
          if (err) {
            console.log('Error al eliminar el mensaje:', err);
          }
        });
      });
    }

    // Realiza un nuevo ciclo de polling
    pollMessages();
  });
};

pollMessages();
