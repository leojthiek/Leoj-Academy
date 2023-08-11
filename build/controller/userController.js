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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginController = exports.registerController = void 0;
var data_source_1 = require("../data-source");
var UserEntity_1 = require("../entities/UserEntity");
var class_validator_1 = require("class-validator");
var bcrypt_1 = __importDefault(require("bcrypt"));
var generateToken_1 = __importDefault(require("../utils/generateToken"));
//  @ REGISTERING A USER
var registerController = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username, email, password, user, userRepository, userEmail, userName, userValidation, errors, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 5, , 6]);
                _a = req.body, username = _a.username, email = _a.email, password = _a.password;
                user = new UserEntity_1.User({ email: email, password: password, username: username });
                userRepository = data_source_1.AppDataSource.getRepository(UserEntity_1.User);
                return [4 /*yield*/, userRepository.findOne({ where: { email: email } })];
            case 1:
                userEmail = _b.sent();
                return [4 /*yield*/, userRepository.findOne({ where: { username: username } })];
            case 2:
                userName = _b.sent();
                if (userEmail) {
                    return [2 /*return*/, res.status(400).json({ errors: "email already exists" })];
                }
                if (userName) {
                    return [2 /*return*/, res.status(400).json({ errors: "username already taken" })];
                }
                return [4 /*yield*/, (0, class_validator_1.validate)(user)];
            case 3:
                userValidation = _b.sent();
                if (userValidation.length > 0) {
                    errors = userValidation.map(function (error) { return error.constraints[Object.keys(error.constraints)[0]]; });
                    return [2 /*return*/, res.status(400).json({ errors: errors })];
                }
                return [4 /*yield*/, data_source_1.AppDataSource.manager.save(user)];
            case 4:
                _b.sent();
                return [2 /*return*/, res.json({ user: user })];
            case 5:
                error_1 = _b.sent();
                console.log(error_1);
                return [2 /*return*/, res.status(400).json({ errors: 'registration failed something wrong with the server' })];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.registerController = registerController;
// @ USER AUTHENTICATION
var loginController = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, userRepository, user, comparePassword, token, id, email_1, permission, username, userInfo, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, password = _a.password;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                userRepository = data_source_1.AppDataSource.getRepository(UserEntity_1.User);
                return [4 /*yield*/, userRepository.findOne({ where: { email: email } })];
            case 2:
                user = _b.sent();
                if (!user) {
                    return [2 /*return*/, res.status(400).json({ errors: "invalid credential" })];
                }
                return [4 /*yield*/, bcrypt_1.default.compare(password, (user).password)];
            case 3:
                comparePassword = _b.sent();
                if (!comparePassword) {
                    return [2 /*return*/, res.status(400).json({ errors: "invalid credential" })];
                }
                if (user && comparePassword) {
                    token = (0, generateToken_1.default)(user.id);
                    id = user.id, email_1 = user.email, permission = user.permission, username = user.username;
                    userInfo = { id: id, email: email_1, permission: permission, username: username, token: token };
                    return [2 /*return*/, res.status(200).json({ userInfo: userInfo })];
                }
                return [3 /*break*/, 5];
            case 4:
                error_2 = _b.sent();
                console.log(error_2);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.loginController = loginController;
//# sourceMappingURL=userController.js.map