import React, {useState, useEffect} from "react";
import FileBase from "react-file-base64";
import {useDispatch, useSelector} from "react-redux";

import "./PostForm.css";
import User from "../../../User/User.js";
import {createPost, updatePost} from "../../../../actions/posts.js";
import {getSocieties} from "../../../../actions/societies.js";
import {isAdmin} from "../../../../privileges.js";

// import AttachFileIcon from '@material-ui/icons/AttachFile';
import AttachFileIcon from "@mui/icons-material/AttachFile";
import Filter from "./Filter/Filter.js";
import FilterD from "./Filter/FilterD";
import {CircularProgress} from "@mui/material";

const PostForm = ({currentId, setCurrentId}) => {
  const user = JSON.parse(localStorage?.getItem("profile"));
  const [loading, setloading] = useState(false);

  const [postData, setPostData] = useState({
    user_id: user?.result._id,
    user_name: user?.result.name,
    message: "",
    selectedFile: "",
    filter: "",
    department: ""
  });
  const post = useSelector(state => (currentId ? state.posts.find(post => post._id === currentId) : null));
  const dispatch = useDispatch();

  useEffect(() => {
    if (post) setPostData(post);
    dispatch(getSocieties());
  }, [post, dispatch]);

  let societies = useSelector(state => state.societies);

  const clear = () => {
    setCurrentId(0);
    setPostData({
      user_id: user.result._id,
      user_name: user.result.name,
      message: "",
      selectedFile: "",
      filter: "",
      department: ""
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (postData.message) {
      if (currentId) {
        dispatch(updatePost(currentId, postData));
      } else {
        dispatch(createPost(postData));
      }
    }
    clear();
  };

  let canPost = false;

  user?.result?.roles.forEach(role => {
    if (role.substring(role.length - 5) === "Admin") {
      canPost = true;
    }
  });

  if (!(canPost || isAdmin())) {
    return null;
  }

  const department = [
    {
      id: 1,
      name: "Computer Science",
      value: "cs"
    },
    {
      id: 2,
      name: "Software Engineering",
      value: "se"
    },
    {
      id: 3,
      name: "Information Technology",
      value: "it"
    },
    {
      id: 4,
      name: "Data Science",
      value: "ds"
    }
  ];

  return (
    <form
      autoComplete='off'
      noValidate
      onSubmit={handleSubmit}>
      <div className='post__form-wrapper feed-box'>
        <div className='post__form-top'>
          <User username={user.result.name} />
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "20px",
              alignItems: "center"
            }}>
            <FilterD
              postData={postData}
              setPostData={setPostData}
              departments={department}
            />
            <Filter
              postData={postData}
              setPostData={setPostData}
              societies={societies}
            />
          </div>
        </div>

        <div className='post__form-textarea'>
          <textarea
            placeholder='Type a message...'
            name='message'
            value={postData.message}
            onChange={e => setPostData({...postData, message: e.target.value})}
          />
        </div>

        <div className='post__form-bottom'>
          <label className='file-upload__icon'>
            <FileBase
              type='file'
              multiple={false}
              onDone={({base64}) => setPostData({...postData, selectedFile: base64})}
              key={postData.selectedFile}
            />

            <AttachFileIcon />
          </label>
          <button
            className='post__publish-btn'
            type='submit'>
            {loading ? <CircularProgress size={20} /> : "Publish"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default PostForm;
