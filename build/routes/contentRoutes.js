"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var contentController_1 = require("../controller/contentController");
var protect_1 = require("../middleware/protect");
var router = express_1.default.Router();
router.route('/video/:id').get(protect_1.protect, contentController_1.getVideoContent);
router.route('/admin/content/create/:id').post(contentController_1.createContent);
router.route('/chapter/:id').get(contentController_1.getChapterContent);
exports.default = router;
//# sourceMappingURL=contentRoutes.js.map