import React from 'react';
import Burger from '../../Burger/BurgerIngredient/BurgerIngredient';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.module.css';

const CheckoutSummary = (props) => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>We hope it tastes well !</h1>
      <div style={{width: '100%', margin: 'auto'}}>
        <Burger ingredient={props.ingredient}/>
        <Button btnType="Danger" clicked>Cancel</Button>
        <Button btnType="Success" clicked>Continue</Button>
      </div>
    </div>
  );
};

export default CheckoutSummary;