import { Grid, Card, CardMedia, CardContent, Typography } from "@mui/material";
import "./styles.css";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { React, useState, useEffect } from "react";
import AddCommentBox from "./addCommentBox";







function UserPhotos() {
  const { userId } = useParams();
  const [userPhotos, setUserPhotos] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {

    const fetchData = async () => {
      try {
        const userPhotos = await axios(
          `http://localhost:8081/api/photo/photosOfUser/${userId}`, { withCredentials: true }
        );
        setUserPhotos(userPhotos.data);
        setIsLoggedIn(true);
      } catch (er) {
        setIsLoggedIn(false);
        console.log(er);
      }
    };
    fetchData();
  }, [userPhotos, userId]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };
  if (isLoggedIn)
    return (
      <Grid container spacing={2}>
        {userPhotos.map((photo) => {
          return (
            <Grid item sm={9} key={photo._id}>
              <Card>
                <img className="image" src={"http://localhost:8081/images/"+photo.file_name} />
                <CardContent>
                  <Typography variant="body2">
                    Date: {formatDate(photo.date_time)}
                  </Typography>
                  <Typography variant="h6">Comments: <AddCommentBox photoId={photo._id} /></Typography>
                  {photo.comments &&
                    photo.comments.map((comment) => (
                      <div key={comment._id}>
                        <Typography variant="body2">
                          {formatDate(comment.date_time)}
                        </Typography>
                        <Typography variant="body1">
                          <Link to={`/users/${comment.user._id}`}>
                            {`${comment.user.first_name} ${comment.user.last_name}`}
                          </Link>
                          : {comment.comment}
                        </Typography>

                      </div>
                    ))}
                </CardContent>
              </Card>
            </Grid>
          )
        })}

      </Grid>
    );
}

export default UserPhotos;
