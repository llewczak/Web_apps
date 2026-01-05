interface Student {
    firstName: string;
    lastName: string;
    year: number;
}

export const Students = () => {
    const Students:Student[] = [{firstName:"marek", lastName: "kowalski", year: 2000}, {firstName:"aga", lastName: "pak", year: 2001}, {firstName:"jarek", lastName: "faret", year: 2000}]

    return (
        <table style={{margin: '20px', border: '1px solid white', borderCollapse: 'collapse'}}>
            <tr>
                <th style={{border: '1px solid white', borderCollapse: 'collapse'}}>First Name</th>
                <th style={{border: '1px solid white', borderCollapse: 'collapse'}}>Last Name</th>
                <th style={{border: '1px solid white', borderCollapse: 'collapse'}}>Year</th>
            </tr>
            {Students.map((student) => (
                <tr style={{border: '1px solid white', borderCollapse: 'collapse'}}>
                    <td style={{border: '1px solid white', borderCollapse: 'collapse'}}>{student.firstName}</td>
                    <td style={{border: '1px solid white', borderCollapse: 'collapse'}}>{student.lastName}</td>
                    <td style={{border: '1px solid white', borderCollapse: 'collapse'}}>{student.year}</td>
                </tr>
                ))}
        </table>
    );
}