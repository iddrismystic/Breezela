import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from "firebase/auth";
import { useHistory,Link } from "react-router-dom";
import Gettingstarted from "./Gettingstarted";
import {useState} from 'react'

const Login = () => {
const auth = getAuth(); 
const provider = new GoogleAuthProvider();
const redirect = useHistory()
const [googleuser, setgoogleuser] = useState([])
const [email, setemail] = useState('')
const Handleemail = (e)=>setemail(e.target.value)
const [password, setpassword] = useState('')
const Handlepassword = (e)=>setpassword(e.target.value)
const [loginerror, setloginerror] = useState('')
const Handlelogin = ()=> {
signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    redirect.push('/account')
  })
  .catch((error) => {
   setloginerror(error.message)
  });
}
const Handlegoogle = ()=>{
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        setgoogleuser(user)
        redirect.push('/account')
        

        // ...
      }).catch((error) => {
       setloginerror(error.message)
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
}

    return ( 
        <section>
         
 <div class="center section white fit-width pointer login-card padding back-shadow hover-up">
 <div class="padding">
       <div class="text-big text-center clear-both light-black">Login</div>
       <div class="hr"></div>
       <div class="text-center">
         <img src="/icons/logo.png" class="height-50" alt="" />
       </div>
       <div class="sub text-center">Login Your account to get amazing offers</div>

         <div class="section">
    <div class="poppins text-larger section text-left">Email:</div>
    <input type="email" class="input padding light borderless width-100-p height-50 text-larger login-round" placeholder="Enter your email" onChange={Handleemail} />
       </div>
<div class="section">
    <div class="poppins text-larger section text-left">Password:</div>
    <input type="email" class="input padding light borderless width-100-p height-50 text-larger login-round" placeholder="Enter your password" onChange={Handlepassword} />
</div>
<div>{loginerror}</div>
<div class="padding">
  <button class="button height-50 green text-larger width-100-p" onClick={Handlelogin}>Login</button>
</div>
<div class="padding">
   <button class="button pointer text-large blue width-100-p text-left padding" onClick={Handlegoogle}>
 <div className="flex">
   <div className="flex-20">
   <span className='fit-height fit-width circle padding light content-middle'>
       <img src="/icons/google.ico" class="height-20 width-20" alt="" />
    </span>
   </div>
   <div className="flex-80 padding-top-10 text-large text-bold text-left">
  CONTINUE WITH GOOGLE
  <span class="material-icons icon fit">
arrow_forward_ios
</span>
   </div>
 </div>
   </button>
</div>

<div className="padding">
  Don't have an account? <br /> <Link to='/signup'>Create Account</Link>
</div>




  </div>

</div>

        </section>
        
     );
     <Gettingstarted googleuser={googleuser} />
}
 
export default Login;