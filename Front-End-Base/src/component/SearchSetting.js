import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

export default class SearchSetting extends React.Component{
  render()
  {
    const {
      name, phone, id
    } = this.props.val;
    
    return (
      <FormControlLabel
        control={<Checkbox color="default" checked={name} onChange='op1' value="op1" />}
        label="주민등록"
      />
    )
  }
}