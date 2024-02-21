import { getSocieties } from '../../actions/societies.js'
import {store} from '../../index.js'

export const info = () => {
    store.dispatch(getSocieties())
    const societies = store.getState().societies

    // console.log(societies)

    return {
        societies
    }
}