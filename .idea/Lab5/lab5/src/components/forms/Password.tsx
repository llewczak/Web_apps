import {useState} from 'react'

export const Password = () => {
    const [firstPassword, setFisrtPassword] = useState('');
    const [secondPassword, setSecondPassword] = useState('');

    const isEmpty = firstPassword==='' || secondPassword==='';
    const notEquals = firstPassword!==secondPassword;

    return (
        <>
            <form>
                <label>Podaj haslo <input type={'text'} value={firstPassword} onChange={(e) => setFisrtPassword(e.target.value)}/></label>
                <label>Powtorz haslo <input type={'text'} value={secondPassword} onChange={(e) => setSecondPassword(e.target.value)}/></label>
            </form>
            <div>{isEmpty?(<span>Wypelnij oba pola</span>): notEquals?(<span>Hasla nie sa zgodne</span>):<span></span>}</div>
        </>
    );
}