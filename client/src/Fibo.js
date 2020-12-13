import { useState, useEffect } from 'react';
import * as api from './api';

function Fibo() {
    const [inputNumber, setInputNumber] = useState('');
    const [postgresValues, setPostgresValues] = useState(null);
    const [redisValues, setRedisValues] = useState(null);

    useEffect(() => {
        fetchPostgresValues();
        fetchRedisValues();
    }, []);

    async function fetchPostgresValues() {
        const values = await api.getPostgresValues();
        setPostgresValues(values);
    }

    async function fetchRedisValues() {
        const values = await api.getRedisValues();
        setRedisValues(values);
    }

    const onSubmitClick = async () => {
        const result = await api.postFiboIndex(inputNumber);
        console.log(result);
        setInputNumber('');
    }

    return <div>
        <input type="number" placeholder="Enter a number" value={inputNumber} onChange={e => setInputNumber(e.target.value)} />
        <button type="submit" onClick={onSubmitClick}>Submit</button>

        <h3>Values from Postgres</h3>
        <pre>{JSON.stringify(postgresValues, null, 2)}</pre>

        <h3>Values from Redis</h3>
        <pre>{JSON.stringify(redisValues, null, 2)}</pre>
    </div>
}

export default Fibo;