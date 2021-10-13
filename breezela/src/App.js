import './App.css';
import './css/fun.css';
import './index.css'
import Head from './head';
import Home from './Home';
import Stickynav from './Stickynav';
import Navtop from './Navtop';
import Footer from './Footer';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'
import Team from './Team';
import Createaccount from './Createaccount';
import Gettingstarted from './Gettingstarted';
import Login from './Login';
import db from './Firebase'
import {onSnapshot, collection, doc} from 'firebase/firestore'
import {useEffect,useState, useRef} from 'react'
import Account from './Account';
import { signOut, getAuth, onAuthStateChanged } from "@firebase/auth"
import Filetype from './Filetype.'
import Uploadvideo from './Uploadvideo';
import Breezela from './Breezela';
import Firebasedata from './Firebasedata';
import Video from './Video';
import Page from './Page';

function App() {
  const [userdata, setuserdata] = useState({})
  const [currentuser, setcurrentuser] = useState([])
      useEffect(() => {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
      if (user) {
      setcurrentuser(user)
      onSnapshot(doc(db, 'users', user.email),(doc)=>{
       const data = doc.data()
       setuserdata(data)   
      })
       }else{
      setcurrentuser("Login In For better experence")
     }
  });

  }, []) 


 const [sidewidth, setsidewidth] = useState('0%')
 const [sideoverflow, setsideoverflow] = useState('visible')
 const [contentwidth, setcontentwidth] = useState('100%')
 const [sidedisplay, setsidedisplay] = useState('none')
 const Handlesidebar = ()=>{
 if(sidewidth == '0%'){
   setsidewidth('20%')
   setsideoverflow('visible')
   setcontentwidth('80%')
   setsidedisplay('block')
 }else{
   setsidewidth('0%')
   setcontentwidth('100%')
   setsideoverflow('hidden')
   setsidedisplay('none')

 }


 }
 const ref = useRef(null);
 useEffect(() => {
   const sidebarwidth =  ref.current ? ref.current.offsetWidth : 0;
   setsidewidth(sidebarwidth)
 }, [ref.current]);

  return (
    <Router>
    <div className="App">
    <Head />

    <div className="dashboard-side black-light text-white" ref={ref} style={{width:`${sidewidth}`, overFlow:`${sideoverflow}`, display:`${sidedisplay}`}}>
          <div className='text-larger text-center'>Menu</div>
          <div className="hr section"></div>
          <div class="section pointer back-shadow hover-up">

         </div>

<div class="section pointer text-left">
  <Link to='/uploadtype'>
    <div className="card padding">
        <div className="text-center">
        <span class="material-icons icon size-2 text-white">
         add_circle
        </span>
        </div>
        <div className="hr"></div>
        <div className="">
            <div className="text-large text-center text-white">Add content</div>
        </div>
    </div>
    </Link>
</div>


<div className="hr"></div>
<div class="section pointer hover-text-blue text-left side-icon">
  <Link to='/account' className="text-white">
  <span class="material-icons icon fit">
         person
  </span>  
  <span class="flex-60  padding">Account</span>
  </Link>
</div>

<div className="hr"></div>
<div class="section pointer hover-text-blue text-left side-icon">
<Link to='/' className='text-white'>
  <span class="material-icons icon fit">
         data_usage
  </span>  
  <span class="flex-60  padding"> Page Info</span>
</Link>
</div>
<div className="hr"></div>
<div class="section pointer hover-text-blue text-left side-icon">
<Link to='/' className="text-white">
  <span class="material-icons icon fit">
         attach_money
  </span>  
  <span class="flex-60  padding">Monetization</span>
</Link>
</div>
<div className="hr"></div>
<div class="section pointer hover-text-blue text-left side-icon">
<Link to='/' className="text-white">
  <span class="material-icons icon fit">
         insights
  </span>  
  <span class="flex-60  padding">Insights</span>
 </Link>
</div>
    <div className="hr"></div>
<div class="section pointer hover-text-blue text-left side-icon">
  <span class="material-icons icon fit">
         call
  </span>  
  <span class="flex-60  padding">{userdata.phone}</span>
</div>
    <div className="hr"></div>
<div class="section pointer hover-text-blue text-left side-icon">
  <i class="fa fa-facebook pointer padding"></i> 
  <span class="flex-60  padding">{userdata.facebook}</span>
</div>
    <div className="hr"></div>
<div class="section pointer hover-text-blue text-left side-icon">
  <i class="fa fa-instagram pointer padding"></i> 
  <span class="flex-60  padding">{userdata.instagram}</span>
</div>
    <div className="hr"></div>
<div class="section pointer hover-text-blue text-left side-icon">
  <i class="fa fa-youtube pointer padding"></i> 
  <span class="flex-60  padding">{userdata.youtube}</span>
</div>





</div>

<div className="content" style={{width:`${contentwidth}`}}>
<Navtop/>
<Stickynav Handlesidebar={Handlesidebar}/>
     <Switch>
     
     <Route exact path = '/' ><Home /></Route>

     <Route path='/Team'><Team /></Route>

     <Route path='/signup'><Createaccount /></Route>
     
     <Route path='/gettingstarted'><Gettingstarted/></Route>

     <Route path='/Login'><Login/></Route>
 
     <Route path='/account'><Account/></Route>

     <Route path='/uploadtype'><Filetype /></Route>

     <Route path='/uploadvideo'><Uploadvideo/></Route>

     <Route path='/breezela'><Breezela /></Route>

     <Route path='/user'><Firebasedata currentuser={currentuser}/></Route>
     
     <Route path='/video/:id' currentuser={currentuser}> <Video /> </Route>

     <Route path='/page/:email'><Page /></Route>
    </Switch>

   </div>

    </div>
    </Router>
  );
}

export default App;
