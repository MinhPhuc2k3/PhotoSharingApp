import { Box, IconButton, TextField } from "@mui/material"
import { useState } from "react";
import { Send } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function AddCommentBox(props) {
    const [comment, setComment] = useState("");

    const handleClick = (event) => {
        if (comment) {
            axios.post(`http://localhost:8081/api/photo/${props.photoId}`, { comment: comment}, { withCredentials: true });
        }
    }

    const handleChange = (event) => {
        setComment(event.target.value);
    }

    return (
        <Box>
            <TextField value={comment} onChange={handleChange} />
            <IconButton onClick={handleClick}><Send /></IconButton>
        </Box>

    );
}
export default AddCommentBox;