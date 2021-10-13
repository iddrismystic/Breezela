import { signOut, getAuth, onAuthStateChanged } from "@firebase/auth"
import { useHistory, Link , useParams} from "react-router-dom"
import {useState, useEffect} from 'react'
import React from "react";
import { doc, onSnapshot, collection } from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import db from './Firebase'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
import Chart from "./Chart";
import Footer from "./Footer";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000
  },

];


const Account = () => {
  
const storage = getStorage()  
const [currentuser, setcurrentuser] = useState([])
const redirect = useHistory()
const [userdata, setuserdata] = useState({})
const [profilestate, setprofilestate] = useState('')
const auth = getAuth();

useEffect(() => {
 onAuthStateChanged(auth, (user) => {
   if (user) {
      setcurrentuser(user)
      onSnapshot(doc(db, 'users', user.email),(doc)=>{
       const data = doc.data()
       setuserdata(data)
       setprofilestate(data.profile)
          })
       //setting database
   } else {
    setcurrentuser("Login In For better experence")
   }
 });

}, []) 

     //upload cover image

     const [coverimage, setcoverimage] = useState('/banner/banner1.png')
     const Handlecover =(e)=> {
     const file = e.target.files[0];
     const storageRef = ref(storage, `users/${currentuser.email}/cover${file.name}`);
     const uploadTask = uploadBytesResumable(storageRef, file);
     uploadTask.on('state_changed', 
       (snapshot) => {
         // Observe state change events such as progress, pause, and resume
         // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
         const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
         
       }, 
       (error) => {
         // Handle unsuccessful uploads
         console.log(error.message)
       }, 
       () => {
         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
           setcoverimage(downloadURL)
         });
       }
     );
     
 }
    return ( 
        <section className='dashboard'>

<div>
    <div className="cover">
        <img src={coverimage} className="coverimage" alt="" />
        <span class="absolute fit-width fit-height light pointer round-edge editcover upload-btn-wrapper">
            <span class="material-icons icon fit">
                photo_camera
            </span>
            <span class="text-bold">
                Edit
            </span>
            <input type="file" onChange={Handlecover}/>
        </span>
    </div>
</div>
<div className="back-shadow round-edge padding-top pointer hover-up row">
    <div className="col sm-12 md-4 lg-4 padding black-light">
    <div class="text-center">
          <img src={userdata.profile} class="width-100 height-100 circle pointer" alt="" />
    </div>
    <div class="text-larger padding pointer text-white">{userdata.name}</div>
    </div>
    <div className="col sm-12 md-8 lg-8 padding">
<div className="row">
    <div className="col sm-6 md-6 lg-6 padding">
    <button className='button padding width-100-p blue back-shadow text-larger text-bold'>
   <span class="material-icons icon fit">
   file_upload
   </span>  
   Upload New
   </button>
    </div>
    <div className="col sm-6 md-6 lg-6 padding">
    <button className='button padding width-100-p blue back-shadow text-larger text-bold'>
   <span class="material-icons icon fit">
   update
   </span>  
   Update Info
   </button>
    </div>
</div>
<div className="text-x-large border padding">
Demo page
</div>
    </div>
    
</div>
  
<div className="row">
    <div className="col sm-12 md-6 lg-8">
        <div className="container back-shadow hover-up padding-20 pointer section">
            <div className="row fit-width">
                <div className="col sm-12 md-12 lg-8 padding">
                    <div className="text-big light-black">  Boost Your Productivity </div>
                    <p className="text-larger">
                     Boost your page Productivity,  Get your page on the top.
                    </p>
                    <div className="border padding">
                    <span class="material-icons icon fit">
                     arrow_right_alt
                    </span>
                    <span className="text-larger"> Read More </span>
                    </div>

                </div>
                <div className="col sm-12 md-12 lg-4 section round-edge content-middle">
                   <img src="icons/rocket.png" className='width-100-p height-100-p' alt="" />
                </div>
            </div>
        </div>
    </div>

    <div className="col sm-12 md-6 lg-4 padding-20">
<div className="back-shadow section hover-up pointer round-edge padding">
<div className="text-big light-black">Overview</div>
<div className="hr"></div>
<div class="section pointer text-left">
     <span class="white circle fit-width fit-height padding light">
        <span class="material-icons">
            campaign
     </span>  
    </span>
    <span class="text-large padding ">Run Campaign</span>
</div>
<p>
   Run campagin to increase your plays, followers and page visits
</p>


</div>
    </div>
</div>



<div className='container section'>

    <div className="graph">
<Chart />
     </div>

</div>

        </section>
     );
}
 
export default Account;