import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
class Checkout extends Component {
  render() {
    return (
      <div>
        <CheckoutSummary ingredient/>
      </div>
    );
  }
}

export default Checkout;