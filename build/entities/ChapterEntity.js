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
exports.Chapters = void 0;
var class_validator_1 = require("class-validator");
var typeorm_1 = require("typeorm");
var uuid_1 = require("uuid");
var CourseEntity_1 = require("./CourseEntity");
var ContentEntity_1 = require("./ContentEntity");
var Chapters = exports.Chapters = /** @class */ (function () {
    function Chapters(chapter) {
        Object.assign(this, chapter);
    }
    Chapters.prototype.generateUUID = function () {
        this.id = (0, uuid_1.v4)();
    };
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
        __metadata("design:type", String)
    ], Chapters.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return ContentEntity_1.Contents; }, function (content) { return content.contentChapter; }),
        __metadata("design:type", Array)
    ], Chapters.prototype, "content", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return CourseEntity_1.Course; }, function (course) { return course.chapter; }),
        (0, typeorm_1.JoinColumn)({ name: 'courseId' }),
        __metadata("design:type", CourseEntity_1.Course)
    ], Chapters.prototype, "course", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], Chapters.prototype, "Chapter_title", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], Chapters.prototype, "Chapter_description", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)(),
        __metadata("design:type", Date)
    ], Chapters.prototype, "createAt", void 0);
    __decorate([
        (0, typeorm_1.UpdateDateColumn)(),
        __metadata("design:type", Date)
    ], Chapters.prototype, "updateAt", void 0);
    __decorate([
        (0, typeorm_1.BeforeInsert)(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Chapters.prototype, "generateUUID", null);
    Chapters = __decorate([
        (0, typeorm_1.Entity)("chapter"),
        __metadata("design:paramtypes", [Object])
    ], Chapters);
    return Chapters;
}());
//# sourceMappingURL=ChapterEntity.js.map