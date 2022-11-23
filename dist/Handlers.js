"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.postUser = exports.getUserById = exports.getAllUsers = void 0;
const ConnectDB_js_1 = require("./ConnectDB.js");
const http_status_codes_1 = require("http-status-codes");
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allUsers = yield ConnectDB_js_1.prisma.user.findMany();
        res.json(allUsers);
    }
    catch (e) {
        console.log(e);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
        res.send("Internal Server error");
    }
});
exports.getAllUsers = getAllUsers;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const userById = yield ConnectDB_js_1.prisma.user.findUnique({
        where: {
            id: id
        }
    });
    if (userById === null) {
        res.send("user not found");
    }
    res.json(userById);
});
exports.getUserById = getUserById;
const postUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fullname, email } = req.body;
        const postsData = yield ConnectDB_js_1.prisma.user.create({
            data: {
                fullname: fullname,
                email: email
            }
        });
        res.send("file submited successfully");
    }
    catch (e) {
        console.log(e);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
        res.json({ message: "Internal server error" });
    }
});
exports.postUser = postUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fullname, email } = req.body;
        const { id } = req.params;
        const updateUSer = yield ConnectDB_js_1.prisma.user.update({
            where: {
                id: id,
            },
            data: {
                fullname: fullname,
                email: email
            }
        });
        res.send("user updated successfully");
    }
    catch (e) {
        console.log(e);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
        res.send("STATUS-500 INTERNAL SERVER ERROR");
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deleteUser = yield ConnectDB_js_1.prisma.user.delete({
            where: {
                id: id
            }
        });
        res.send(`${deleteUser.fullname} has been deleted`);
    }
    catch (e) {
        console.log(e);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
        res.send("internal server error");
    }
});
exports.deleteUser = deleteUser;
