import React, { Component } from "react";

import axios from "../../axios.order";
import Aux from "../../hoc/Auxs/Auxs";
import Spinner from "../../components/UI/Spinner/Spinner";
import Modal from "../../components/UI/Modal/Modal";
import Burger from "../../components/Burger/Burger";
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
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
    ingredient: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false
  };
  componentDidMount () {
    axios.get('https://react-my-burger-2970d.firebaseio.com/ingredient.json') // nhớ thêm json để lưu database -> ko sẽ lỗi CORS
    .then(res => {this.setState({ingredient:res.data})})
    .catch(error => {
      this.setState({error: true})
    })
  }
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
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.setState({loading: true});
    const order = {
      ingredients: this.state.ingredient,
      totalPrice: this.state.totalPrice,
      customer: {
        name: "Tam",
        address: {
          street: "Somewhere street",
          zipCode: "424234",
          country: "Viet Nam"
        },
        email: "test@gmail.com"
      },
      deliveryMethod: "fastest"
    };
    axios
      .post("/orders.json", order)
      .then(response => this.setState({loading: false, purchasing: false}))
      .catch(err => this.setState({loading: false, purchasing: false}));
  };
  render() {
    const disabledInfo = { ...this.state.ingredient };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0; // ở đây trả về true/false salad: true, cheese: false...
    }
    let orderSummary = null;
    let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner/>
    if(this.state.ingredient) {
      burger = (
       <Aux>
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
     )
     orderSummary = (
      <OrderSummary
        totalPrice={this.state.totalPrice}
        ingredient={this.state.ingredient}
        purchaseCanceled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler}
      />
    );
    }
    if (this.state.loading) {
      orderSummary = <Spinner />;
    }
    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          backdropClicked={this.purchaseCancel}
        >
          {orderSummary} 
        </Modal>
       {burger}
      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
