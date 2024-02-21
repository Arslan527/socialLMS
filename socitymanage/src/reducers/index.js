import { combineReducers } from 'redux'

import posts from './posts.js'
import users from './users.js'
import societies from './societies.js'
import auth from './auth.js'

export default combineReducers({
    posts,
    users,
    societies,
    auth
})