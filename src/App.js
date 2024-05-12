import "./App.css";

import { React, useEffect } from "react";
import {Typography, Paper } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TopBar from "./components/TopBar";
import UserDetail from "./components/UserDetail";
import UserList from "./components/UserList";
import UserPhotos from "./components/UserPhotos";
import LoginRegister from "./components/loginRegister/LoginRegister";
import Register from "./components/loginRegister/Register";
const App = (props) => {
  let isLoggedIn = false;
  useEffect(() => {
    isLoggedIn = sessionStorage.getItem("isLoggedIn");
  });
  if (true) {
    return (
      <Router>
        <div >
          <Grid container spacing={2}>
            <Grid item xs={12} style={{position:"fixed"}}>
              <TopBar />
            </Grid>
            <div className="main-topbar-buffer" />
            <Grid item sm={3}>
              <Paper id="SideBar" className="main-grid-item">
                <UserList />
              </Paper>
            </Grid>
            <Grid item sm={9}>
              <Paper id="Content" className="main-grid-item" elevation={0}>
                <Routes>
                  <Route path="/login" element={<LoginRegister/>}/>
                  <Route path="/users/:userId" element={<UserDetail />} />
                  <Route path="/photos/:userId" element={<UserPhotos />} />
                  <Route path="/users" element={<UserList />} />
                  <Route path="/register" element={<Register />}/>
                </Routes>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </Router>
    );
  }
};

export default App;
