import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = () => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link='/'> Burger Bulder</NavigationItem>
    <NavigationItem link='/'> Check out</NavigationItem>
  </ul>
);

export default NavigationItems;