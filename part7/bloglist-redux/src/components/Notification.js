import React from 'react';
import { connect } from 'react-redux';
import { Alert, AlertTitle } from '@material-ui/lab';


const Notification = (props) => {

  if (props.notification?.message && props.notification?.type === 'LOGIN_ERR') {
    return (
      <div>
        <Alert >
          <AlertTitle> Error</AlertTitle>
          {props.notification.message}
        </Alert>
      </div>
    )
  } else {
    return (<></>)
  }
}
const mapStateToProps = (state) => {
  return {
    notification: state.notification
  };
};

export default connect(mapStateToProps, null)(Notification)