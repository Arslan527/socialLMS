import React, { useState, forwardRef } from 'react';

import MaterialTable from 'material-table';
// import AddBox from '@material-ui/icons/AddBox';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
// import ArrowDownward from '@material-ui/icons/ArrowDownward';
// import Check from '@material-ui/icons/Check';
import CheckIcon from '@mui/icons-material/Check';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
// import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
// import ChevronRight from '@material-ui/icons/ChevronRight';
import ClearIcon from '@mui/icons-material/Clear';
// import Clear from '@material-ui/icons/Clear';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
// import DeleteOutline from '@material-ui/icons/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
// import Edit from '@material-ui/icons/Edit';
import FilterListIcon from '@mui/icons-material/FilterList';
// import FilterList from '@material-ui/icons/FilterList';
// import FirstPage from '@material-ui/icons/FirstPage';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';
// import LastPage from '@material-ui/icons/LastPage';
import RemoveIcon from '@mui/icons-material/Remove';
// import Remove from '@material-ui/icons/Remove';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
// import SaveAlt from '@material-ui/icons/SaveAlt';
// import Search from '@material-ui/icons/Search';
import SearchIcon from '@mui/icons-material/Search';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
// import ViewColumn from '@material-ui/icons/ViewColumn';
// import Alert from '@material-ui/lab/Alert';
import { Alert } from '@mui/material';

import Nav from '../Nav/Nav.js';
import './DataPage.css';

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBoxIcon {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <CheckIcon {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <ClearIcon {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => (
    <DeleteOutlineIcon {...props} ref={ref} />
  )),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRightIcon {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <EditIcon {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAltIcon {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterListIcon {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPageIcon {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPageIcon {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => (
    <ChevronRightIcon {...props} ref={ref} />
  )),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeftIcon {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <ClearIcon {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <SearchIcon {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => (
    <ArrowDownwardIcon {...props} ref={ref} />
  )),
  ThirdStateCheck: forwardRef((props, ref) => (
    <RemoveIcon {...props} ref={ref} />
  )),
  ViewColumn: forwardRef((props, ref) => (
    <ViewColumnIcon {...props} ref={ref} />
  )),
};

const DataPage = (props) => {
  //for error handling
  const [iserror, setIserror] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);

  const validations = (newData, resolve, mode) => {
    if (mode !== 'no validation') {
      //validation
      let errorList = [];

      // Checks if user already exists
      if (mode === 'new') {
        let entityExists = false;
        for (let i = 0; i < props.data.length; i++) {
          if (props.data[i].username === newData.username) {
            entityExists = true;
            break;
          }
        }
        if (entityExists) {
          errorList.push('Entity already exists');
        }
      }

      // Checks any field is empty
      function isEmpty(newData) {
        if (Object.keys(newData).length > props.columns.length - 3) {
          for (let key in newData) {
            if (!newData[key]) {
              return true;
            }
          }
          return false;
        } else {
          return true;
        }
      }

      if (isEmpty(newData)) {
        errorList.push('Please fill all fields');
      }

      // validates the email address
      function validateEmail(email) {
        const re =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
      }

      if (newData.email) {
        if (!validateEmail(newData.email)) {
          errorList.push('Please enter a valid email address');
        }
      }

      if (errorList.length < 1) {
        return true;
      } else {
        setErrorMessages(errorList);
        setIserror(true);
        resolve();
      }
    }
  };

  return (
    <div className="data-page">
      <Nav />
      <div className="data-page__header">
        {/* <h1 className="data-page__heading">{props.mode}</h1> */}
      </div>

      <div className="">
        <div>
          {iserror && (
            <Alert severity="error">
              {errorMessages.map((msg, i) => {
                return <div key={i}>{msg}</div>;
              })}
            </Alert>
          )}
        </div>
        <MaterialTable
          title=""
          columns={props.columns}
          data={props.data}
          icons={tableIcons}
          direction="rtl"
          editable={{
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve) => {
                props.handleRowUpdate(
                  newData,
                  oldData,
                  resolve,
                  validations,
                  setIserror,
                  setErrorMessages
                );
              }),
            onRowAdd: (newData) =>
              new Promise((resolve) => {
                props.handleRowAdd(
                  newData,
                  resolve,
                  validations,
                  setIserror,
                  setErrorMessages
                );
              }),
            onRowDelete: (oldData) =>
              new Promise((resolve) => {
                props.handleRowDelete(oldData, resolve);
              }),
          }}
        />
      </div>
    </div>
  );
};

export default DataPage;
