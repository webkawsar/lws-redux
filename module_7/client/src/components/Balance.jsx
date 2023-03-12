import React from "react";
import { useSelector } from "react-redux";
import thousandSeparatorWithCommas from "../utils/thousandSeparatorWithCommas";

const Balance = () => {
  const { transactions } = useSelector((state) => state.transaction);

  const calculateTotal = (transactions) => {
    return transactions.reduce((total, current) => {
      if(current.type === 'expense') {
        return total - current.amount;
      } else {
        return total + current.amount;
      }
    }, 0)
  };

  return (
    <div className="top_card">
      <p>Your Current Balance</p>
      <h3>
        <span>৳</span>
        <span>{transactions.length ? thousandSeparatorWithCommas(calculateTotal(transactions)) : 0}</span>
      </h3>
    </div>
  );
};

export default Balance;
