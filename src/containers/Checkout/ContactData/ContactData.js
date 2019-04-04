import React, { Component } from 'react';

import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from "../../../axios.order";
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import Input from '../../../components/UI/Input/Input';
class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    },
    loading: false
  }

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({loading: true});
    const order = {
      ingredients: this.props.ingredient,
      price: this.props.price,
      customer: {
        name: "Tam",
        email: "test@gmail.com",
        address: {
          street: "Somewhere street",
          postalCode: "424234",
        }
      }
    };
    axios
      .post("/orders.json", order)
      .then(response => {
        this.setState( { loading: false} );
        this.props.history.push('/');
      }) 
      .catch(err => this.setState({loading: false}));
  }

  render() {
    let form = ( <form>
    <Input inputype="input" type="text" name="name" placeholder="Your name"/>
    <Input inputype="input" type="text" name="emai" placeholder="Your Mail"/>
    <Input inputype="input" type="text" name="street" placeholder="Street"/>
    <Input inputype="input" type="text" name="postal" placeholder="Postal"/>
    <Button btnType="Success" clicked={this.orderHandler}> Order</Button>
    </form>);
    if(this.state.loading) { form = <Spinner/>}
    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;