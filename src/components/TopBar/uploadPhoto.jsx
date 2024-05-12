import { Button } from "@mui/material"
import { useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function UploadPhoto({userId}){
    const [image , setImage] = useState(null);
    const navigate = useNavigate();
    const handleClick = async (events)=>{
        console.log(`/photos/${userId}`);
        navigate(`/photos/${userId}`);
        events.preventDefault();
        const formData = new FormData();
        formData.append('image', image);
        await axios.post("http://localhost:8081/api/photos/new",formData, {
            withCredentials:true,
            headers: {
                'Content-Type': 'multipart/form-data'
              }
        })
        .then((res) => {
        })
        .catch((er)=>console.log(er));
        
    }
    const handleChange = (event)=>{
        setImage(event.target.files[0]);
    }
    return (
        <div>
            <input type="file" title = "UploadPhoto" name="UploadPhoto" onChange={handleChange}/>
            <Button variant='contained'color="success" onClick={handleClick} size="small">Upload</Button>
        </div>
    )
}