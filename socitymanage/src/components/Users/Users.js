import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  createUser,
  getUsers,
  deleteUser,
  updateUser,
} from '../../actions/users.js';

import DataPage from '../DataPage/DataPage.js';
import Avatar from '@mui/material/Avatar';


const Users = (props) => {
  let data = [];
  let mode = props?.location?.pathname.substring(1);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const entities = useSelector((state) => state.users);

  entities.forEach((entity) => {
    if (!(entity.roles.includes('Support') || entity.roles.includes('Admin'))) {
      data.push({ ...entity, password: '********' });
    }
  });

  const columns = [
    { title: 'id', field: 'id', hidden: true },
    {
      title: 'Avatar',
      render: (rowData) => <Avatar>{rowData?.name.charAt(0)}</Avatar>,
    },
    { title: 'Name', field: 'name' },
    { title: 'Username', field: 'username' },
    // { title: 'Password', field: 'password' },
    { title: 'Email', field: 'email' },
    { title: 'CNIC', field: 'cnic' },
    { title: 'Phone No.', field: 'phoneNumber' },
    {
      title: 'Designation',
      field: 'designation',
      lookup: {
        student: 'Student',
        teacher: 'Teacher',
      },
    },
    {
      title: 'Department',
      field: 'department',
      lookup: {
        it: 'Information Technology',
        se: 'Software Engineering',
        cs: 'Computer Science',
        ds: 'Data Science',
      },
    },
  ];

  const handleRowUpdate = (
    newData,
    oldData,
    resolve,
    validations,
    setIserror,
    setErrorMessages
  ) => {
    const fields = { ...newData, __v: true };
    // const fields = { ...newData };
    let noError = validations(fields, resolve, 'update');
    // console.log('newData', json.stringify(newData));
    //   console.log('oldData', oldData._id);
    // dispatch(updateUser(oldData._id, newData));
    if (noError) {
      //no error
      // console.log('newData', json.stringify(newData));
      // console.log('oldData', oldData._id);
      dispatch(updateUser(oldData._id, newData));
      resolve();
      setIserror(false);
      setErrorMessages([]);
    }
  };

  const handleRowAdd = (
    newData,
    resolve,
    validations,
    setIserror,
    setErrorMessages
  ) => {
    let noError = validations(newData, resolve, 'new');

    if (noError) {
      //no error
      dispatch(createUser(newData));

      resolve();
      setErrorMessages([]);
      setIserror(false);
    }
  };

  const handleRowDelete = (oldData, resolve) => {
    dispatch(deleteUser(oldData._id));
    resolve();
  };

  return (
    <DataPage
      mode={mode}
      data={data}
      columns={columns}
      handleRowAdd={handleRowAdd}
      handleRowUpdate={handleRowUpdate}
      handleRowDelete={handleRowDelete}
    />
  );
};

export default Users;
