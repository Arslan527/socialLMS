import { FETCH_ALL_SOCIETIES, CREATE_SOCIETY, UPDATE_SOCIETY, DELETE_SOCIETY } from '../constants/actionTypes.js'
import * as api from '../api'

// Action Creators
export const getSocieties = () => async (dispatch) => {
    try {
        const { data } = await api.fetchSocieties()

        dispatch({type: FETCH_ALL_SOCIETIES, payload: data})
    } catch (error) {
        console.log(error)
    }
}

export const createSociety = (society) => async (dispatch) => {
    try {
        const { data } = await api.createSociety(society)
        
        dispatch({type: CREATE_SOCIETY, payload: data.result})
    } catch (error) {
        console.log(error)
        return error
    }
}

export const updateSociety = (id, society) => async (dispatch) => {
    try {
        const { data } = await api.updateSociety(id, society)
        
        dispatch({type: UPDATE_SOCIETY, payload: data})
    } catch (error) {
        console.log(error)
    }
}

export const deleteSociety = (id) => async (dispatch) => {
    try {
        await api.deleteSociety(id)
        
        dispatch({type: DELETE_SOCIETY, payload: id})
    } catch (error) {
        console.log(error)
    }
}