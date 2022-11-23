"use strict";
/**
 * Author: Kwame Ato
 * Date: 18th November, 2022
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ConnectDB_1 = __importDefault(require("./ConnectDB"));
const http_status_codes_1 = require("http-status-codes");
const body_parser_1 = __importDefault(require("body-parser"));
const Handlers_1 = require("./Handlers");
const cors_1 = __importDefault(require("cors"));
// connect database message
(0, ConnectDB_1.default)();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({
    extended: true
}));
const PORT = process.env.PORT;
app.get("/api", Handlers_1.getAllUsers);
app.get("/api/:id", Handlers_1.getUserById);
app.post("/api", Handlers_1.postUser);
app.put("/api/:id", Handlers_1.updateUser);
app.delete("/api/:id", Handlers_1.deleteUser);
/**
 * Custom error page
 */
app.use((req, res) => {
    res.status(http_status_codes_1.StatusCodes.NOT_FOUND);
    res.send("404 page not found");
});
app.use((req, res) => {
    res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
    res.send("INTERNAL SERVER ERROR");
});
//server
app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}\nPress Ctl + C to terminate server`);
});
