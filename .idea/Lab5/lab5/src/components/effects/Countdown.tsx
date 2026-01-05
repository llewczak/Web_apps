import {useState, useEffect} from 'react'

export const Countdown = () => {
    const [seconds, setSeconds] = useState(15);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        let intervalId: number | undefined;
        if (seconds <= 0) return;
        if (isRunning) {
            intervalId = setInterval(() => {
                setSeconds(prev => {
                    if (prev <= 0.1) {
                        return 0;
                    }

                    return prev - 0.1;
                });
            }, 100);
        }

        return () => clearInterval(intervalId);
    }, [isRunning]);

    useEffect(() => {
        if (seconds === 0) {
            setIsRunning(false);
        }
    }, [seconds]);

    const handleClick = () => {
        if (seconds <= 0) {
            setIsRunning(true);
            setSeconds(15);
        } else if (isRunning) {
            setIsRunning(false);
        } else {
            setIsRunning(true);
        }
    }

    const buttonLabel = () => {
        if (isRunning) return "Stop"
        else if (seconds <= 0) return "Reset"
        return "Start"
    }

    return (
        <>
            <div style={{margin: '20px'}}>
                <div>{seconds.toFixed(1)}s</div>
                <button onClick={handleClick}>{buttonLabel()}</button>
            </div>
        </>
    );
}