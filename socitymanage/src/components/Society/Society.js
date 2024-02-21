import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { updateUserRoles, deleteUserRoles, getUsers } from '../../actions/users.js'

import DataPage from '../DataPage/DataPage.js'
import { Avatar } from '@material-ui/core'
import { useParams } from 'react-router';

const Society = () => {
    const dispatch = useDispatch()

    let societyName = useParams().id

    useEffect(() => {
        dispatch(getUsers())
    }, [dispatch])

    const allUsers = useSelector((state) => state.users)
    let members = [];

    allUsers.forEach(user => {
        if(user.roles.includes(`${societyName} Member`)){
            members.push(user)
        }
    });


    const columns = [
        { title: "id", field: "id", hidden: true },
        { title: "Avatar", render: rowData => <Avatar>{rowData?.name.charAt(0)}</Avatar> },
        { title: "Name", field: "name", editable: 'never' },
        { title: "Username", field: "username", editable: 'onAdd' },
        { title: "Email", field: "email", editable: 'never' },
        { title: "CNIC", field: "cnic", editable: 'never' },
        { title: "Phone No.", field: "phoneNumber", editable: 'never' },
        { title: "Designation", field: "designation", editable: 'never' },
    ]

    const handleRowUpdate = (resolve, setIserror, setErrorMessages) => {
        
        resolve()
        setIserror(false)
        setErrorMessages([])
    }

    const handleRowAdd = (newData, resolve, validation,setIserror, setErrorMessages) => {
        validation(newData, resolve, 'no validation')
        dispatch(updateUserRoles(newData.username, { role: `${societyName} Member` }))
        
        resolve()
        setErrorMessages([])
        setIserror(false)
    }

    const handleRowDelete = (oldData, resolve) => {
        dispatch(deleteUserRoles(oldData.username, {
            role: `${societyName} Member`
        }))

        resolve()
    }

    return (
        <DataPage
            mode={`${societyName} Members`}
            data={members}
            columns={columns}
            handleRowAdd={handleRowAdd}
            handleRowUpdate={handleRowUpdate}
            handleRowDelete={handleRowDelete}
        />
    )
}

export default Society