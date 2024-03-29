const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors"); // Import cors module

const bodyParser = require("body-parser");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: {} });

// Enable CORS for all routes
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "3072MB" })); // Tăng giới hạn kích thước lên 900MB

// Định tuyến các API endpoint
require("./src/app/Controllers/CommonController")(app);
require("./src/app/Controllers/AuthController")(app);
require("./src/app/Controllers/UserController")(app);
require("./src/app/Controllers/BankAccountController")(app);
require("./src/app/Controllers/CategoryController")(app);
require("./src/app/Controllers/ConvertImageToTextController")(app);
require("./src/app/Controllers/VirtualAssistantController")(app);

const port = process.env.PORT;
server.listen(port, () => {
  console.log(`Máy chủ đang chạy trên cổng ${port}`);
});
