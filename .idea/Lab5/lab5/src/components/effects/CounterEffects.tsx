import { useState, useEffect } from 'react'

export const CounterEffects = () => {
    const [count, setCount] = useState(0)

    useEffect(() => {
        console.log(`Hello World`);
    }, []);

    useEffect(() => {
        console.log(`Licznik zwiekszyl sie do ${count}`);
    }, [count]);

    return (
        <>
            <div className="card">
                <button onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                </button>
            </div>
        </>
    );
}