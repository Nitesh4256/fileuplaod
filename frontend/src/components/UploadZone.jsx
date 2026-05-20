import { useState, useRef } from "react";
import api from "../services/api";
import toast from "react-hot-toast";

const UploadZone = () => {
  const [dragging, setDragging] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef();

  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    setUploading(true);
    setProgress(0);
    try {
      await api.post("/api/files/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (e) => setProgress(Math.round((e.loaded * 100) / e.total)),
      });
      toast.success("File uploaded!");
    } catch {
      toast.error("Upload failed");
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) uploadFile(file);
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) uploadFile(file);
    e.target.value = "";
  };

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      onClick={() => !uploading && inputRef.current.click()}
      className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-all
        ${dragging ? "border-indigo-500 bg-indigo-50" : "border-gray-300 hover:border-indigo-400 hover:bg-gray-50"}`}
    >
      <input ref={inputRef} type="file" className="hidden" onChange={handleChange} />
      <div className="text-4xl mb-3">📁</div>
      {uploading ? (
        <div className="space-y-2">
          <p className="text-sm text-gray-600">Uploading... {progress}%</p>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      ) : (
        <>
          <p className="text-gray-600 font-medium">Drag & drop a file here</p>
          <p className="text-sm text-gray-400 mt-1">or click to browse (max 100MB)</p>
        </>
      )}
    </div>
  );
};

export default UploadZone;
