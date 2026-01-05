import {useState} from 'react'

export const SignUp = () => {
    const [username, setUsername] = useState('');
    const [firstPassword, setFisrtPassword] = useState('');
    const [secondPassword, setSecondPassword] = useState('');

    const isEmpty = firstPassword==='' || secondPassword==='' || username==='';
    const notEquals = firstPassword!==secondPassword;

    return (
        <>
            <form style={{margin: '20px'}}>
                <label>Podaj nazwe uzytkownika <input type={'text'} value={username} onChange={(e) => setUsername(e.target.value)}/></label>
                <label>Podaj haslo <input type={'text'} value={firstPassword} onChange={(e) => setFisrtPassword(e.target.value)}/></label>
                <label>Powtorz haslo <input type={'text'} value={secondPassword} onChange={(e) => setSecondPassword(e.target.value)}/></label>
            </form>
            <button disabled={isEmpty} onClick={() => isEmpty? alert("Puste Pole"):notEquals? alert("Hasla nie sa zgodne"):alert("Zalogowano pomyslnie")}>Sign Up</button>
        </>
    );
}