import React from "react";
import { Link } from "react-router-dom";
import { List, ListItem, ListItemText, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import "./styles.css";
import axios from "axios";
function UserList() {
  const [listUser, setListUser] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    
    const fetchData = async () => {
      try{
        const users = await axios.get(
          "http://localhost:8081/api/user/list", {withCredentials: true}
        );
        setListUser(users.data);
        setIsLoggedIn(true);
      }catch(error){
        setIsLoggedIn(false);
        console.log(error);
      }
    };
    fetchData();
  }, [listUser]);
  
  if(isLoggedIn===true){
    return (
      <div>
        <Typography variant="h6">Users</Typography>
        <List component="nav">
          {listUser.map((user) => (
            <ListItem id="list" key={user._id}>
              <Link id="username" to={`/users/${user._id}`}>
                <ListItemText  primary={user.first_name + " " + user.last_name} />
              </Link>
            </ListItem>
          ))}
        </List>
      </div>
    );
  }else{
    return (
      <Typography variant="body1">
        Please log in to see the full user list.
      </Typography>
    );
  }
}

export default UserList;
