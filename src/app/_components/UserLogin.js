import React,{useState} from 'react'
import { useRouter } from "next/navigation";

const UserLogin = (props) => {
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const router=useRouter();
    const loginHandle=async()=>{
        console.log(email,password);
        let response = await fetch('http://localhost:3000/api/user/login', {
            method: 'post',
            body: JSON.stringify({email, password})
        })
        response = await response.json();
         if (response.success) {
            const {result}=response;
            delete result.password;
             localStorage.setItem('user',JSON.stringify(result));
           //  router.push('/')
            if(props?.redirect?.order){
                console.log("login if");
                router.push('/order')
             }else{
                console.log("login else");       
            }

         } else {
             alert("failed to login. Please try again with valid email and password")
         }
    } 
  return (
    <div>
          <div className="input-wrapper">
                <input type="text" placeholder="enter email"value={email} onChange={(event)=>setEmail(event.target.value)} className="input-field" />
            </div>
            <div className="input-wrapper">
                <input type="password" placeholder="enter password" value={password} onChange={(event)=>setPassword(event.target.value)}  className="input-field" />
            </div>
            <div className="input-wrapper">
                <button onClick={loginHandle}className="button">Login</button>
            </div>
    </div>
  )
}

export default UserLogin