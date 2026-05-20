import { useAuth } from "../context/AuthContext";

const formatSize = (bytes) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const formatDate = (date) =>
  new Date(date).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" });

const getIcon = (name) => {
  const ext = name.split(".").pop().toLowerCase();
  const icons = { pdf: "📄", jpg: "🖼️", jpeg: "🖼️", png: "🖼️", gif: "🖼️", mp4: "🎬", mp3: "🎵", zip: "🗜️", rar: "🗜️", doc: "📝", docx: "📝", xls: "📊", xlsx: "📊" };
  return icons[ext] || "📎";
};

const FileCard = ({ file, onDelete, onDownload }) => {
  const { user } = useAuth();
  const isOwner = user?.id === file.uploadedBy?._id;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex items-center gap-4 hover:shadow-md transition">
      <div className="text-3xl">{getIcon(file.originalName)}</div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-gray-800 truncate">{file.originalName}</p>
        <p className="text-xs text-gray-400 mt-0.5">
          {formatSize(file.size)} · {file.uploadedBy?.name} · {formatDate(file.createdAt)}
        </p>
      </div>
      <div className="flex gap-2 shrink-0">
        <button
          onClick={() => onDownload(file._id, file.originalName)}
          className="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 px-3 py-1.5 rounded-lg text-sm font-medium transition"
        >
          ⬇ Download
        </button>
        {isOwner && (
          <button
            onClick={() => onDelete(file._id)}
            className="bg-red-50 hover:bg-red-100 text-red-600 px-3 py-1.5 rounded-lg text-sm font-medium transition"
          >
            🗑 Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default FileCard;
