import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { IconButton } from '@material-ui/core'
import { Avatar, IconButton } from '@mui/material';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import User from '../User/User.js';
import NavOptions from './NavOptions/NavOptions.js';
import './Nav.css';
import moment from 'moment';

const Nav = () => {
  const user = JSON.parse(localStorage.getItem('profile')) || {
    result: {
      name: 'Guest',
    },
  };
  // console.log(user.result.department);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:7000/posts/${user.result.department}`
        );
        const jsonData = await response.json();
        // console.log(jsonData);
        setPosts(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

//   const [timeDiffrance, setTimeDiffrance] = useState([]);

//   useEffect(() => {
//     if (posts.length > 0) {
//       const calculateTimeDifferenceInMinutes = (givenTime) => {
//         const now = new Date();
//         const given = new Date(givenTime);

//         // Calculate the time difference in milliseconds
//         const timeDiff = now - given;

//         // Convert the time difference to minutes
//         const minutesDiff = Math.floor(timeDiff / 60000);

//         return minutesDiff;
//       };
//       setTimeDiffrance(
//         posts.map((post) => {
//           return calculateTimeDifferenceInMinutes(post.createdAt);
//         })
//       );
//     }
//     // console.log(timeDiffrance);
//   }, [posts]);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  };
  const showSinglePost = (id) => {
    navigate(`/posts/${id}`);
  };

  const [showNoti, setShowNoti] = useState(false);

  return (
    <div className="nav-wrapper">
      <div className="nav-left">
        <div className="nav-logo">
          <span className="nav-logo-span" onClick={handleClick}>
            Social LMS
          </span>
        </div>
      </div>

      <div className="nav-right">
        {/*{user.result.name === 'Guest' ? (
          ' '
        ) : (
          <div className="noti">
            <span onClick={() => setShowNoti(!showNoti)}>
              {posts.length >= 10 ? '9+' : posts.length}
            </span>

            <NotificationsActiveIcon onClick={() => setShowNoti(!showNoti)} />
            {showNoti && (
              <div className="NotiBox">
                <div className="notification title">
                  <h2>Notifications</h2>
                </div>
                {posts.map((post, index) => (
                  <div
                    className="notification notiHover"
                    key={index}
                    onClick={() => showSinglePost(post._id)}
                  >
                    <Avatar>{post.user_name.charAt(0)}</Avatar>
                    <div className="desc">
                      <p>
                        <strong>{post.user_name} { " "} </strong>
                        created a post.
                      </p>
                      <p>
                        {moment(post.createdAt).fromNow()}
                      </p>
                    </div>
                    {post.selectedFile && (
                      <img src={post?.selectedFile} alt="" />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}*/}
        <User username={user.result.name} />

        <IconButton>
          <NavOptions />
        </IconButton>
      </div>
    </div>
  );
};

export default Nav;
