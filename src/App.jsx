import React, {useState, useEffect} from 'react'
import "./utils/near";
import { check_signIn, get_state, signIn, increment, logout } from './utils/near';
function App() {
    const [wallet, setWallet] = useState(false);
    const [set, setSet] = useState(false); 
    const start = async() => {
        const t_wallet = await check_signIn();
        if(t_wallet){
            setWallet(t_wallet);
            const data =  await get_state();
            setSet(data);
        }
    }
    const signin = async() => {
        const t_account  = await signIn();
        setWallet(t_account);
    }
    const incremens = async() => {
        await increment();
    }
    const log = async() =>{
        logout();
        setWallet(false);
    }
    useEffect(() => {
        start().then().catch(err => console.log(err));
    },[wallet]);
  return (
        <>
            {wallet ? 
            <> 
            <h1>Hello, {wallet}</h1>
            <h1>{set}</h1>
            <button onClick={incremens}>increment</button>
            <button onClick={log}>Logout</button>
           </> 
            : <button onClick={signIn}>Please Sign In</button>} 
        </>
    )
}

export default App