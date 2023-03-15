// import Success from "../ui/Success";
import { useState } from "react";
import { useAddVideoMutation } from "../../features/api/apiSlice";
import Success from "../ui/Success";
import TextArea from "../ui/TextArea";
import TextInput from "../ui/TextInput";

const initialData = {
  title: "",
  author: "",
  description: "",
  link: "",
  thumbnail: "",
  date: "",
  duration: "",
  views: "",
};

export default function Form() {
  const [inputData, setInputData] = useState(initialData);
  const [addVideo, { data: video, isLoading, isSuccess, isError, error }] =
    useAddVideoMutation();

  const handleChange = (e) => {
    setInputData({
      ...inputData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    addVideo(inputData);

    // reset form data
    setInputData(initialData);
  };

  const { title, author, description, link, thumbnail, date, duration, views } =
    inputData;

  return (
    <form onSubmit={handleSubmit}>
      <div className="shadow overflow-hidden sm:rounded-md">
        <div className="px-4 py-5 bg-white sm:p-6">
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-3">
              <TextInput
                title="Video Title"
                name="title"
                onChange={handleChange}
                value={title}
                required
              />
            </div>

            <div className="col-span-6 sm:col-span-3">
              <TextInput
                title="Author"
                name="author"
                onChange={handleChange}
                value={author}
                required
              />
            </div>

            <div className="col-span-6">
              <TextArea
                title="Description"
                name="description"
                onChange={handleChange}
                value={description}
                required
              />
            </div>

            <div className="col-span-6">
              <TextInput
                title="YouTube Video link"
                name="link"
                onChange={handleChange}
                value={link}
                required
              />
            </div>

            <div className="col-span-6">
              <TextInput
                name="thumbnail"
                title="Thumbnail link"
                onChange={handleChange}
                value={thumbnail}
                required
              />
            </div>

            <div className="col-span-6 sm:col-span-6 lg:col-span-2">
              <TextInput
                title="Upload Date"
                name="date"
                type="date"
                onChange={handleChange}
                value={date}
                required
              />
            </div>

            <div className="col-span-6 sm:col-span-3 lg:col-span-2">
              <TextInput
                title="Video Duration"
                name="duration"
                onChange={handleChange}
                value={duration}
                required
              />
            </div>

            <div className="col-span-6 sm:col-span-3 lg:col-span-2">
              <TextInput
                title="Video no of views"
                name="views"
                onChange={handleChange}
                value={views}
                required
              />
            </div>
          </div>
        </div>
        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-indigo-500"
            disabled={isLoading}
          >
            Save
          </button>
        </div>

        {isSuccess && <Success message="Video was added successfully" />}
        {isError && <Success message={error.message} />}
      </div>
    </form>
  );
}
