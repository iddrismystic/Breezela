import { doc, onSnapshot, collection } from "firebase/firestore";
import Account from "./Account";
import db from './Firebase'
const Userdetails = () => {
    const [currentuser, setcurrentuser] = useState([])
    const [userdata, setuserdata] = useState({})
    useEffect(() =>{
        onSnapshot(doc(db, 'users', currentuser.email),(doc)=>{
         const data = doc.data()
         setuserdata(data)
     })
     }, [])
     
    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
          if (user) {
             setcurrentuser(user)
              //setting database
          } else {
           setcurrentuser("Login In For better experence")
          }
        });
       
      }, [])
    return ( 
    <section>

    </section> 
   
    );
     
}
 
export default Userdetails;