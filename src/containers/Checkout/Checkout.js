import React, { Component } from "react";
import { Route } from "react-router-dom";

import ContactData from "./ContactData/ContactData";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
class Checkout extends Component {
  state = {
    ingredient: null,
    price: 0
  };
  componentWillMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredient = {};
    let price = 0;
    for (let param of query.entries()) {
      if(param[0] === 'price') {
        price = param[1];
      } else {
        ingredient[param[0]] = +param[1];
      }
    }
    this.setState({ ingredient: ingredient, totalPrice : price });
  }
  checkoutCancelledHandler = () => {
    this.props.history.goBack(); // navigation link go to back
  };
  checkoutContinuedHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };
  render() {
    return (
      <div>
        <CheckoutSummary
          ingredient={this.state.ingredient}
          price={this.state.totalPrice}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
        />
        <Route
          path={this.props.match.path + "/contact-data"}
          render={(props) => (<ContactData ingredient={this.state.ingredient}
          price={this.state.totalPrice} {...props} />)}
        />
      </div>
    );
  }
}

export default Checkout;
