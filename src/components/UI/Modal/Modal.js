import React, {Component} from 'react';
import classes from './Modal.module.css';
import Aux from '../../../hoc/Auxs/Auxs';
import Backdrop from '../Backdrop/Backdrop'; 


class Modal extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    if(nextProps.show !== this.props.show) {
      return true; //check update OrderSummary when Modal only show
    }
  }
  render () {
    return (
    <Aux>
      <Backdrop show={this.props.show} clicked={this.props.backdropClicked}/>
        <div className={classes.Modal}
          style={{transform: this.props.show ? 'translateY(0)' : 'translateY:(-100vh)',
            //opacity: props.show ? '1' : '0',
            display: this.props.show ? 'block' : 'none'
        }}
        >
          {this.props.children}
        </div>
    </Aux>
    );
  }
} 

export default Modal;