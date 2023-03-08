import React from "react";

const Tag = ({tag}) => {
  return (
    <div className="bg-blue-100 text-blue-600 px-4 py-1 rounded-full cursor-pointer">
      {tag.title}
    </div>
  );
};

export default Tag;
