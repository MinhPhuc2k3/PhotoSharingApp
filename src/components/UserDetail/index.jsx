import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import "./styles.css";
import { useParams} from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function UserDetail() {
  const { userId } = useParams();
  const [user, setUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try{
        const user = await axios(
          `http://localhost:8081/api/user/${userId}`, {withCredentials: true}
        );
        setUser(user.data);
        setLoggedIn(true);
      }catch(er){
        console.log(er);
        setLoggedIn(false);
      }
    };
      fetchData();
      
  },[user]);
  if (!user) return <p>User not found</p>;
  return (
    <Card>
      <CardContent>
        <Typography variant="h5">
          {user.first_name} {user.last_name}
        </Typography>
        <Typography variant="body2">Location: {user.location}</Typography>
        <Typography variant="body2">Description: {user.description}</Typography>
        <Typography variant="body2">Occupation: {user.occupation}</Typography>
      </CardContent>
      <CardActions>
        <Button component={Link} to={`/photos/${userId}`}>
          Photos
        </Button>
      </CardActions>
    </Card>
  );
}

export default UserDetail;
