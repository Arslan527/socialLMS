import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { createSociety, getSocieties, deleteSociety, updateSociety } from '../../actions/societies.js'
import { updateUserRoles, deleteUserRoles } from '../../actions/users.js'

import DataPage from '../DataPage/DataPage.js'
import { Avatar } from '@material-ui/core'

import './Societies.css'

const Societies = (props) => {
    let mode = props?.location?.pathname.substring(1)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getSocieties())
    }, [dispatch])

    const data = useSelector((state) => state.societies)

    const columns = [
        { title: "id", field: "id", hidden: true },
        { title: "Avatar", render: rowData => <Avatar>{rowData?.username.charAt(0)}</Avatar> },
        { title: "Name", field: "username", render: rowData => <a href={`/societies/${rowData?.username}`} className="society-link" >{rowData?.username}</a> },
        { title: "Email", field: "email" },
        { title: "Admin", field: "admin" },
        { title: "President", field: "president" },
        { title: "Vice President", field: "vicePresident" },
        { title: "Role", field: "role" },
    ]

    const handleRowUpdate = (newData, oldData, resolve, validations, setIserror, setErrorMessages) => {
        const fields = { ...newData, __v: true }
        let noError = validations(fields, resolve, "update")

        if (noError) { //no error
            dispatch(updateSociety(oldData._id, newData))
            if(newData.username !== oldData.username){
                console.log(newData, oldData)
                dispatch(deleteUserRoles(oldData.admin, {
                    role: `${oldData.username} Admin`
                }))
                dispatch(deleteUserRoles(oldData.president, {
                    role: `${oldData.username} President`
                }))
                dispatch(deleteUserRoles(oldData.vicePresident, {
                    role: `${oldData.username} vicePresident`
                }))
            }

            dispatch(updateUserRoles(newData.admin, {
                role: `${newData.username} Admin`,
                oldUsername: oldData.admin
            }))
            dispatch(updateUserRoles(newData.president, {
                role: `${newData.username} President`,
                oldUsername: oldData.president
            }))
            dispatch(updateUserRoles(newData.vicePresident, {
                role: `${newData.username} vicePresident`,
                oldUsername: oldData.vicePresident
            }))

            resolve()
            setIserror(false)
            setErrorMessages([])
        }
    }

    const handleRowAdd = (newData, resolve, validations, setIserror, setErrorMessages) => {
        let noError = validations(newData, resolve, "new")

        if (noError) { //no error
            dispatch(createSociety(newData))
            dispatch(updateUserRoles(newData.admin, { role: `${newData.username} Admin` }))
            dispatch(updateUserRoles(newData.president, { role: `${newData.username} President` }))
            dispatch(updateUserRoles(newData.vicePresident, { role: `${newData.username} vicePresident` }))

            resolve()
            setErrorMessages([])
            setIserror(false)

        }
    }

    const handleRowDelete = (oldData, resolve) => {
        dispatch(deleteSociety(oldData._id))
        dispatch(deleteUserRoles(oldData.admin, {
            role: `${oldData.username} Admin`
        }))
        dispatch(deleteUserRoles(oldData.president, {
            role: `${oldData.username} President`
        }))
        dispatch(deleteUserRoles(oldData.vicePresident, {
            role: `${oldData.username} vicePresident`
        }))

        resolve()
    }

    return (
        <DataPage
            mode={mode}
            data={data}
            columns={columns}
            handleRowAdd={handleRowAdd}
            handleRowUpdate={handleRowUpdate}
            handleRowDelete={handleRowDelete}
        />
    )
}

export default Societies