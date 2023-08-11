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
exports.Course = void 0;
var class_validator_1 = require("class-validator");
var typeorm_1 = require("typeorm");
var uuid_1 = require("uuid");
var UserEntity_1 = require("./UserEntity");
var ChapterEntity_1 = require("./ChapterEntity");
var CoursePurchaseEntity_1 = require("./CoursePurchaseEntity");
var Course = /** @class */ (function () {
    function Course(course) {
        Object.assign(this, course);
    }
    Course.prototype.generateUUID = function () {
        this.id = (0, uuid_1.v4)();
    };
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
        __metadata("design:type", String)
    ], Course.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return ChapterEntity_1.Chapters; }, function (chapter) { return chapter.course; }),
        __metadata("design:type", Array)
    ], Course.prototype, "chapter", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return UserEntity_1.User; }, function (user) { return user.courses; }),
        (0, typeorm_1.JoinColumn)({ name: "instructorId" }),
        __metadata("design:type", UserEntity_1.User)
    ], Course.prototype, "instructor", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return CoursePurchaseEntity_1.CoursePurchase; }, function (purchase) { return purchase.course; }),
        __metadata("design:type", Array)
    ], Course.prototype, "coursePurchase", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], Course.prototype, "course_name", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], Course.prototype, "course_image", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], Course.prototype, "course_category", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], Course.prototype, "course_description", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], Course.prototype, "course_instructor", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], Course.prototype, "course_price", void 0);
    __decorate([
        (0, typeorm_1.Column)({ default: 0 }),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", Number)
    ], Course.prototype, "numOfReviews", void 0);
    __decorate([
        (0, typeorm_1.Column)({ default: 0 }),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", Number)
    ], Course.prototype, "rating", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)(),
        __metadata("design:type", Date)
    ], Course.prototype, "createAt", void 0);
    __decorate([
        (0, typeorm_1.UpdateDateColumn)(),
        __metadata("design:type", Date)
    ], Course.prototype, "updateAt", void 0);
    __decorate([
        (0, typeorm_1.BeforeInsert)(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Course.prototype, "generateUUID", null);
    Course = __decorate([
        (0, typeorm_1.Entity)("courses"),
        __metadata("design:paramtypes", [Object])
    ], Course);
    return Course;
}());
exports.Course = Course;
//# sourceMappingURL=CourseEntity.js.map