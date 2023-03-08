import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTags } from "../../features/tags/tagsSlice";
import Tag from "./Tag";

const Tags = () => {
  const { tags } = useSelector((state) => state.tags);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTags());
  }, [dispatch]);

  return (
    <>
      {tags.length ? (
        <section>
          <div className="max-w-7xl mx-auto px-5 py-6 lg:px-0 flex gap-2 border-b overflow-y-auto">
            {tags.map((tag) => (
              <Tag tag={tag} key={tag.id} />
            ))}

            {/* <div
                      className="bg-blue-600 text-white px-4 py-1 rounded-full cursor-pointer"
                  >
                      redux
                  </div> */}
          </div>
        </section>
      ) : null}
    </>
  );
};

export default Tags;
