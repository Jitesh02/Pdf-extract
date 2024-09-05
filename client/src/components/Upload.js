import React, { useState, useRef } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus } from "@fortawesome/free-regular-svg-icons";

const Upload = () => {
  const [file, setFile] = useState(null);
  const [content, setContent] = useState("");
  const fileInputRef = useRef(null);

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setFile(selectedFile);

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post(
        "http://localhost:5000/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setContent(response.data.text);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className=" vh-100 ">
      {/* Sidebar (left) */}
      <div className="bg-dark text-light d-flex flex-column align-items-center col-md-2 col-3 p-3 vh-100 position-fixed top-0">
        <h1>Upload File</h1>
        <FontAwesomeIcon
          icon={faSquarePlus}
          size="2x"
          className="text-light mt-3"
          onClick={handleIconClick}
          style={{ cursor: "pointer" }}
        />
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".pdf,.txt"
          style={{ display: "none" }}
        />
      </div>

      {/* Content area (right) */}
      <div className="bg-light">
        <h1 className=" w-25 m-auto">Extracted Content</h1>
        <p className="col-md-7 col-8 p-4 m-auto ps-5">{content}</p>
      </div>
    </div>
  );
};

export default Upload;
