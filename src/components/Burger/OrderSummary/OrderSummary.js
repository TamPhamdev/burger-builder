import React, {Component} from 'react';
import Button from '../../UI/Button/Button';
import Aux from '../../../hoc/Auxs/Auxs';

class OrderSummary extends Component {
  componentWillUpdate() {
    console.log('Order will update');
  }
  render () {
    const ingredientSum = Object.keys(this.props.ingredient)
      .map(igKey => { return <li key={igKey}> {igKey} : {this.props.ingredient[igKey]}</li>})
    return (
     <Aux>
       <h3>Your order</h3>
       <p>A dilicious burger with following ingredients</p>
        {ingredientSum}
        <p><strong>Total Price: {this.props.totalPrice.toFixed(2)}</strong></p>
        <p>Continue to checkout ?</p>
        <Button btnType="Danger" clicked={this.props.purchaseCanceled}>CANCEL</Button>
        <Button btnType="Success"  clicked={this.props.purchaseContinued}>CONTINUE</Button>
     </Aux>
    );
  }
};

export default OrderSummary;