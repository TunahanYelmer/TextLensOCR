// redisClient.js
const redis = require('redis');
const client = redis.createClient();

client.on('error', (err) => {
  console.log("Error " + err);
});

function set(key, value) {
  client.set(key, value, redis.print);
}

function get(key) {
  return new Promise((resolve, reject) => {
    client.get(key, (err, reply) => {
      if (err) {
        reject(err);
      } else {
        resolve(reply);
      }
    });
  });
}

module.exports = { set, get };