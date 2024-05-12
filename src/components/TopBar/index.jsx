import React, { useState, useEffect } from 'react';
import {
  AppBar, Button, Toolbar, Typography
} from '@mui/material';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import UploadPhoto from './uploadPhoto';


function TopBar() {
  const [id, setId] = useState(0);
  const [userInfo, setUserInfo] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUserInfo, setLoggedInUserInfo] = useState({});
  let location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get("http://localhost:8081/admin/loginUser", { withCredentials: true });
        const loggedInUserInfoModel = {
          _id: response.data.userId,
          first_name: response.data.first_name,
          last_name: response.data.last_name
        };
        setLoggedInUserInfo(loggedInUserInfoModel);
        setIsLoggedIn(true);
      } catch (err) {
        console.log(err);
        setIsLoggedIn(false);
      }
    };

    fetchUserInfo();
  }, [isLoggedIn]);

  useEffect(() => {
    const userId = getUserId();
    if (userId) {
      const fetchUserDetail = async () => {
        try {
          const response = await axios.get(`http://localhost:8081/api/user/${userId}`, { withCredentials: true });
          if (userId !== id) {
            const userInfoModel = {
              _id: response.data._id,
              first_name: response.data.first_name,
              last_name: response.data.last_name,
              location: response.data.location,
              description: response.data.description,
              occupation: response.data.occupation
            };
            setUserInfo(userInfoModel);
            setId(userId);
          }
        } catch (err) {
          console.log(err);
        }
      };

      fetchUserDetail();
    }
  }, [location]);

  const getUserId = () => {
    const currentURL = window.location.href;
    let userId;
    if (currentURL.includes("/users/")) {
      userId = currentURL.substring(currentURL.indexOf("/users/") + "/users/".length);
    } else if (currentURL.includes("/photos/")) {
      userId = currentURL.substring(currentURL.indexOf("/photos/") + "/photos/".length);
    }
    return userId;
  };

  const loginStatus = () => {
    if (isLoggedIn)
      return (
        <Toolbar >
          <Typography style={{ marginRight: 16 }}>{`Hello ${loggedInUserInfo.first_name}!`}</Typography>
          <UploadPhoto userId={loggedInUserInfo._id} />
          <Button variant='contained' color="secondary" onClick={handleLogout} size="small" style={{ marginLeft: 16 }}> Logout </Button>
        </Toolbar>

      )
  };

  const title = () => {
    let title = "";
    if (isLoggedIn) {
      const currentURL = location.pathname;
      let user;
      if (currentURL.includes("/users/")) {
        user = userInfo;
        if (user) title = `User Detail of ${user.first_name} ${user.last_name}`
      } else if (currentURL.includes("/photos/")) {
        user = userInfo;
        if (user) title = `Photos of ${user.first_name} ${user.last_name}`;
      }
    } else {
      return (
        <Link to="/login">Please Login</Link>
      )
    }
    return title
  };

  const handleLogout = (event) => {
    event.preventDefault();
    if (isLoggedIn) {
      axios.get("http://localhost:8081/admin/logout", { withCredentials: true })
        .then((response) => {
          console.log(response);
          navigate("/login");
          sessionStorage.clear();
          setIsLoggedIn(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <AppBar className="topbar-appBar" position="absolute">
      <Toolbar>
        <Typography>
          Photo Sharing App
        </Typography>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1 }}
        ></Typography>
        <Typography>
          {loginStatus()}
        </Typography>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1 }}
        ></Typography>
        <Typography>
          {title()}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
