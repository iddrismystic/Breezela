import {useState, useEffect} from 'react'
import { useHistory } from 'react-router-dom'
const Filetype = () => {
    const redirect = useHistory()
    const [type, settype] = useState('')
    const Handletype = (newType) => {
      settype(newType)
    }
    if(type == 'Image'){
     
    }
    else if(type == 'Video'){
    redirect.push('/uploadvideo')
    }
    else if(type == 'Audio'){
    
    }else{
     
    }
    return ( 
    <section>
  <div className="container">
      <div className="border padding section light">
     <div className="text-x-large text-left">Choose The File Type</div>
     <div className="hr"></div>
<div> 
<select className='input border padding width-100-p black text-white'
        onChange={(event) => Handletype(event.target.value)}
        value={type}
      >
        <option value="">Select format</option>
        <option value="Image">Image</option>
        <option value="Video">Video</option>
        <option value="Audio">Audio</option>
        <option value="Text">Text</option>
      </select>
</div>

<p>
    Make sure to choose the correct file format, Images, videos, audio, and Text.
</p>
      </div>
      </div>      
    </section> );
}
 
export default Filetype;