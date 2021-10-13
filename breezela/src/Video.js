import { useHistory, Link , useParams} from "react-router-dom"
import { doc, onSnapshot, collection } from "firebase/firestore";
import {useState, useEffect} from 'react'
import db from './Firebase'
import { signOut, getAuth, onAuthStateChanged } from "@firebase/auth"
const Video = () => {
     const auth = getAuth()
     const dataid = useParams()
     const [videodata, setvideodata] = useState([])
     useEffect(() => {
    onSnapshot(doc(db, 'videos', dataid.id),(doc)=>{
            const data = doc.data()
            setvideodata(data)
  
     })
         
     }, [])
    
     const [videoLink, setvideoLink] = useState('')
     useEffect(() => {
      setvideoLink(window.location.toString())
 
     }, [])

     //currentuser
  const [currentuser, setcurrentuser] = useState([])
  const [currentuserdata, setcurrentuserdata] = useState([])
     useEffect(() => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
           setcurrentuser(user)
           onSnapshot(doc(db, 'users', user.email),(doc)=>{
            const data = doc.data()
            setcurrentuserdata(data)
               })
            //setting database
        } else {
    
        }
      });
     
     }, []) 
//share modal
const [sharedisplay, setsharedisplay] = useState('none')
const Handleshare = ()=>{
   setsharedisplay('block')
}
const Handlecloseshare = ()=>{
   setsharedisplay('none')
}
    return ( 
        <section className='black-light'>
         <div className="row padding">
        <div className="col sm-12 md-8 lg-8">
       <video src={videodata.file} controls autoPla className="height-100-p width-100-p video"></video>
        <table className="table">
          <tr>
          <td className=''><div className="text-larger text-left text-white">{videodata.title}</div></td>
          <td className='float-right text-dark-light'><span className=''>23000</span> <span>Views</span></td>
         </tr>
         <tr className='react-box'>
         <td className='text-left'><span class="text-white pointer hover-text-blue"><i class="fa fa-thumbs-up icon fit size-2"></i></span> <span className='text-white'>40000</span></td>
         <td className='text-left'><span class="text-white pointer hover-text-blue"><i class="fa fa-thumbs-down icon fit size-2"></i></span> <span className='text-white'>40000</span></td>
         <td className='text-left' onClick={Handleshare}><span class="text-white pointer hover-text-blue"><i class="fa fa-share icon fit size-2"></i></span> <span className='text-white'>Share</span></td>       
         </tr>
         <tr>
            
         </tr>
        </table>

         
         <div className="hr"></div>
   
         <div >
         <table className='table'>
              <tr>
                 <td className='float-left'>
                    <img src={videodata.profile} alt="" className="width-50 height-50 circle"/>
                 </td>
                 <td className='float-left'>
                    <div className='text-white text-large'>{videodata.username}</div>
                    <div className='text-dark-light text-medium'><span>2000</span><span> Followers </span></div>
                 </td>
                  <td><span className='text-left text-white text-large'><button className='button pink padding text-large float-right'>Follow</button></span></td>
              </tr>
           </table>    
           <div className='text-left text-dark-light text-large padding'>
              {videodata.description}
           </div>
         </div>
       <div>
         <div>
            <table className='table borderless'>
                  <tr>
                     <td>
                     <img src={currentuserdata.profile} className='width-50 height-50 circle' alt="" />
                     </td>
                     <td>
                     <input type="text" className='input black text-white borderless width-90-p' placeholder="Comment" />
                     </td>
                     <td>
                     <button className='button text-white'>Comment</button>
                     </td>
                 </tr>
            </table>

         </div>
       </div>

        </div>
        <div className="col sm-12 md-2 lg-4">

        </div>
        </div>

        <div className="share-modal light padding card" style={{display:`${sharedisplay}`}}>
           <div>
              <span className='text-x-large text-pink  float-right pointer'>
                 <span className="material-icons" onClick={Handlecloseshare}>
                    close
                 </span>
              </span>
           </div>
            <div className="text-big text-left">Copy and share video</div>
            <div className="hr"></div>
            <div className="videoLink">{videoLink}</div>
            <div className='text-left pointer'><i class="fa fa-copy icon fit size-2"></i></div>
        </div>
        </section>
     );
}
 
export default Video;