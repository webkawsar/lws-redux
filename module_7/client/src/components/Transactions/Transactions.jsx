import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransactions } from "../../store/features/transaction/transactionSlice";
import Transaction from "./Transaction";

const Transactions = () => {
  const dispatch = useDispatch();
  const {isLoading, isSuccess, isError, transactions, error} = useSelector(state => state.transaction);


  useEffect(() => {
    dispatch(fetchTransactions());
  }, [])

  let content = null;
  if(isLoading) content = <p className="loading">Loading...</p>;
  if(isError) content = <p className="error">There was an error occurred.</p>;
  if(isSuccess && transactions.length === 0) {
    content = <p>No transaction found!</p>;
  }
  if(isSuccess && transactions.length > 0) {
    content = transactions.map(transaction => <Transaction transaction={transaction} key={transaction.id} />);
  }
  
  return (
    <>
      <p className="second_heading">Your Transactions:</p>

      <div className="conatiner_of_list_of_transactions">
        <ul>
          { content }
        </ul>
      </div>
    </>
  );
};

export default Transactions;
