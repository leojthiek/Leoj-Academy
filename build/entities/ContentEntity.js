"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contents = void 0;
var class_validator_1 = require("class-validator");
var typeorm_1 = require("typeorm");
var uuid_1 = require("uuid");
var ChapterEntity_1 = require("./ChapterEntity");
var Contents = exports.Contents = /** @class */ (function () {
    function Contents(content) {
        Object.assign(this, content);
    }
    Contents.prototype.generateUUID = function () {
        this.id = (0, uuid_1.v4)();
    };
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
        __metadata("design:type", String)
    ], Contents.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return ChapterEntity_1.Chapters; }, function (chapter) { return chapter.content; }),
        (0, typeorm_1.JoinColumn)({ name: "chapterId" }),
        __metadata("design:type", ChapterEntity_1.Chapters)
    ], Contents.prototype, "contentChapter", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Contents.prototype, "title", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Contents.prototype, "description", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], Contents.prototype, "videoURL", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)(),
        __metadata("design:type", Date)
    ], Contents.prototype, "createAt", void 0);
    __decorate([
        (0, typeorm_1.UpdateDateColumn)(),
        __metadata("design:type", Date)
    ], Contents.prototype, "updateAt", void 0);
    __decorate([
        (0, typeorm_1.BeforeInsert)(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Contents.prototype, "generateUUID", null);
    Contents = __decorate([
        (0, typeorm_1.Entity)("content"),
        __metadata("design:paramtypes", [Object])
    ], Contents);
    return Contents;
}());
//# sourceMappingURL=ContentEntity.js.map