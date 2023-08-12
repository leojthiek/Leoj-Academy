"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var dotenvConfig_1 = __importDefault(require("../config/dotenvConfig"));
var generateToken = function (id) {
    var secretKey = dotenvConfig_1.default.jwt_secret;
    var token = jsonwebtoken_1.default.sign({ id: id }, secretKey, { expiresIn: '30d' });
    return token;
};
exports.default = generateToken;
//# sourceMappingURL=generateToken.js.map