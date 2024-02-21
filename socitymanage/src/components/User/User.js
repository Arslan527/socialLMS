import React from 'react'
// import { Avatar } from '@material-ui/core'
import { Avatar } from '@mui/material';
import './User.css'

const User = (props) => {
    return (
        <div className="nav-user__info">
            <Avatar>{props?.username?.charAt(0)}</Avatar>
            <h4 className="nav-user__name">{props.username}</h4>
        </div>
    )
}

export default User