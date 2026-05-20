const router = require("express").Router();
const auth = require("../middleware/auth");
const upload = require("../middleware/upload");
const { uploadFile, getFiles, deleteFile, downloadFile } = require("../controllers/fileController");

router.get("/", auth, getFiles);
router.post("/upload", auth, upload.single("file"), uploadFile);
router.delete("/:id", auth, deleteFile);
router.get("/download/:id", auth, downloadFile);

module.exports = router;
