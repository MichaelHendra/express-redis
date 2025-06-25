const {createClient} = require('redis')

const redisClient = createClient(
   { url: 'redis://default@192.168.1.3:6379',}
);

redisClient.on('error',(err) => console.error('Redis Error:',err));

(async () => {
    await redisClient.connect();
    console.log("Redis is Connected");
})();

module.exports = redisClient;