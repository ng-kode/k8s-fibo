module.exports = {
    redisHost: process.env.REDIS_HOST,
    redisPort: process.env.REDIS_PORT,
    redisFiboKey: 'fibos',
    redisFiboChannel: 'insert_fibo',
};
