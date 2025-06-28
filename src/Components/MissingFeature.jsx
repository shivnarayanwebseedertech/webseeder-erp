// File: src/components/MissingFeature.jsx
import React, { useState, useRef, useEffect } from "react";
import { FiX } from "react-icons/fi";
import { HiOutlineLightBulb } from "react-icons/hi";

export default function MissingFeature() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [type, setType] = useState("feature");
  const [file, setFile] = useState(null);
  const ref = useRef(null);

  // close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: submit logic
    console.log({ title, content, type, file });
    setOpen(false);
  };

  return (
    <div className="relative inline-block text-left" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center p-2 bg-white border border-gray-200 rounded-full shadow hover:bg-gray-50 focus:outline-none"
      >
        <HiOutlineLightBulb className="h-4 w-4 text-gray-600" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-20 p-4 text-sm">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold text-gray-800">
              Request for feature, suggestion or bug.
            </h3>
            <button
              onClick={() => setOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <FiX className="h-5 w-5" />
            </button>
          </div>
          <p className="text-gray-600 text-xs mb-4">
            This form will be used to request new feature, suggestion,
            improvement in existing functionality and submit bug. Vote existing
            request if it is same as your requirement.
          </p>
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-gray-700 text-xs font-medium mb-1">
                Title<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                placeholder="Something short"
                className="w-full border border-gray-300 rounded px-2 py-1 text-xs focus:outline-none focus:ring"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-xs font-medium mb-1">
                Content<span className="text-red-500">*</span>
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                maxLength={300}
                rows={4}
                placeholder="Write about post in more detail here"
                className="w-full border border-gray-300 rounded px-2 py-1 text-xs focus:outline-none focus:ring"
              />
            </div>
            <div className="flex items-center space-x-4 text-xs">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="type"
                  value="feature"
                  checked={type === "feature"}
                  onChange={() => setType("feature")}
                  className="form-radio text-blue-500"
                />
                <span className="ml-1">New Feature/Suggestion</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="type"
                  value="bug"
                  checked={type === "bug"}
                  onChange={() => setType("bug")}
                  className="form-radio text-blue-500"
                />
                <span className="ml-1">Report Bug</span>
              </label>
            </div>
            <div>
              <label className="block text-gray-700 text-xs font-medium mb-1">
                Upload File
              </label>
              <input
                type="file"
                onChange={handleFileChange}
                className="text-xs"
              />
              <p className="text-gray-400 text-xs mt-1">
                Maximum file size: 2 MB
              </p>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white text-xs py-2 rounded hover:bg-blue-700 focus:outline-none"
            >
              Submit
            </button>
            <p className="font-semibold">
              Note: Search the forums to see if your topic has been resolved
              already.
            </p>
            <a href="" className="block text-center text-blue-600 underline">
              view my requests
            </a>
          </form>
        </div>
      )}
    </div>
  );
}
