import React, { useState } from "react";

const Form = () => {
  const [input, setInput] = useState({
    name: "",
    type: "income",
    amount: "",
  });

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(input, 'input')
  }


  const { name, type, amount } = input;
  return (
    <div className="form">
      <h3>Add new transaction</h3>

      <form onSubmit={handleSubmit}>
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
              checked={type === 'income'}
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
              checked={type === 'expense'}
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

        <button className="btn" type="submit">
          Add Transaction
        </button>
      </form>

      <button className="btn cancel_edit">Cancel Edit</button>
    </div>
  );
};

export default Form;
