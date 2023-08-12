"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var userController_1 = require("../controller/userController");
var router = express_1.default.Router();
router.route('/register').post(userController_1.registerController);
router.route('/login').post(userController_1.loginController);
exports.default = router;
//# sourceMappingURL=userRoutes.js.map