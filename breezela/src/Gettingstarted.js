import {useEffect, useState} from 'react'
import db from './Firebase'
import { onSnapshot, collection , addDoc , setDoc, doc} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useHistory } from 'react-router-dom';

const storage = getStorage()
const Gettingstarted = () => {
  
    const [name, setname] = useState('')
    const handlename = (e)=> setname(e.target.value)
    const [phone, setphone] = useState('')
    const handlephone = (e)=> setphone(e.target.value)
    const [hobby, sethobby] = useState('')
    const handlehobby = (e)=> sethobby(e.target.value)
    const [country, setcountry] = useState('')
    const handlecountry = (e)=> setcountry(e.target.value)
    const [facebook, setfacebook] = useState('')
    const handlefacebook = (e)=>setfacebook(e.target.value)
    const [youtube, setyoutube] = useState('')
    const handleyoutube = (e)=> setyoutube(e.target.value)
    const [instagram, setinstagram] = useState('')
    const handleinstagram = (e)=>setinstagram(e.target.value)
    const [title, settitle] = useState('')
    const handletitle = (e)=>settitle(e.target.value)
    const [description, setdescription] = useState('')
    const handledescription = (e)=> setdescription(e.target.value)
    const [type, settype] = useState('')
    const Handletype = (newType) => settype(newType)
    const [coverimage, setcoverimage] = useState('/banner/banner1.png')
    //current user
    const [currentuser, setcurrentuser] = useState('')
    const [profile, setprofile] = useState('/icons/avatar.png')
    const [uploadstate, setuploadstate] = useState(' ')
    const [errormes, seterrormes] = useState('')
    const [fileformaterr, setfileformaterr] = useState(' ')
    const Handleprofile =(e)=> {
        const file = e.target.files[0];
        if(file.type === 'image/png' || file.type === 'image/jpg' || file.type === 'image/JPEG' || file.type === 'image/jpeg' || file.type === 'image/JPG'){
            const storageRef = ref(storage, `users/${currentuser.email}/${file.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on('state_changed', 
              (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                const number = parseInt(progress)
                setuploadstate(number + '%')
              }, 
              (error) => {
                // Handle unsuccessful uploads
                console.log(error.message)
              }, 
              () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                  setprofile(downloadURL)
                });
              }
            );
        }else{
           setuploadstate('Choose the correct file for you profile, Note(Only images are allowed)')
        }
     

        
    }
    const redirect = useHistory()
    const handleGetStarted = ()=>{
        seterrormes(' ')
        if(name === '' || phone === '' || country === '' || description === '' || title === ''){
            seterrormes(` make sure to fill in all inputs with red ticks and choose a profile`)
        }else{
            seterrormes(' ')
            const docRef = doc(db,'userpage', currentuser.email + 'page')
            const data = {
                title:title,
                name:name,
                phone:phone,
                hobby:hobby,
                country:country,
                description:description,
                facebook:facebook,
                youtube:youtube,
                instagram:instagram,
                profile:profile,
                email:currentuser.email,
                uid:currentuser.uid,
                content:type,
                minute: new Date().getMinutes(),
                dateTime: new Date().toLocaleString() + "",
                day:new Date().getDate(),
                year: new Date().getFullYear(),
                month: new Date().getMonth(),
                coverimage: coverimage
            }
            setDoc(docRef, data, { capital: true }, { merge: true })
            .then(()=>{
                const userRef = doc(db, 'users', currentuser.email)
                setDoc(userRef, data, { capital: true }, { merge: true })
                .then(()=>redirect.push('/account'))
                
            })
        .catch(err=>seterrormes(err.message))
        }
    
        }

    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
          if (user) {
             setcurrentuser(user)

          } else {
           setcurrentuser("Login In For better experence")
          }
        });
       
      }, [])
     //upload cover image

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
        <section className='Gettingstarted black-light text-white'>
<div>
    <div className="cover">
        <img src={coverimage} className="coverimage" alt="" />
        <span class="absolute fit-width fit-height black button pointer pointer round-edge editcover upload-btn-wrapper">
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
<div class="container padding">

    <div class="text-center">
        <div class="fit-width fit-height light circle center section relative">
        <img src={profile} className='width-200 height-200 circle' alt="" />
    <div class="fit-width fit-height white pointer circle absolute upload-btn-wrapper button black padding content-middle" style={{bottom: 20+'px',right: 20+'px',padding: 5+'px'}}>
    <span class="material-icons text-black-light pointer">photo_camera</span>
    <input type="file" onChange={Handleprofile} />
    </div>
        </div>
        <div class="text-center section text-large">Profile Image</div>
    </div>

 <div class="padding text-x-large" > {uploadstate} </div>

    <div class="hr section"></div>
    <div className="sub">Lets get Started In Creating Your Page</div>
    <div className="text-x-large must">What is the Title Of Your Page</div>
    <div className="container">
        <input type="text" placeholder='Enter the title of your page?' className='input borderless height-50 width-100-p light text-large' onChange={handletitle}/>
    </div>
    <div class="row getstarted">
        <div class="col sm-12 md-6 lg-6 padding">
         <div class="text-large must">USERNAME:</div>
         <input type="text" class="input borderless height-50 width-100-p light text-large" onChange={handlename} placeholder="Your name" />
        </div>
        <div class="col sm-12 md-6 lg-6 padding">
         <div class="text-large must">CATEGORY:</div>
         <input type="text" class="input borderless height-50 width-100-p light text-large" onChange={handlephone} placeholder="Music, Lifestyle, Social media, Sports, Eduction" />
        </div>
        <div class="col sm-12 md-6 lg-6 padding">
         <div class="text-large must">COUNTRY:</div>
         <input type="text" class="input borderless height-50 width-100-p light text-large" onChange={handlecountry} placeholder="ENTER THE NAME OF YOUR COUNTRY" />
        </div>
        <div class="col sm-12 md-6 lg-6 padding">
         <div class="text-large must">CONTENT TO POST:</div>
         <select className='input border padding width-100-p light'
        onChange={(event) => Handletype(event.target.value)}
        value={type}
      >
        <option value="">Select format</option>
        <option value="Video">Video</option>
        <option value="Audio">Audio</option>
      </select>
        </div>
     
        <div class="col sm-12 md-12 lg-12 padding">
            <div class="text-large must">DESCRIPTION</div>
            <textarea rows="" cols="" class="input borderless width-100-p light text-large" onChange={handledescription} placeholder="Something about your page"></textarea>
        </div>
        <div class="hr width-100-p"></div>
        <div class="col sm-12 md-6 lg-6 padding">
            <div class="text-large">FaceBook username:</div>
            <input type="text" class="input borderless height-50 width-100-p light text-large" onChange={handlefacebook} placeholder="Your facebook account name" />
           </div>
           <div class="col sm-12 md-6 lg-6 padding">
            <div class="text-large">Instagram username:</div>
            <input type="text" class="input borderless height-50 width-100-p light text-large" onChange={handleinstagram} placeholder="Your instagram account name" />
           </div>

           <div class="col sm-12 md-12 lg-6 padding">
               <div class="text-center">{errormes}</div>
           <button type="" class="text-large width-100-p button green card" onClick={handleGetStarted}>Getting Started</button>
           </div>
    </div>
</div>

        </section>
        
     );
}
 
export default Gettingstarted;