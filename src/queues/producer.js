const amqp = require('amqplib');

async function sendNotification() {
  const connection = await amqp.connect('amqp://sharonp:pushpamma@localhost');
  const channel = await connection.createChannel();
  const queue = 'notifications';

  await channel.assertQueue(queue, { durable: true });

  const notification = {
    userId: '1234',
    message: 'You have a new message!'
  };

  channel.sendToQueue(queue, Buffer.from(JSON.stringify(notification)), {
    persistent: true,
    headers: { retries: 0 }
  });

  console.log(" [x] Sent notification:", notification);

  await channel.close();
  await connection.close();
}

sendNotification().catch(console.error);
