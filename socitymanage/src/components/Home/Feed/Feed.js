import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import {deletePost, getPosts} from '../../../actions/posts.js'
import sport from '../../../img/sport.jpg'

import './Feed.css'
import PostForm from './PostForm/PostForm.js'
import Posts from './Posts/Posts.js'
import Post from "./Posts/Post/Post";
import User from "../../User/User";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import moment from "moment/moment";

const Feed = () => {
    const [currentId, setCurrentId] = useState(null)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getPosts())
    }, [dispatch])
    
    return(
      <div className="feed-wrapper" style={{
        paddingBottom: '50px'
      }}>
        <PostForm currentId={currentId} setCurrentId={setCurrentId}/>
        <div className="post-wrapper feed-box" >
          <div className="post__top-bar">
            <User username={'Arslan'}/>
              <div>
                <button
                  className="post__opt-btn"
                  // onClick={() => setCurrentId(post._id)}
                >
                  <EditIcon fontSize="small"/>
                </button>

                <button
                  className="post__opt-btn"
                  // onClick={() => dispatch(deletePost(post._id))}
                >
                  <DeleteIcon fontSize="small"/>
                </button>
              </div>
          </div>
          <div className="post__img-container">
            <img src={sport} alt="" className="post-img"/>
          </div>
          <p className="post-content">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          </p>
          <span className="date">{moment('11-12-2023').fromNow()}</span>
        </div>
        {/*<Posts setCurrentId={setCurrentId} />*/}
      </div>
    )
}

export default Feed