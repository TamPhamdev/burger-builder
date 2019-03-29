import React, { Component } from "react";

import axios from '../../axios.order';
import Aux from "../../hoc/Auxs/Auxs";
import Modal from "../../components/UI/Modal/Modal";
import Burger from "../../components/Burger/Burger";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.7,
  meat: 1.5,
  bacon: 1
};
class BurgerBuilder extends Component {
  state = {
    ingredient: {
      salad: 0,
      cheese: 0,
      meat: 0,
      bacon: 0
    },
    totalPrice: 4,
    purchasable: false,
    purchasing: false
  };

  updatePurchaseState(ingredients) {
    // sum all ingredient
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    this.setState({ purchasable: sum > 0 }); //check true/false
  }
  addIngredientHandler = type => {
    const oldCount = this.state.ingredient[type];
    const updatedCount = oldCount + 1;
    const updatedIngredient = {
      ...this.state.ingredient
    };
    updatedIngredient[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({ totalPrice: newPrice, ingredient: updatedIngredient });
    this.updatePurchaseState(updatedIngredient);
  };

  reduceIngredientHandler = type => {
    const oldCount = this.state.ingredient[type];
    if (oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredient = {
      ...this.state.ingredient
    };
    updatedIngredient[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceAddition;
    this.setState({ totalPrice: newPrice, ingredient: updatedIngredient });
    this.updatePurchaseState(updatedIngredient);
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancel = () => {
    this.setState({ purchasing: false });
  };

  purchaseCancelHandler = () => {
    this.setState({purchasing: false});
  }

  purchaseContinueHandler = () => {
    const order = {
      ingredients: this.state.ingredient,
      totalPrice: this.state.totalPrice,
      customer: {
        name: 'Tam',
        address: {
          street: 'Somewhere street',
          zipCode: '424234',
          country: 'Viet Nam'
        },
        email: 'test@gmail.com'
      },
      deliveryMethod: 'fastest'
    };  
    axios.post('/orders.json', order)
   .then(response => console.log(response))
   .catch(err => console.log(err));
  };
  render() {
    const disabledInfo = { ...this.state.ingredient };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0; // ở đây trả về true/false
    }
    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          backdropClicked={this.purchaseCancel}
        >
          <OrderSummary 
           totalPrice={this.state.totalPrice}
          ingredient={this.state.ingredient} 
          purchaseCanceled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
          />
        </Modal>
        <Burger ingredient={this.state.ingredient} />
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientReduced={this.reduceIngredientHandler}
          disabled={disabledInfo}
          purchasable={this.state.purchasable}
          price={this.state.totalPrice}
          ordered={this.purchaseHandler}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;
