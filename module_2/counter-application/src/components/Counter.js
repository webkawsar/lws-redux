import React from 'react';
import { connect } from 'react-redux';
import { decrement, increment } from '../redux/counter/actions';

// Higher order component
// A Higher order component is a function that takes a component as parameter and returns a new component
// const newComponent = HOC(component);

const Counter = ({count}) => {


  return (
    <div>Counter</div>
  )
}


const mapStateToProps = (state, ownProps) => {
    return {
        count: state.value
    }
}

const mapDIspatchToProps = (dispatch) => {
    return {
        increment: (value) => dispatch(increment(value)),
        decrement: (value) => dispatch(decrement(value)),
    }
}

export default connect(mapStateToProps, mapDIspatchToProps)(Counter);