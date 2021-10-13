import { useHistory, Link , useParams} from "react-router-dom"
import { doc, onSnapshot, collection } from "firebase/firestore";
import {useState, useEffect} from 'react'
import db from './Firebase'
import { signOut, getAuth, onAuthStateChanged } from "@firebase/auth"
const Page = () => {
    const email = useParams().email
    const [page, setpage] = useState('')
    useEffect(() => {
     onSnapshot(doc(db, 'userpage', email + 'page'),(snapshot)=>{
         const page = snapshot.data()
         setpage(page)
     })
    }, [])
    return (
    <section className='black-light'>
    <div className='relative banner' style={{backgroundImage:`url(${page.coverimage}`}}>
        <div className="profile">
         <img src={page.profile} className='profile-image circle' alt="" />
       </div>
        <div className="absolute bottom-0 left-0 right-0 ">
        <div className='text-large text-right  text-white pink padding fit-width float-right pointer'>Subscibe</div>
        </div>

    </div>
<div className="row">
<div clasaName="sm-12 md-4 lg-4 padding card">
<div>About</div>
</div>
</div>


    </section> );
}
 
export default Page;