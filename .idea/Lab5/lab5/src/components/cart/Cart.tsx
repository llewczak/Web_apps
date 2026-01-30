import {Product} from './Product.tsx'

export const Cart = () => {
    return (<div>
            <h3>Your cart:</h3>
            <Product name="Jablko"/>
            <Product name="Gruszka"/>
            <Product name="Banan"/>
            <Product name="Kiwi"/>
            <Product name="Cebula"/>
            </div>);
}