import {useState} from 'react'

export const Form = () => {
    const [text, setText] = useState('');

    return (
        <>
            <form>
                <label>Wpisz tekst <input type={'text'} value={text} onChange={(e) => setText(e.target.value)}/></label>
            </form>
            <div style={{margin: '20px'}}>{text}</div>
        </>
    );
}