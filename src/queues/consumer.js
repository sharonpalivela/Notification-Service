const amqp = require('amqplib');
async function consumeNotifications() {
const connection = await amqp.connect('amqp://sharonp:pushpamma@localhost');
const channel = await connection.createChannel();
const queue = 'notifications';

await channel.assertQueue(queue, { durable: true });
channel.prefetch(1);

console.log(" [*] Waiting for notifications in %s. To exit press CTRL+C", queue);

channel.consume(queue, async (msg) => {
if (msg !== null) {
const notification = JSON.parse(msg.content.toString());
const retries = msg.properties.headers?.retries || 0;
try {
console.log(" [x] Processing notification:", notification);      
if (Math.random() < 0.5) {
throw new Error("Random failure processing notification");
}
console.log(" [✓] Notification processed successfully");
channel.ack(msg); 
} catch (error) {
console.log(` [!] Error: ${error.message}, retry count: ${retries}`);
if (retries < 3) {
channel.ack(msg); 
const newHeaders = Object.assign({}, msg.properties.headers, { retries: retries + 1 });
channel.sendToQueue(queue, msg.content, {
persistent: true,
headers: newHeaders,
});
console.log(` [>] Requeued message with retry ${retries + 1}`);
} else {
channel.ack(msg); 
console.log(" [x] Max retries reached. Discarding notification.");
}
}
}
});
}

consumeNotifications().catch(console.error);
