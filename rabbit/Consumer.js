const amqplib = require('amqplib/callback_api');
const queue1 = 'tasks';
const queue2 = 'confirm';
const {saveUser} = require("../MongoDb")

amqplib.connect('amqp://localhost', (err, conn) => {
  if (err) throw err;

  // Listener
  conn.createChannel((err, ch) => {
    if (err) throw err;

    ch.assertQueue(queue1);
    ch.assertQueue("confirm");
    
    ch.consume(queue1, (msg) => {
      if (msg !== null) {
       const obj = JSON.parse(msg.content.toString())

       if (obj){
        console.log(obj.id.toString())
        saveUser(obj);
        setInterval(() => {
          ch.sendToQueue(queue2, Buffer.from("Inserted user with id " + obj.id.toString()));
        }, 1000);
       }

   
        ch.ack(msg);
      } else {
        console.log('Consumer cancelled by server');
      }
    });
  });
});
