"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var trim_1 = __importDefault(require("./middleware/trim"));
var cors_1 = __importDefault(require("cors"));
var cloudinary_1 = require("cloudinary");
var inititialisedDataSource_1 = __importDefault(require("./utils/inititialisedDataSource"));
var courseRoute_1 = __importDefault(require("./routes/courseRoute"));
var userRoutes_1 = __importDefault(require("./routes/userRoutes"));
var contentRoutes_1 = __importDefault(require("./routes/contentRoutes"));
var dotenvConfig_1 = __importDefault(require("./config/dotenvConfig"));
var app = (0, express_1.default)();
app.use(express_1.default.json({ limit: '50mb' }));
app.use(trim_1.default);
app.use((0, cors_1.default)());
cloudinary_1.v2.config({
    cloud_name: dotenvConfig_1.default.cloudinary_cloud_name,
    api_key: dotenvConfig_1.default.cloudinary_api_key,
    api_secret: dotenvConfig_1.default.cloudinary_api_secret
});
(0, inititialisedDataSource_1.default)().then(function () {
    app.get("/", function (req, res) {
        res.send("hello server");
    });
    app.use("/api/users", userRoutes_1.default);
    app.use("/api/courses", courseRoute_1.default);
    app.use('/api/content', contentRoutes_1.default);
    app.listen(dotenvConfig_1.default.port, function () { return console.log("server is running on ".concat(dotenvConfig_1.default.port)); });
}).catch(function (error) {
    console.log('data source initialized error', error);
    process.exit(1);
});
//# sourceMappingURL=server.js.map