const express = require("express");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const mongoose = require("mongoose");
const cors = require("cors");
const fs = require("fs");
const { Pdf } = require("./models/User");
const authRoutes = require("./routes/auth");
const PORT = 5000;

const app = express();
const upload = multer({ dest: "uploads/" });

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/pdfDB", {});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

// File upload route
app.post("/upload", upload.single("file"), async (req, res) => {
  const { path, mimetype } = req.file;

  try {
    let text = "";
    if (mimetype === "application/pdf") {
      const dataBuffer = fs.readFileSync(path);
      const data = await pdfParse(dataBuffer);
      text = data.text;
    } else if (mimetype === "text/plain") {
      text = fs.readFileSync(path, "utf-8");
    } else {
      return res.status(400).json({ error: "Unsupported file type" });
    }

    const pdf = new Pdf({ content: text });
    await pdf.save();

    res.json({ text });
    fs.unlinkSync(path);
  } catch (error) {
    res.status(500).json({ error: "Failed to process file" });
  }
});

// Fetch PDF data route
app.get("/pdfs", async (req, res) => {
  try {
    const pdfs = await Pdf.find();
    res.json(pdfs);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
