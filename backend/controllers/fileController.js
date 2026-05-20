const fs = require("fs");
const path = require("path");
const File = require("../models/File");

exports.uploadFile = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const file = await File.create({
      fileName: req.file.filename,
      originalName: req.file.originalname,
      size: req.file.size,
      path: req.file.path,
      uploadedBy: req.user.id,
    });

    const populated = await file.populate("uploadedBy", "name email");

    req.io.emit("fileUploaded", populated);
    res.status(201).json(populated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getFiles = async (req, res) => {
  try {
    const { search } = req.query;
    const query = search ? { originalName: { $regex: search, $options: "i" } } : {};
    const files = await File.find(query).populate("uploadedBy", "name email").sort({ createdAt: -1 });
    res.json(files);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteFile = async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) return res.status(404).json({ message: "File not found" });

    if (file.uploadedBy.toString() !== req.user.id)
      return res.status(403).json({ message: "Not authorized" });

    if (fs.existsSync(file.path)) fs.unlinkSync(file.path);
    await file.deleteOne();

    req.io.emit("fileDeleted", req.params.id);
    res.json({ message: "File deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.downloadFile = async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) return res.status(404).json({ message: "File not found" });

    const filePath = path.resolve(file.path);
    if (!fs.existsSync(filePath)) return res.status(404).json({ message: "File not found on disk" });

    res.download(filePath, file.originalName);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
