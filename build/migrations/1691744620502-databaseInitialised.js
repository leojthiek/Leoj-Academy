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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseInitialised1691744620502 = void 0;
var DatabaseInitialised1691744620502 = /** @class */ (function () {
    function DatabaseInitialised1691744620502() {
        this.name = 'DatabaseInitialised1691744620502';
    }
    DatabaseInitialised1691744620502.prototype.up = function (queryRunner) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, queryRunner.query("CREATE TABLE \"content\" (\"id\" uuid NOT NULL DEFAULT uuid_generate_v4(), \"title\" character varying NOT NULL, \"description\" character varying NOT NULL, \"videoURL\" character varying NOT NULL, \"createAt\" TIMESTAMP NOT NULL DEFAULT now(), \"updateAt\" TIMESTAMP NOT NULL DEFAULT now(), \"chapterId\" uuid, CONSTRAINT \"PK_6a2083913f3647b44f205204e36\" PRIMARY KEY (\"id\"))")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("CREATE TABLE \"chapter\" (\"id\" uuid NOT NULL DEFAULT uuid_generate_v4(), \"Chapter_title\" character varying NOT NULL, \"Chapter_description\" character varying NOT NULL, \"createAt\" TIMESTAMP NOT NULL DEFAULT now(), \"updateAt\" TIMESTAMP NOT NULL DEFAULT now(), \"courseId\" uuid, CONSTRAINT \"PK_275bd1c62bed7dff839680614ca\" PRIMARY KEY (\"id\"))")];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("CREATE TABLE \"coursePurchase\" (\"id\" uuid NOT NULL DEFAULT uuid_generate_v4(), \"totalPrice\" character varying NOT NULL, \"isPaid\" boolean NOT NULL DEFAULT false, \"paidAt\" TIMESTAMP NOT NULL, \"createAt\" TIMESTAMP NOT NULL DEFAULT now(), \"updateAt\" TIMESTAMP NOT NULL DEFAULT now(), \"userId\" uuid, \"courseId\" uuid, CONSTRAINT \"PK_5521162d75df1b5287c0da08d98\" PRIMARY KEY (\"id\"))")];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("CREATE TABLE \"courses\" (\"id\" uuid NOT NULL DEFAULT uuid_generate_v4(), \"course_name\" character varying NOT NULL, \"course_image\" character varying NOT NULL, \"course_category\" character varying NOT NULL, \"course_description\" character varying NOT NULL, \"course_instructor\" character varying NOT NULL, \"course_price\" character varying NOT NULL, \"numOfReviews\" integer NOT NULL DEFAULT '0', \"rating\" integer NOT NULL DEFAULT '0', \"createAt\" TIMESTAMP NOT NULL DEFAULT now(), \"updateAt\" TIMESTAMP NOT NULL DEFAULT now(), \"instructorId\" uuid, CONSTRAINT \"PK_3f70a487cc718ad8eda4e6d58c9\" PRIMARY KEY (\"id\"))")];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("CREATE TABLE \"users\" (\"id\" uuid NOT NULL DEFAULT uuid_generate_v4(), \"username\" character varying NOT NULL, \"email\" character varying NOT NULL, \"password\" character varying NOT NULL, \"permission\" character varying NOT NULL DEFAULT 'user', \"createAt\" TIMESTAMP NOT NULL DEFAULT now(), \"updateAt\" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT \"UQ_97672ac88f789774dd47f7c8be3\" UNIQUE (\"email\"), CONSTRAINT \"PK_a3ffb1c0c8416b9fc6f907b7433\" PRIMARY KEY (\"id\"))")];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"content\" ADD CONSTRAINT \"FK_795c0437bce51c85049ebecbbe2\" FOREIGN KEY (\"chapterId\") REFERENCES \"chapter\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION")];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"chapter\" ADD CONSTRAINT \"FK_b56f1474e3c40c58be083a7bdfd\" FOREIGN KEY (\"courseId\") REFERENCES \"courses\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION")];
                    case 7:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"coursePurchase\" ADD CONSTRAINT \"FK_a18c56f5b37dff7ce0d04205738\" FOREIGN KEY (\"userId\") REFERENCES \"users\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION")];
                    case 8:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"coursePurchase\" ADD CONSTRAINT \"FK_932315a9dacc0fcd4780e3d5c0f\" FOREIGN KEY (\"courseId\") REFERENCES \"courses\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION")];
                    case 9:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"courses\" ADD CONSTRAINT \"FK_e6714597bea722629fa7d32124a\" FOREIGN KEY (\"instructorId\") REFERENCES \"users\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION")];
                    case 10:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DatabaseInitialised1691744620502.prototype.down = function (queryRunner) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, queryRunner.query("ALTER TABLE \"courses\" DROP CONSTRAINT \"FK_e6714597bea722629fa7d32124a\"")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"coursePurchase\" DROP CONSTRAINT \"FK_932315a9dacc0fcd4780e3d5c0f\"")];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"coursePurchase\" DROP CONSTRAINT \"FK_a18c56f5b37dff7ce0d04205738\"")];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"chapter\" DROP CONSTRAINT \"FK_b56f1474e3c40c58be083a7bdfd\"")];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"content\" DROP CONSTRAINT \"FK_795c0437bce51c85049ebecbbe2\"")];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP TABLE \"users\"")];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP TABLE \"courses\"")];
                    case 7:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP TABLE \"coursePurchase\"")];
                    case 8:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP TABLE \"chapter\"")];
                    case 9:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP TABLE \"content\"")];
                    case 10:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return DatabaseInitialised1691744620502;
}());
exports.DatabaseInitialised1691744620502 = DatabaseInitialised1691744620502;
//# sourceMappingURL=1691744620502-databaseInitialised.js.map