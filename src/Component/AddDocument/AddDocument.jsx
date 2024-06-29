import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { createDocumentApi } from '../../Apis/Api'; // Adjust the path as necessary

const AddDocument = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const userId = JSON.parse(localStorage.getItem('user'))._id;

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !description || !file) {
      toast.error("Please fill in all fields and upload a file.");
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('file', file);

    try {
      const response = await createDocumentApi(userId, formData);

      if (response.data.success) {
        toast.success("Document added successfully!");
        setName('');
        setDescription('');
        setFile(null);
      } else {
        toast.error(response.data.message || "Failed to add document.");
      }
    } catch (error) {
      toast.error("An error occurred while adding the document.");
    }
  };

  return (
    <div className="p-4">
      <div className="pt-10 mt-3">
        <div className="text-[#F97316] font-bold text-3xl">Add Document</div>
        <div className="text-orange-600">Add Your Personal Document</div>
        <form onSubmit={handleSubmit} className="grid lg:col-span-2 md:col-span-2 col-span-1 sm:col-span-2 gap-3 mb-5 w-full">
          <div> 
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Document Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-gray-50 border border-orange-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-orange-700 dark:border-orange-600 dark:placeholder-orange-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
              placeholder="Document Name"
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
            <input
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-gray-50 border border-orange-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-orange-700 dark:border-orange-600 dark:placeholder-orange-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
              placeholder="Description"
              required
            />
          </div>
          <div className="border p-1 border-orange-500 rounded-md">
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-orange-300 border-dashed rounded-lg cursor-pointer bg-orange-50 dark:hover:bg-bray-800 dark:bg-orange-700 hover:bg-orange-100 dark:border-orange-600 dark:hover:border-orange-500 dark:hover:bg-orange-600"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className="w-8 h-8 mb-4 text-orange-500 dark:text-orange-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-orange-500 dark:text-orange-400">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-orange-500 dark:text-orange-400">SVG, PNG, JPG or GIF</p>
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            </div>
            {file && (
              <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Selected file: {file.name}
              </div>
            )}
          </div>
          <button 
            type="submit"
            className="flex gap-4 px-3 p-2 bg-[#F97316] text-white rounded-md mt-3 hover:bg-orange-300 font-bold w-fit"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
            >
              <path
                fillRule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z"
                clipRule="evenodd"
              />
            </svg>
            Add Document
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddDocument;
