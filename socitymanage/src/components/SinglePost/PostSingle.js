import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import User from '../User/User';
import moment from 'moment';
import { useParams } from 'react-router-dom';

const PostSingle = () => {
    const param = useParams();
  const [post, setPost] = useState({})
  console.log(param.id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:7000/posts/singlepost/${param.id}`
        );
        const jsonData = await response.json();
        console.log(jsonData);
        setPost(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

  }, []);

    return (
      <div className="post-wrapper feed-box">
        <div className="post__top-bar">
          <User username={post?.user_name} />
        </div>
        <div className="post__img-container " style={{
          display: post?.selectedFile ? 'block' : 'none'

        }}>
          <img src={post?.selectedFile} alt="" className="post-img" style={{
            width: '70%',
            height: '70%',
          }} />
        </div>
        <p className="post-content">{post?.message}</p>
        <span className="date">{moment(post?.createdAt).fromNow()}</span>
      </div>
    );
}

export default PostSingle