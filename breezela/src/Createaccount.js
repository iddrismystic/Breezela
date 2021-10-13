import { Link, useHistory } from "react-router-dom";
import {useEffect, useState} from 'react'
import db from './Firebase'
import { collection , setDoc, doc} from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
const Createaccount = () => {
  const provider = new GoogleAuthProvider();
  //password type
    const passwordType = "password"
    //auth provider
    const auth = getAuth();
  const redirect = useHistory()
  //Grabbing user inputs and saving them in  a usestate
  const [email, setemail] = useState('')
  const hanldeEmail =(e)=>setemail(e.target.value);
  const [password, setpassword] = useState('')
  const handlePassword = (e)=>setpassword(e.target.value)
  const [confrimpassword, setconfrimpassword] = useState('')
  const handleConfirmPassword = (e)=>setconfrimpassword(e.target.value)
  const [errorMessage, seterrorMessage] = useState('')
  const createAccount = ()=>{
  if(password==confrimpassword){
  seterrorMessage(' ')
 createUserWithEmailAndPassword(auth, email, password)
.then((userCredential) => {
  // Signed in 
  const user = userCredential.user;
  const docRef = doc(db, 'users', user.email)
  const data = {useruid : user.uid, email: user.email}
  setDoc(docRef,data)
  .then(()=>redirect.push('/gettingstarted'))
  .catch(err=>{seterrorMessage(err.message)})
     
      },[])      
.catch((error) => {
  const errorCode = error.code;
  const errorMessage = error.message;
  seterrorMessage(errorMessage)
  // ..
}); 
    }
    else{
    seterrorMessage('Please make sure your password are the same')
   } 

           }
//google sign up
const Handlegoogle = ()=>{
  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      redirect.push('/gettingstarted')
    }).catch((error) => {
     seterrorMessage(error.message)
      const credential = GoogleAuthProvider.credentialFromError(error);
    });
}


    return ( 
        <section className="create">
            <div class="center section fit-width round-edge height-90-p signup-card pointer white back-shadow left-indigo">

<div class="w">
<div class="padding createAccount">
     <div class="text-big text-center clear-both light-black">Create Account</div>
     <div class="hr"></div>
  <div class="text-center"><img src="/public/icons/logo.png" class="height-50" alt="" /></div>
  <div class="sub text-center">create an account for free</div>      
     <div class="hr"></div>

<div class="padding text-left">
  <div class="poppins text-larger section must">Email:</div>
  <input type="email" onChange={hanldeEmail} class="input padding light borderless width-100-p height-50 text-larger" placeholder="Enter your email" />
</div>
<div class="padding text-left">
  <div class="poppins text-larger section must">Password:</div>
  <input type={passwordType} onChange={handlePassword} class="input padding light borderless width-100-p height-50 text-larger" placeholder="Enter your password" />
</div>
<div class="padding text-left">
  <div class="poppins text-larger section must">Confirm Password:</div>
  <input type={passwordType} onChange={handleConfirmPassword} class="input padding light borderless width-100-p height-50 text-larger" placeholder="Rewrite your password" />
</div>
<div> {errorMessage} </div>
<div class="padding text-left">

<button class="button padding-20 green text-larger width-100-p" onClick={createAccount}>Create Account</button>

</div>
<div class="padding">
   <button class="button pointer text-large blue width-100-p text-left padding" onClick={Handlegoogle}>
 <div className="flex">
   <div className="flex-20">
   <span className='fit-height fit-width circle padding light content-middle'>
       <img src="/icons/google.ico" class="height-20 width-20" alt="" />
    </span>
   </div>
   <div className="flex-80 padding-top-10 text-large text-left">
  CONTINUE WITH GOOGLE
  <span class="material-icons icon fit">
arrow_forward_ios
</span>
   </div>
 </div>
   </button>
</div>

<div class="text-larger">
Already have an account <br /> <Link to='/Login'>Login</Link>
</div>

</div>
 </div>
</div>
        </section>
     );
}
 
export default Createaccount;