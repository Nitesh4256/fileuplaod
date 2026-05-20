import { useState, useEffect, useCallback } from "react";
import api from "../services/api";
import socket from "../socket";
import toast from "react-hot-toast";

export const useFiles = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchFiles = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await api.get(`/api/files${search ? `?search=${search}` : ""}`);
      setFiles(data);
    } catch {
      toast.error("Failed to fetch files");
    } finally {
      setLoading(false);
    }
  }, [search]);

  useEffect(() => { fetchFiles(); }, [fetchFiles]);

  useEffect(() => {
    socket.on("fileUploaded", (file) => {
      setFiles((prev) => [file, ...prev]);
      toast.success(`New file: ${file.originalName}`);
    });
    socket.on("fileDeleted", (id) => {
      setFiles((prev) => prev.filter((f) => f._id !== id));
    });
    return () => {
      socket.off("fileUploaded");
      socket.off("fileDeleted");
    };
  }, []);

  const deleteFile = async (id) => {
    try {
      await api.delete(`/api/files/${id}`);
      toast.success("File deleted");
    } catch {
      toast.error("Delete failed");
    }
  };

  const downloadFile = (id, name) => {
    const token = localStorage.getItem("token");
    const url = `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/files/download/${id}`;
    const a = document.createElement("a");
    a.href = url;
    a.setAttribute("download", name);
    // Use fetch with auth header for download
    fetch(url, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => res.blob())
      .then((blob) => {
        const blobUrl = URL.createObjectURL(blob);
        a.href = blobUrl;
        a.click();
        URL.revokeObjectURL(blobUrl);
      })
      .catch(() => toast.error("Download failed"));
  };

  return { files, loading, search, setSearch, deleteFile, downloadFile, fetchFiles };
};
