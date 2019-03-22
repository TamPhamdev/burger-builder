import React from 'react';
import logo from '../../assets/images/26.1 burger-logo.png.png';
import classes from './Logo.module.css';

const Logo = (props) => {
  return (
    <div className={classes.Logo} style={{height: props.height}}>
      <img src={logo} alt="Burger logo"/>
    </div>
  );
};

export default Logo;