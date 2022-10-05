const amqplib = require('amqplib/callback_api');
const { User } = require('../User');
const queue = 'tasks';
const fs = require("fs");

amqplib.connect('amqp://localhost', (err, conn) => {
  if (err) throw err;

  // Sender
  conn.createChannel((err, ch) => {
    if (err) throw err;

    ch.assertQueue(queue);
    fs.readFile(__dirname + '/Users.json', 'utf8', function (err, data) {
      if (err) {
          console.error(err)
          throw "unable to read .czrc file.";
      }
     const obj = JSON.parse(data)
  
     obj.forEach(user => {
      console.log(`First name: ${user.id}`);
      const msg = JSON.stringify(user);
      console.log(msg)
      setInterval(() => {
        ch.sendToQueue(queue, Buffer.from(msg));
      }, 1000);
  }); 
  });
    
  });
});