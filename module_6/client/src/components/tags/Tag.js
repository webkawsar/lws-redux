import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { tagRemoved, tagSelected } from "../../features/filter/filterSlice";

const Tag = ({ tag }) => {
  const dispatch = useDispatch();
  const { tags } = useSelector(state => state.filter);
  const { title } = tag;

  const isSelected = tags.includes(title);
  const style = isSelected ? "bg-blue-600 text-white px-4 py-1 rounded-full cursor-pointer" : "bg-blue-100 text-blue-600 px-4 py-1 rounded-full cursor-pointer"

  const handleSelect= () => {
    if(isSelected) {
      dispatch(tagRemoved(title));
    } else {
      dispatch(tagSelected(title));
    }
  }
  
  return (
    <div className={style} onClick={handleSelect}>
      {title}
    </div>
  );
};

export default Tag;
