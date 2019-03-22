import React from 'react';
import Button from '../../UI/Button/Button';
import Aux from '../../../hoc/Auxs';

const OrderSummary = (props) => {
  const ingredientSum = Object.keys(props.ingredient)
    .map(igKey => { return <li key={igKey}> {igKey} : {props.ingredient[igKey]}</li>})
  return (
   <Aux>
     <h3>Your order</h3>
     <p>A dilicious burger with following ingredients</p>
      {ingredientSum}
      <p><strong>Total Price: {props.totalPrice.toFixed(2)}</strong></p>
      <p>Continue to checkout ?</p>
      <Button btnType="Danger" clicked={props.purchaseCanceled}>CANCEL</Button>
      <Button btnType="Success"  clicked={props.purchaseContinued}>CONTINUE</Button>
   </Aux>
  );
};

export default OrderSummary;