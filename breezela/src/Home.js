import { signOut, getAuth, onAuthStateChanged } from "@firebase/auth"
import { useHistory, Link , useParams} from "react-router-dom"
import {useState, useEffect} from 'react'
import React from "react";
import { doc, onSnapshot, collection } from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import db from './Firebase'
import Video from "./Video";
const Home = ()=> {
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
        <section>
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

    </section>    
    <div className="padding-20">

<div className=''>
<div class="row">
    <div class="col sm-12 md-6 lg-6">
       <div class="card fit-width padding center margin-top-50 light hover-shadow pointer hover-up round-edge">
           <div class="text-bigger text-bold poppins text-center">Host For Free</div>
           <div class="container"><div class="hr"></div></div>
        <div>
           <img src="/svg/workspace.svg" class="width-100-p height-100-p" alt="" />
        </div>
       </div>
    </div>
</div>
    </div>
    <div class="padding-bottom-50 light">
 <div class="container padding-top-100">
    <div class="row">
        <div class="col sm-12 md-12 lg-6">
            <div class="container">
           <img src="/images/4.jpg" class="width-100-p card round-edge pointer" alt="" />
            </div>
           </div>
        <div class="col sm-12 md-12 lg-6 padding">
            <div class="sub">Enjoy Latest, Trending Contents For Free</div>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione consequuntur eveniet quibusdam architecto officia reiciendis placeat perferendis expedita consequatur corrupti magni, rem at nam in eos autem explicabo dolore cupiditate!</p>
            
        </div>
    </div>
    <div class="row white padding-20 margin-top-50 pointer back-shadow">
      <div class="section hr show-medium-down width-100-p"></div>
      <div class="col sm-12 md-12 lg-6 padding">
        <div class="sub">Share your content to the rest of the world</div>
        <p class="text-larger">
          Share your content to the rest of the world very fast using our online platform.
          Engage users to visit your page, increase your traffic and payments
        </p>
        
    </div>
    
    <div class="col sm-12 md-12 lg-6">
      <div class="container">
        <video src="/video/1.mp4" autoplay loop class="width-100-p height-300"></video>
      </div>
     </div>
    </div>
 </div>
</div>
<div class="padding-bottom-50">
    <div class="container">
        <div class="header">
            <span class="material-icons icon fit size-1 text-green">
                attach_money
            </span>
            Earn Money
        </div>
        <div class="sub poppins">Monetize Your Content</div>
        <div class="row">
            <div class="col sm-12 md-12 lg-6 padding">
                <p>
             <div>
                <span class="material-icons icon fit size-3 text-green">
                    ads_click
                </span>
                <span class="text-x-large">Host Ads</span>
                <div class="hr"></div>
                <p class="text-larger poppins">
                    Do you know that you can host ads on your content and start making money online <br />
                    Get more page visits and more income
                </p>
             </div>
                </p>
            </div>
            <div class="col sm-12 md-12 lg-6 padding green-left-border">
                <div>
                    <span class="material-icons icon fit size-3 text-green">
                        attach_money
                    </span>
                    <span class="text-x-large">Purchases</span>
                    <div class="hr"></div>
                    <p class="text-larger poppins">
                        Do you know that you can host ads on your content and start making money online <br />
                        Get more page visits and more income
                    </p>
                 </div>
            </div>
        </div> 
        <div class="hr section"></div> 
        
        <div>
          <div class="row fit-height">
            <div class="col sm-12 md-12 lg-6">
              <img src="/images/10.jpg" class="width-100-p back-shadow fit-height" alt="" />
            </div>
            <div class="col sm-12 md-12 lg-6 padding">
              <div class="container">
             <div class="sub poppins">Accept payment easy</div>
             <p class="padding poppins text-larger">Our online platform allows you to accept payments very easy,</p>
             <div class="flex">
               <div class="flex-50">
                 <div>
                   <img src="/icons/checked.ico" class="height-40 width-40 pointer icon fit" alt="" />
                   <span class="text-larger pointer">Flutter wave</span>
                  </div>
               </div>
               <div class="flex-50">
                 <div>
                   <img src="/icons/checked.ico" class="height-40 width-40 pointer icon fit" alt="" />
                   <span class="text-larger pointer">Paypal</span>
                  </div>
               </div>
               <div class="flex-50 section">
                 <div>
                   <img src="/icons/checked.ico" class="height-40 width-40 pointer icon fit" alt="" />
                   <span class="text-larger pointer">Mobile Money</span>
                  </div>
               </div>
               <div class="flex-50 section">
                 <div>
                   <img src="/icons/checked.ico" class="height-40 width-40 pointer icon fit" alt="" />
                   <span class="text-larger pointer">Bank</span>
                  </div>
               </div>
             </div>
             <div class="sub">Monetize your brand now</div>
             <div class="text-larger text-left">Monetization is made easy with our onine platform, <br />
            you can Monetize through hosting ads on your page or allowing users to purchase your content</div>

            </div>
          </div>
          </div>

    

        </div>
    </div>
</div>


<div class="padding-top-50 padding-50 deep-white">

<div class="container">
<div class="section">
  <div class="sub">Easy payments</div>
  <div class="text-larger">You can easy monetize and earn payments through the following payment networks</div>
</div>
  <div class="row">

    <div class="col sm-6 md-6 lg-3">
   <div className="container padding border pointer hover-up network-card">
   <img src="/images/flutter.png" className="width-100-p height-100-p" alt="" />
   </div>
    </div>
    <div class="col sm-6 md-6 lg-3">
   <div className="container padding border pointer hover-up network-card">
   <img src="/images/paypal.png" className="width-100-p height-100-p" alt="" />
   </div>
    </div>
    <div class="col sm-6 md-6 lg-3">
   <div className="container padding border pointer hover-up network-card">
   <img src="/images/mtn.png" className="width-100-p height-100-p" alt="" />
   </div>
    </div>
    <div class="col sm-6 md-6 lg-3">
   <div className="container padding border pointer hover-up network-card">
   <img src="/images/vodafone.png" className="width-100-p height-100-p" alt="" />
   </div>
    </div>

  </div>  
  </div>
  
  <div class="hr section"></div>

<div class="row">
  <div class="col sm-12 md-6 lg-6">
    <div class="container text-left">
      <div class="sub">Secure Payments</div>
    <div className="hover-up pointer">
      <span><img src="/icons/checked.ico" class="height-30 width-30 icon fit" alt="" /></span>
      <span class="text-x-large">We deal with only world most trusted companies</span>
    </div>
    <div class="hr section"></div>
    <div className="hover-up pointer">
      <span><img src="/icons/checked.ico" class="height-30 width-30 icon fit" alt="" /></span>
      <span class="text-x-large">What you earn is what you get.</span>
    </div>
    <div class="hr section"></div>
    <div className="hover-up pointer">
      <span><img src="/icons/checked.ico" class="height-30 width-30 icon fit" alt="" /></span>
      <span class="text-x-large">Fast realible networks.</span>
    </div>
    <div class="hr section"></div>
    <div className="hover-up pointer">
      <span><img src="/icons/checked.ico" class="height-30 width-30 icon fit" alt="" /></span>
      <span class="text-x-large">Engage users.</span>
    </div>
    </div>
  </div>
  <div class="col sm-12 md-6 lg-6 padding text-center left-green">
    <div>
      <video class="pointer hover-up secureVid" src="/video/secure.mp4" autoplay loop ></video>
    </div>
  </div>
</div>
</div>


<div class="container">
  <div class="hr margin-top-40"></div>
  <div className="back-shadow padding">
  <div class="text-big">Contact us</div> 
  <div class="sub">Send us a message</div> 
  <div class="row section">
      <div class="col sm-12 md-6 lg-6 section">
      <div class="container">
          <input type="name" class="input borderless light padding width-100-p no-outline text-large" placeholder="Enter your name" />
      </div>
      </div>
      <div class="col sm-12 md-6 lg-6 section">
      <div class="container">
          <input type="email" class="input borderless light padding width-100-p no-outline text-large" placeholder="Enter your email" />
      </div>
      </div>
      <div class="col sm-12 md-6 lg-6 section">
      <div class="container">
          <button type="button" class="green width-100-p padding button text-large">Subscribe Now</button>
      </div>
      </div>
  </div>
  </div>
</div>

        </div>
        </section>
     );
}
 
export default Home;