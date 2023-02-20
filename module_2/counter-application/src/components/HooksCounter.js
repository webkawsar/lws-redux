import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment } from '../redux/counter/actions';

const HooksCounter = () => {
  const count = useSelector(state => state.value);
  const dispatch = useDispatch();
  
  
  const incrementHandler = (value) => {
    dispatch(increment(value));
  }
  
  const decrementHandler = (value) => {
    dispatch(decrement(value));
  }


  
  return (
    <div>HooksCounter</div>
  )
}

export default HooksCounter