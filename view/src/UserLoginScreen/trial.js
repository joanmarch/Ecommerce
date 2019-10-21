import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

/* 
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
})); */


const useStyles ={
    root: {
      flexGrow: 0.1,
      height : "10px",
    },
    menuButton: {
      marginRight: 0,
    },
    title: {
      flexGrow: 1,
    },
  }

class ButtonAppBar extends React.Component {

    constructor(){
        super();
    }

  render(){
    /* const classes = useStyles(); */

  return (
    <div style={useStyles.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" style={useStyles.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" style={useStyles.title}>
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
}

export default ButtonAppBar;