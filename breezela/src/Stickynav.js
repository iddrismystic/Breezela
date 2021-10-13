import { Link } from "react-router-dom";
import {useState, useEffect} from 'react'
import { getAuth, onAuthStateChanged,signOut } from "firebase/auth";

const Stickynav = ({Handlesidebar}) => {
    const [hideLogin, sethideLogin] = useState('')
    const [showLogin, setshowLogin] = useState('none')
    const handlesignOut =()=>{
        const auth = getAuth()
        auth.signOut()
        .then(()=>{
         window.location.reload()
        })
      }
    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
          if (user) {
             sethideLogin('none')
             setshowLogin('inline')
              //setting database

          } else {
           sethideLogin('block')
          }
        });
       
      }, [])
      
      const [accountpopup, setaccountpopup] = useState('none')
      const Handleaccountpopup = ()=>{
       setaccountpopup('block')
      }
    return (
        <div className="Navigationbar sticky-top border-bottom">

        <table className="width-100-p table black-light">
          <tr>
        <td>
        <span class="sidebar-trigger toggle-sidebar text-xx-large float-left pointer text-white" onClick={Handlesidebar}>
                <span class="material-icons icon size-2">
               menu
                </span>
        </span>
        </td>
        <td>
        <img src="/icons/logo.png" class="height-20 logo icon fit" alt="" />
        </td>
        <td>
          <div className="hide-medium-down">
        <input type="text" placeholder="Looking for something?" className='input width-100-p borderless light padding' />
        </div>
        </td>
        <td>
    <div className="hide-medium-down">     
   <button class='button fit-height width-100-p black'>
   <span class="material-icons text-dark-light pointer icon fit">
           search
  </span>
   </button>
   </div>
        </td>
        <td className='text-right'>
        <span class="material-icons text-dark-light pointer hover-text-white">
     notifications
      </span>  
        </td>
        <td className='text-right'>
        <span class="material-icons text-dark-light pointer hover-text-white">
         add
        </span> 
        </td>
             <td>
          <div className='text-right pointer' onClick={Handleaccountpopup}>
            <img src="/images/4.jpg" className='width-40 height-40 circle' alt="" />
          </div>
            </td>
            </tr>
        </table>

<div className="accountpopup text-white padding" style={{display:`${accountpopup}`}}>
  <table>
    <tr>
      <td><img src="/images/4.jpg" className='width-50 height-50 circle' alt="" /></td>
      <td className='text-medium'><Link to='/account' className='text-white'>Iddris abdulw wahab </Link></td>
    </tr>
  </table>
 <div className="hr"></div>
 <div>
   <table className=''>
 
     <tr style={{display:`${hideLogin}`}} className='pointer'>
       <td>
       <Link to='/signup' className='text-large text-white'>
         <span class="material-icons text-white icon size-2 fit">people</span>
        </Link>
       </td>
       <td className='text-left'>
       <div className='text-larger'>
       <Link to='/signup' className='text-large text-white'>
         Create Account
         </Link>
      </div>
       </td>
     </tr>
 
 
     <tr style={{display:`${hideLogin}`}} className='pointer'>
       <td>
       <Link to='/Login' className='text-large text-white'>
         <span class="material-icons text-white icon size-2 fit">login</span>
        </Link>
       </td>
       <td className='text-left'>
       <div className='text-larger'>
       <Link to='/Login' className='text-large text-white'>
         Login
         </Link>
      </div>
       </td>
     </tr>
 
     <tr style={{display:`${showLogin}`}} className='pointer' onClick={handlesignOut}>
       <td>
       <Link to='/Login' className='text-large text-white'>
         <span class="material-icons text-white icon size-2 fit">logout</span>
        </Link>
       </td>
       <td className='text-left'>
       <div className='text-larger'>
       <Link to='/Login' className='text-large text-white'>
        Logout
         </Link>
      </div>
       </td>
     </tr>


   </table>
 </div>

</div>
        </div>
        
 

     );
}
 
export default Stickynav;