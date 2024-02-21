import React from 'react'
import { useDispatch } from 'react-redux'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import './Post.css'
import User from '../../../../User/User.js'
import moment from 'moment'
import { isSupport } from '../../../../../privileges.js'

import { deletePost } from '../../../../../actions/posts'

const Post = ({ post, setCurrentId }) => {
    const user = JSON.parse(localStorage.getItem('profile'))
    const dispatch = useDispatch()
    let postCreator = false

    if (user?.result._id === post.user_id || isSupport()) {
        postCreator = true
    }

    return (
        <div className="post-wrapper feed-box">
            <div className="post__top-bar">
                <User username={post.user_name} />
                {postCreator ? (
                    <div>
                        <button
                            className="post__opt-btn"
                            onClick={() => setCurrentId(post._id)}>
                            <EditIcon fontSize="small" />
                        </button>

                        <button
                            className="post__opt-btn"
                            onClick={() => dispatch(deletePost(post._id))}>
                            <DeleteIcon fontSize="small" />
                        </button>
                    </div>
                ) : null}
            </div>
            <div className="post__img-container">
                <img src={post?.selectedFile} alt="" className="post-img" />
            </div>
            <p className="post-content">
                {post.message}
            </p>
            <span className="date">{moment(post.createdAt).fromNow()}</span>
        </div>
    )
}

export default Post