import { signOut, getAuth, onAuthStateChanged } from "@firebase/auth"
import { useHistory, Link , useParams} from "react-router-dom"
import {useState, useEffect} from 'react'
import React from "react";
import { doc, onSnapshot, collection } from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import db from './Firebase'
import Video from "./Video";
const Breezela = () => {
    const [content, setcontent] = useState([])
 useEffect(() => {
   onSnapshot(collection(db, 'videos'),(snapshot)=>{
       const data = snapshot.docs.map((content)=>({...content.data(), id:content.id}))
       setcontent(data)

   })
 }, [])
 //hover on video effect
 const [autoplay, setautoplay] = useState(' ')
 const Videohover = ()=>{
  setautoplay('autoPlay')
 }
    return (
    <section className='black'>
   <div className="row">
       {
           content.map(video=>(
            <div className="col sm-12 md-4 lg-3 section padding" key={video.id}>
                 <Link to={`/video/${video.id}`}>
            <div className="video-card pointer black-light">
             <div className="height-200">
             <video src={video.file} controls  className='width-100-p height-200' onMouseEnter={Videohover}></video>
             </div>
            <div className="row padding">
                <div className="col sm-2 md-2 lg-2">
                 <img src={video.profile} alt="" className="width-100-p height-100-p circle"/>
                </div>
                <div className="col sm-10 md-10 lg-10 video-text">
                 <div className="text-white text-left text-bold">{video.title}</div>
                 <div className='text-left text-white'>{video.username}</div>
                </div>
            </div>
            <div className='text-left video-footer'>
            <span class="material-icons text-white icon fit">schedule</span>
            <span className="text-white padding-left-10">{video.dateTime}</span>
            <span class="material-icons text-white icon fit float-right">share</span>
            </div>
            </div>
            </Link>
            </div>
        
           ))
       }

   </div>

    </section> );
}
 
export default Breezela;