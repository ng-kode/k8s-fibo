const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const redis = require('redis');
const { Pool } = require('pg');
const keys = require('./keys');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const pgClient = new Pool({
    host: keys.pgHost,
    port: keys.pgPort,
    user: keys.pgUser,
    password: keys.pgPassword,
    database: keys.pgDatabase,
});
const TABLE_NAME = 'fibo';
const COL1 = 'fibo_index';
pgClient
    .query(`CREATE TABLE IF NOT EXISTS ${TABLE_NAME} (${COL1} INT)`)
    .then(() => console.log('Table CREATED / FOUND: ' + TABLE_NAME))
    .catch((err) => console.log(err));

const redisClient = redis.createClient({
    host: keys.redisHost,
    port: keys.redisPort,
    retry_strategy: () => 1000, // retry once per 1000ms
});
const redisPublisher = redisClient.duplicate();

app.get('/', (req, res) => {
    res.send('Hi');
});

app.get('/values/all', async (req, res) => {
    const values = await pgClient.query(`SELECT * FROM ${TABLE_NAME};`);
    res.send(values.rows);
});

app.get('/values/current', async (req, res) => {
    redisClient.hgetall(keys.redisFiboKey, (err, values) => {
        res.send(values);
    });
});

app.post('/values', (req, res) => {
    const index = req.body.index;

    if (index > 40) {
        return res.status(422).send('Index > 40');
    }

    redisClient.hset(keys.redisFiboKey, index, "TODO");
    redisPublisher.publish(keys.redisFiboChannel, index, (err, reply) => {
        console.log(`After publish ${keys.redisFiboChannel}`, err, reply);
    });
    pgClient.query(`INSERT INTO ${TABLE_NAME}(${COL1}) VALUES($1)`, [index]);

    res.send({ working: true });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('Listening on port ' + PORT);
});
