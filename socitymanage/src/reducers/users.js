import { FETCH_ALL_USERS, CREATE_USER, UPDATE_USER, UPDATE_USER_ROLES, DELETE_USER, DELETE_USER_ROLES } from '../constants/actionTypes.js'

const users = (users = [], action) => {
    switch (action.type) {
        case FETCH_ALL_USERS:
            return action.payload;
        case CREATE_USER:
            return [...users, action.payload];
        case UPDATE_USER:
            return users.map((user) => user._id === action.payload._id ? action.payload : user)
        case UPDATE_USER_ROLES:
            return action.payload
        case DELETE_USER:
            return users.filter((user) => user._id !== action.payload)
        case DELETE_USER_ROLES:
            return action.payload
        default:
            return users;
    }
}

export default users