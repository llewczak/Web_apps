import {useState} from 'react'

export const Update = () => {
    const [state, setState] = useState({name:'Pomidor', price: 50});

    const changePrice = () => {
        setState(prevState => ({...prevState, price: 100}));
    }

    return (
        <>
            <div>Price of {state.name} is {state.price}</div>
            <button onClick={changePrice}>Change price</button>
        </>
    );
}