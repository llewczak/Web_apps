import './App.css'
//import {Cart} from './components/cart/Cart.tsx'
import {NewCart} from './components/cart/NewCart.tsx'
//import {Counter} from './components/counters/Counter.tsx'
import {NewCounter} from './components/counters/NewCounter.tsx'
import {Form} from './components/forms/Form.tsx'
import {Password} from './components/forms/Password.tsx'
import {SignUp} from './components/forms/SignUp.tsx'
import {Ternary} from './components/other/Ternary.tsx'
import {Update} from './components/other/Update.tsx'
import {Students} from './components/students/Students.tsx'
import {StudentManager} from './components/students/StudentManager.tsx'
import {CounterEffects} from './components/effects/CounterEffects.tsx'
import {Title} from './components/effects/Title.tsx'
import {Countdown} from './components/effects/Countdown.tsx'
import {Comments} from './components/products/Comments.tsx'

function App() {
    return (
        <>
            <h3>---Zadanie 1---</h3>
            <NewCart products={["Jablko", "Gruszka", "Banan", "Kiwi", "Truskawki"]}/>
            <h3 style={{marginTop: '50px'}}>---Zadanie 2---</h3>
            <NewCounter/>
            <h3 style={{marginTop: '50px'}}>---Zadanie 3.1---</h3>
            <Form/>
            <h3 style={{marginTop: '50px'}}>---Zadanie 3.2---</h3>
            <Password/>
            <h3 style={{marginTop: '50px'}}>---Zadanie 3.3---</h3>
            <SignUp/>
            <h3 style={{marginTop: '50px'}}>---Zadanie 4.1---</h3>
            <Ternary/>
            <h3 style={{marginTop: '50px'}}>---Zadanie 4.2---</h3>
            <Update/>
            <h3 style={{marginTop: '50px'}}>---Zadanie 5.1---</h3>
            <Students/>
            <h3 style={{marginTop: '50px'}}>---Zadanie 5.2---</h3>
            <StudentManager/>
            <h3 style={{marginTop: '50px'}}>---Zadanie 6.1---</h3>
            <CounterEffects/>
            <h3 style={{marginTop: '50px'}}>---Zadanie 6.2---</h3>
            <Title/>
            <h3 style={{marginTop: '50px'}}>---Zadanie 6.3---</h3>
            <Countdown/>
            <h3 style={{marginTop: '50px'}}>---Zadanie 7.1 i 7.2---</h3>
            <Comments/>
        </>
    );
}

export default App
