import React from 'react';
import { useNavigate } from "react-router-dom";
import { Menu, MenuItem, ListItemText } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
// import Menu from '@material-ui/core/Menu';
// import MenuItem from '@material-ui/core/MenuItem';
// import ListItemText from '@material-ui/core/ListItemText';
// import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { useDispatch } from 'react-redux'
import { isAdmin } from '../../../privileges.js'

import { logout } from "../../../actions/auth.js"

const StyledMenu = ((props) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
));

const NavOptions = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const navigationHandleClick = (event) => {
        navigate(`/${event.target.innerText.toLowerCase()}`);
    }

    const logoutHandle = () => {
        dispatch(logout())
    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <ArrowDropDownIcon
                onClick={handleClick}
            />
            <StyledMenu
                id="customized-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {
                    isAdmin() ? (
                        <>
                            <MenuItem
                                onClick={navigationHandleClick}
                            >
                                <ListItemText primary="Users" />
                            </MenuItem>
                            <MenuItem
                                onClick={navigationHandleClick}
                            >
                                
                                <ListItemText primary="Societies" />
                            </MenuItem>
                        </>
                    ) : null
                }
                
                {/* <div>
                    <MenuItem
                        onClick={navigationHandleClick}
                    >
                        <ListItemText primary="Users" />
                    </MenuItem>
                    <MenuItem
                        onClick={navigationHandleClick}
                    >

                        <ListItemText primary="Societies" />
                    </MenuItem>
                </div> */}
                <MenuItem
                    onClick={navigationHandleClick}
                >
                    <ListItemText primary="Change Password" />
                </MenuItem>

                <hr />

                <MenuItem
                    onClick={logoutHandle}
                >
                    <ListItemText primary="Log Out" />
                </MenuItem>
            </StyledMenu>
        </div>
    );
}

export default NavOptions