import React from "react";
import classes from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";

const controls = [
  { label: "Salad ", type: "salad" },
  { label: "Meat ", type: "meat" },
  { label: "Bacon ", type: "bacon" },
  { label: "Cheese ", type: "cheese" }
];
const buildControls = props => (
  <div className={classes.BuildCotrols}>
    <p>
      Current Price: <strong>{props.price.toFixed(2)}$</strong>
    </p>
    {controls.map(control => (
      <BuildControl
        key={control.label}
        label={control.label}
        added={() => props.ingredientAdded(control.type)}
        reduced={() => props.ingredientReduced(control.type)}
        disabled={props.disabled[control.type]}
      />
    ))}
    <button className={classes.OrderButton} disabled={!props.purchasable}
        onClick={props.ordered}>
      ORDER NOW
    </button>
  </div>
);

export default buildControls;
