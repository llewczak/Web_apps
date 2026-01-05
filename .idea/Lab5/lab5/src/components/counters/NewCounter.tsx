import { useState } from 'react'
import {Button} from './Button.tsx'

export const NewCounter = () => {
    const [count, setCount] = useState(0)

    return (
        <>
            <div className="card">
                <Button label={`count is ${count}`} onClick={()=> setCount((count) => count + 1)}></Button>
            </div>
        </>
    );
}