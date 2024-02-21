import { FETCH_ALL_USERS, CREATE_USER, UPDATE_USER, UPDATE_USER_ROLES, DELETE_USER, DELETE_USER_ROLES } from '../constants/actionTypes.js'
import * as api from '../api'

// Action Creators
export const getUsers = () => async (dispatch) => {
    try {
        const { data } = await api.fetchUsers()

        dispatch({type: FETCH_ALL_USERS, payload: data})
    } catch (error) {
        console.log(error)
    }
}

export const createUser = (user) => async (dispatch) => {
    try {
        const { data } = await api.createUser(user)
        
        dispatch({type: CREATE_USER, payload: data.result})
    } catch (error) {
        console.log(error)
        return error
    }
}

export const updateUser = (id, user) => async (dispatch) => {
    try {
        const { data } = await api.updateUser(id, user)
        
        dispatch({type: UPDATE_USER, payload: data})
    } catch (error) {
        console.log(error)
    }
}

export const updateUserRoles = (username, role) => async (dispatch) => {
    try {
        const { data } = await api.updateUserRoles(username, role)

        dispatch({type: UPDATE_USER_ROLES, payload: data})
    } catch (error) {
        console.log(error)
    }
}

export const deleteUser = (id) => async (dispatch) => {
    try {
        await api.deleteUser(id)
        
        dispatch({type: DELETE_USER, payload: id})
    } catch (error) {
        console.log(error)
    }
}

export const deleteUserRoles = (username, role) => async (dispatch) => {
    try {
        const { data } = await api.deleteUserRoles(username, role)

        dispatch({type: DELETE_USER_ROLES, payload: data})
    } catch (error) {
        console.log(error)
    }
}