export const Ternary = () => {
    let a: boolean = true;
    let b: boolean = false;

    return (
        <>
            <div style={{margin: '20px'}}>
                <div>{a ? <span>Zdanie a jest prawdziwe</span> : <span>Zdanie a jest falszywe</span>}</div>
                <div>{b ? <span>Zdanie b jest prawdziwe</span> : <span>Zdanie b jest falszywe</span>}</div>
            </div>
        </>
    );
}