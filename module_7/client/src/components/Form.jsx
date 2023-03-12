import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTransaction, editInActive, updateTransaction } from "../store/features/transaction/transactionSlice";

const initialInputData = {
  name: "",
  type: "income",
  amount: "",
};

const Form = () => {
  const dispatch = useDispatch();
  const { isLoading, isSuccess, isError } = useSelector(
    (state) => state.transaction
  );
  const [input, setInput] = useState(initialInputData);
  const [editMode, setEditMode] = useState(false);
  const { editing } = useSelector((state) => state.transaction);

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreate = (e) => {
    e.preventDefault();

    // fire action
    dispatch(createTransaction(input));

    // reset form
    setInput(initialInputData);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    
    // fire action
    dispatch(updateTransaction({
      id: editing?.id,
      data: input
    }));

    // reset form
    setInput(initialInputData);

    // form state change
    setEditMode(false);
  }

  const cancelEdit = () => {
    setEditMode(false);
    dispatch(editInActive());
  };

  useEffect(() => {
    const { id, name, type, amount } = editing;
    if (id) {
      setEditMode(true);
      setInput(editing);
    } else {
      setEditMode(false);
      setInput(initialInputData);
    }
  }, [editing]);

  const { name, type, amount } = input;
  return (
    <div className="form">
      <h3>Add new transaction</h3>

      <form onSubmit={editMode ? handleUpdate : handleCreate}>
        <div className="form-group">
          <label htmlFor="transaction_name">Name</label>
          <input
            type="text"
            name="name"
            id="transaction_name"
            placeholder="Transaction name"
            onChange={handleChange}
            value={name}
            required
          />
        </div>

        <div className="form-group radio">
          <label>Type</label>
          <div className="radio_group">
            <input
              type="radio"
              name="type"
              value="income"
              id="transaction_type_income"
              onChange={handleChange}
              checked={type === "income"}
            />
            <label htmlFor="transaction_type_income">Income</label>
          </div>
          <div className="radio_group">
            <input
              type="radio"
              value="expense"
              name="type"
              id="transaction_type_expense"
              placeholder="Expense"
              onChange={handleChange}
              checked={type === "expense"}
            />
            <label htmlFor="transaction_type_expense">Expense</label>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="transaction_amount">Amount</label>
          <input
            type="number"
            placeholder="Enter amount"
            name="amount"
            id="transaction_amount"
            onChange={handleChange}
            value={amount}
            required
          />
        </div>

        <button className="btn" type="submit" disabled={isLoading}>
          {editMode ? 'Update Transaction' : 'Add Transaction'}
        </button>
      </form>

      {isError && <p className="error">There was an error occurred.</p>}

      {editMode && (
        <button className="btn cancel_edit" onClick={cancelEdit}>
          Cancel Edit
        </button>
      )}
    </div>
  );
};

export default Form;
