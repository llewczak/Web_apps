import {Product} from "./Product.tsx"

interface NewCartProps {
    products: string[];
}

export const NewCart = (props: NewCartProps) => {
    return (
        <div>
            <h2>Your cart:</h2>
            {props.products.map(product => (
          <Product name={product}/>
                ))}
        </div>
    );
}