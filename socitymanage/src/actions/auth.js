import { AUTH, LOGOUT } from '../constants/actionTypes.js'
import * as api from '../api'

export const login = (formData) => async (dispatch) => {
    try {
        const { data } = await api.login(formData)

        dispatch({ type: AUTH, data })

        window.location.href = '/';
        
    } catch (error) {

        localStorage.setItem('LoginError', error.response.data.message);

        console.log(error.response.data.message)
        return error.response.data.message
    }
}

export const logout = () => async (dispatch) => {
    try {
        dispatch({ type: LOGOUT })

        window.location.href = '/login';
        // ('/login')
    } catch (error) {
        console.log(error)
    }
}