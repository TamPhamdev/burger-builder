import React from "react";
import classes from "./Burger.module.css";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const burger = (props) => {

  let ingredientTransform = Object.keys(props.ingredient).map( igKey => {
    return [...Array(props.ingredient[igKey])].map((_, i) => {
     return  <BurgerIngredient key={igKey+i}  type={igKey}/>
    });
  }).reduce((arr, el) => { //flat an array 
    return arr.concat(el);
  },[]);
  
  if(ingredientTransform.length === 0) {
    ingredientTransform = <p>Please add some ingredient</p>
  }
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {ingredientTransform}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default burger;
