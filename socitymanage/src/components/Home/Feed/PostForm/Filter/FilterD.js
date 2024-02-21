import React from 'react';
import { MenuItem, Select } from '@mui/material';

const FilterD = ({ postData, setPostData, departments }) => {
  const filterChange = (e) => {
    console.log(e.target.value);
    setPostData({ ...postData, department: e.target.value });
  };

  return (
    <div>
      <Select value={postData.department} onChange={filterChange} displayEmpty>
        <MenuItem value=""> Select Department</MenuItem>
        {departments?.map((department) => {
          return (
            <MenuItem key={department._id} value={department.value}>
              {department.name}
            </MenuItem>
          );
        })}
      </Select>
    </div>
  );
};

export default FilterD;
