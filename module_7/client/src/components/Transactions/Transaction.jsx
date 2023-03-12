import React from "react";
import { useDispatch } from "react-redux";
import deleteImage from "../../assets/images/delete.svg";
import editImage from "../../assets/images/edit.svg";
import { editActive, removeTransaction } from "../../store/features/transaction/transactionSlice";

const Transaction = ({ transaction }) => {
  const {id, name, type, amount} = transaction;
  const dispatch = useDispatch();
  
  const handleEdit = () => {
    dispatch(editActive(transaction));
  }

  const handleDelete = () => {
    dispatch(removeTransaction(id));
  }

  return (
    <li className={`transaction ${type}`}>
      <p>{name}</p>
      <div className="right">
        <p>৳ {amount}</p>
        <button className="link" onClick={handleEdit}>
          <img className="icon" src={editImage} />
        </button>
        <button className="link" onClick={handleDelete}>
          <img className="icon" src={deleteImage} />
        </button>
      </div>
    </li>
  );
};

export default Transaction;
