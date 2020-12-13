const redis = require('redis');
const keys = require('./keys');

const redisClient = redis.createClient({
    host: keys.redisHost,
    port: keys.redisPort,
    retry_strategy: () => 1000, // retry once per 1000ms
});
const sub = redisClient.duplicate();

function fibo(index) {
    if (index < 2) return 1;
    return fibo(index - 1) + fibo(index - 2);
}

sub.on('message', (channel, message) => {
    console.log('worker on message', channel, message);
    redisClient.hset(keys.redisFiboKey, message, fibo(parseInt(message)));
});
sub.subscribe(keys.redisFiboChannel);
