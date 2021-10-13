import {getAuth, onAuthStateChanged } from "@firebase/auth"
import {useState, useEffect} from 'react'
import React from "react";
import { doc, onSnapshot, collection, addDoc, setDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import db from './Firebase'
import { useHistory } from "react-router-dom";
 const storage = getStorage()
 const auth = getAuth();
const Uploadvideo = () => {
    const redirect = useHistory()
    const [currentuser, setcurrentuser] = useState([])
    const [showLogin, setshowLogin] = useState('none')
    const [HideLogin, setHideLogin] = useState('block')
    const [title, settitle] = useState('')
    const Handletitle = (e)=> settitle(e.target.value)
    const [about, setabout] = useState('')
    const Handleabout = (e)=>setabout(e.target.value)
    const [uploaderror, setuploaderror] = useState('')
    const [currentuserdata, setcurrentuserdata] = useState([])
    const [uploadfile, setuploadfile] = useState('')
    const [uploadprogress, setuploadprogress] = useState(' ')
useEffect(() => {
    //check if user is online
    onAuthStateChanged(auth, (user) => {
      if (user){
        onSnapshot(doc(db, 'users',user.email),(doc)=>{ 
          setcurrentuserdata(doc.data())
        })
      }
      else {
        //if user is not online
      }
    })

}, [])


    const Handleupload =(e)=> {
      onAuthStateChanged(auth, (user)=>{
        if(user){
          const file = e.target.files[0];
          console.log(file.type)
          if( file.type === 'video/MP4' || file.type === 'video/mp4' || file.type === 'video/avi' || file.type === 'video/AVI' || file.type === 'video/MPEG' || file.type === 'video/MKV' || file.type === 'video.mkv' || file.type === 'video/3gp'){
            const storageRef = ref(storage, `users/contents/${user.email}/${file.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on('state_changed', 
              (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100 + '%';
               const number = parseInt(progress)
                setuploadprogress(number + '%')
              }, 
              (error) => {
                // Handle unsuccessful uploads
                console.log(error.message)
              }, 
              () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                  setuploadfile(downloadURL)
                  //grabbing user data and setting them in the content collection
  
                });
              }
            );
          }else{
            setuploadprogress('Please make sure to choose the correct file format')
          }

          
        }
      })

    } 

  const Handlepublish = ()=>{
    //Adding content to all contents
        //check if user is online
        onAuthStateChanged(auth, (user) => {
          if (user) {
    const docRef = doc(db,'videos', user.email + title)
    const data = {
    title : title,
    description:about,
    file: uploadfile,
    email : user.email,
    uid: user.uid,
    username:currentuserdata.name,
    profile:currentuserdata.profile,
    minute: new Date().getMinutes(),
    dateTime: new Date().toLocaleString() + "",
    day:new Date().getDate(),
    year: new Date().getFullYear(),
    month: new Date().getMonth()
    
    }
    setDoc(docRef, data, { capital: true }, { merge: true })
    .then(()=>{
      const pageref = doc(db, user.email, user.email + title)
      setDoc(pageref, data, { capital: true }, { merge: true })
      .then(()=> redirect.push('/breezela'))
      .catch(err=>setuploaderror(err.message))
     
    })
    .catch(err=>setuploaderror(err.message)) 
    
       }else {
    //if user is not login
          }
        })

  }
  
    return ( 
        <section className="black-light padding-bootom-50">
          <div>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
  <path fill="#273036" fill-opacity="1" d="M0,192L1440,128L1440,0L0,0Z"></path>
</svg>
          </div>
  <div className="container">
  <div className="padding section">
   <dic className="center content-middle fit-width fit-height circle padding uploadbutton upload-btn-wrapper pointet">
   <span class="material-icons icon size-4 opacity-4">
   file_upload
   </span>  
   <input type="file" onChange={Handleupload} />
   </dic>
   <div className="text-large text-white">Select The File To Upload</div>
   <div className="section text-large text-white center">{uploadprogress}</div>
   <div className="section hr"></div>
   <div className="row">
    
   <div className="col sm-12 md-6 lg-6 padding">
   <div className="card round-edge height-400 width-100-p">
     <video src={uploadfile} controls className='width-100-p height-300'></video>
    <button className="button width-100-p blue card text-white text-large" onClick={Handlepublish}>Publish</button>
    <div className='text-white padding'>{uploaderror}</div>
   </div>
   </div> 
   <div className="col sm-12 md-6 lg-6 padding">      
      <div className="border padding round-edge">
      <div className="text-x-large text-white">ABOUT CONTENT</div>
      <div className="hr"></div>
      <div className="padding">
      <div className="must text-white text-large text-left">TITLE:</div>
       <input type="text" placeholder="Enter the title of your content" className="input border padding width-100-p black-light text-white" onChange={Handletitle}/> 
      </div>
      <div className="padding">
      <div className="must text-white text-large text-left">DESCRIPTION:</div>
       <textarea rows='5' type="text" placeholder="Enter the title of your content" className="input border padding width-100-p black text-white" onChange={Handleabout} /> 
      </div>

       </div>
   </div>

</div>
   </div>
  </div>
        </section>
     );
}
 
export default Uploadvideo;