import React from 'react';
import { makeStyles } from '@material-ui/core/styles';


export const useNavStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding:5 
  },

  title: {
    flexGrow: 1,
    display: 'block',
   
  },

}));
