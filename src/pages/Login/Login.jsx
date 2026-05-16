import React, { useState } from 'react'
import './Login.css'
import logo from '../../assets/logo.png'
import { login,signup } from '../../firebase'
import netflix_spinner from '../../assets/netflix_spinner.gif'

const Login = () => {

  const[signState, setSignState] = useState("Sign In") //whaterver text we write in usestate will be displayed
  const [name, setName]=useState("");
  const [email, setEmail]=useState("");
  const [pass, setPass]=useState("");
  const [loading,setLoading] =useState(false);

  const user_auth= async (event)=>{
    event.preventDefault(); //will not refresh the page when form is submitted
    setLoading(true);
    if(signState==="Sign In"){
      await login(email,pass);
    }else{
      await signup(name,email,pass)
    }
    setLoading(false);
  }

  return (
    loading? <div className='login-spinner'>
      <img src={netflix_spinner} alt="" />
    </div>:

    <div className='login'>
      <img src={logo} alt="Netflix Logo" className='login-logo'/>
      <div className="login-form">
        <h1> {signState}</h1>
        <form>
          {signState==="Sign Up"? 
          <input type="text" value={name} onChange={(eve)=>{setName(eve.target.value)}} placeholder='Your name' /> : <></> }
          
          <input type="email" value={email} onChange={(eve)=>{setEmail(eve.target.value)}} placeholder='Your email' />
          <input type="password" value={pass} onChange={(eve)=>{setPass(eve.target.value)}} placeholder='Your password' />
          <button onClick={user_auth} type='submit'> {signState}</button>
          <div className="form-help">
            <div className="remember">
              <input type="checkbox" id="rememberMe"/>
              <label htmlFor="rememberMe"> Remember Me</label>
            </div>
            <p> Need Help ?</p>
          </div>
        </form>
        <div className="form-switch">
          {signState==="Sign In"? <p> New to Netflix? <span onClick={()=>{setSignState("Sign Up")}}> Sign Up Now</span> </p> 
          : <p> Already have account? <span onClick={()=>{setSignState("Sign In")}}> Sign In Now</span > </p> }
        </div>
      </div>

    </div>
  )
}

export default Login