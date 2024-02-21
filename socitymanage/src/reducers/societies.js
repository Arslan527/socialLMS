import { FETCH_ALL_SOCIETIES, CREATE_SOCIETY, UPDATE_SOCIETY, DELETE_SOCIETY } from '../constants/actionTypes.js'

const societies = (societies = [], action) => {
    switch (action.type) {
        case FETCH_ALL_SOCIETIES:
            return action.payload;
        case CREATE_SOCIETY:
            return [...societies, action.payload];
        case UPDATE_SOCIETY:
            return societies.map((society) => society._id === action.payload._id ? action.payload : society)
        case DELETE_SOCIETY:
            return societies.filter((society) => society._id !== action.payload)
        default:
            return societies;
    }
}

export default societies