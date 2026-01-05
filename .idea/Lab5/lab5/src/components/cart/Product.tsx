interface ProductProps {
    name: string;
}
export const Product = (props: ProductProps) => {
    return (<h4>Product name: {props.name}</h4>);
}