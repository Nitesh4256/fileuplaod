import Navbar from "../components/Navbar";
import UploadZone from "../components/UploadZone";
import FileCard from "../components/FileCard";
import { useFiles } from "../hooks/useFiles";

const Dashboard = () => {
  const { files, loading, search, setSearch, deleteFile, downloadFile } = useFiles();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        {/* Upload Zone */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Upload File</h2>
          <UploadZone />
        </div>

        {/* Files Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
            <h2 className="text-lg font-semibold text-gray-700">
              Shared Files
              <span className="ml-2 text-sm font-normal text-gray-400">({files.length})</span>
            </h2>
            <input
              type="text"
              placeholder="🔍 Search files..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 w-full sm:w-64"
            />
          </div>

          {loading ? (
            <div className="text-center py-12 text-gray-400">
              <div className="text-3xl mb-2">⏳</div>
              <p>Loading files...</p>
            </div>
          ) : files.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <div className="text-4xl mb-2">📭</div>
              <p>{search ? "No files match your search" : "No files uploaded yet"}</p>
            </div>
          ) : (
            <div className="space-y-3">
              {files.map((file) => (
                <FileCard
                  key={file._id}
                  file={file}
                  onDelete={deleteFile}
                  onDownload={downloadFile}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
