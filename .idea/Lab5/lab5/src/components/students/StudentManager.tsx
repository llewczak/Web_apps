import {useState} from "react";

interface Student {
    firstName: string;
    lastName: string;
    year: number;
}

export const StudentManager = () => {
    const [students, setStudents] = useState<Student[]>([{
        firstName: "marek",
        lastName: "kowalski",
        year: 2000
    }, {firstName: "aga", lastName: "pak", year: 2001}, {firstName: "jarek", lastName: "faret", year: 2000}])

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [year, setYear] = useState(0);

    const addStudent = (e: React.MouseEvent ,fname: string, lname: string, y: number) => {
        e.preventDefault()
        const newStudent: Student = {
            firstName: fname,
            lastName: lname,
            year: y,
        }
        setStudents(prevState => ([...prevState, newStudent]));
        setFirstName('');
        setLastName('');
        setYear(0);
    }

    const isEmpty = firstName === '' || lastName === '';

    return (
        <>
            <table style={{margin: '20px', border: '1px solid white', borderCollapse: 'collapse'}}>
                <tr>
                    <th style={{border: '1px solid white', borderCollapse: 'collapse'}}>First Name</th>
                    <th style={{border: '1px solid white', borderCollapse: 'collapse'}}>Last Name</th>
                    <th style={{border: '1px solid white', borderCollapse: 'collapse'}}>Year</th>
                </tr>
                {students.map((student) => (
                    <tr style={{border: '1px solid white', borderCollapse: 'collapse'}}>
                        <td style={{border: '1px solid white', borderCollapse: 'collapse'}}>{student.firstName}</td>
                        <td style={{border: '1px solid white', borderCollapse: 'collapse'}}>{student.lastName}</td>
                        <td style={{border: '1px solid white', borderCollapse: 'collapse'}}>{student.year}</td>
                    </tr>
                ))}
            </table>
            <form>
                <label>Podaj imie <input type={'text'} value={firstName} onChange={(e) => setFirstName(e.target.value)}/></label>
                <label>Podaj nazwisko <input type={'text'} value={lastName} onChange={(e) => setLastName(e.target.value)}/></label>
                <label>Podaj rocznik <input type={'number'} value={year} onChange={(e) => setYear(e.target.valueAsNumber)}/></label>
                <button disabled={isEmpty} onClick={(e) => addStudent(e,firstName, lastName, year)}>Dodaj studenta</button>
            </form>
        </>
    );
}