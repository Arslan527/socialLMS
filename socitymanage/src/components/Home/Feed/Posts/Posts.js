import React from "react";
// import { CircularProgress } from '@material-ui/core'
import {CircularProgress} from "@mui/material";
import {useSelector} from "react-redux";

import "./Posts.css";
import Post from "./Post/Post.js";

import {isAdmin} from "../../../../privileges.js";

const Posts = ({setCurrentId}) => {
  const posts = useSelector(state => state.posts);
  const user = JSON.parse(localStorage.getItem("profile"));
  return !posts.length ? (
    <div
      className='loading '
      style={{
        width: "100%",
        height: "80dvh",
        display: "flex",
        justifyContent: "center",
        marginTop: "40px"
      }}>
      <CircularProgress />
    </div>
  ) : (
    <div className='posts-wrapper'>
      {posts
        ?.slice(0)
        .reverse()
        .map(post => {
          if (post.filter) {
            if (
              user.result.roles.includes(`${post.filter} vicePresident`) ||
              user.result.roles.includes(`${post.filter} President`) ||
              user.result.roles.includes(`${post.filter} Admin`) ||
              user.result.roles.includes(`${post.filter} Member`) ||
              isAdmin()
            ) {
              return (
                <div key={post._id}>
                  <Post
                    post={post}
                    setCurrentId={setCurrentId}
                  />
                </div>
              );
            }
          } else {
            return (
              <div key={post._id}>
                <Post
                  post={post}
                  setCurrentId={setCurrentId}
                />
              </div>
            );
          }
        })}
    </div>
  );
};

export default Posts;
