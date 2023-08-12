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
exports.CoursePurchase = void 0;
var class_validator_1 = require("class-validator");
var typeorm_1 = require("typeorm");
var uuid_1 = require("uuid");
var UserEntity_1 = require("./UserEntity");
var CourseEntity_1 = require("./CourseEntity");
var CoursePurchase = exports.CoursePurchase = /** @class */ (function () {
    function CoursePurchase(coursePurchase) {
        Object.assign(this, coursePurchase);
    }
    CoursePurchase.prototype.generateUUID = function () {
        this.id = (0, uuid_1.v4)();
    };
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
        __metadata("design:type", String)
    ], CoursePurchase.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return UserEntity_1.User; }, function (users) { return users.coursePurchase; }),
        (0, class_validator_1.IsNotEmpty)(),
        (0, typeorm_1.JoinColumn)({ name: 'userId' }),
        __metadata("design:type", UserEntity_1.User)
    ], CoursePurchase.prototype, "user", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return CourseEntity_1.Course; }, function (course) { return course.coursePurchase; }),
        (0, class_validator_1.IsNotEmpty)(),
        (0, typeorm_1.JoinColumn)({ name: 'courseId' }),
        __metadata("design:type", CourseEntity_1.Course)
    ], CoursePurchase.prototype, "course", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], CoursePurchase.prototype, "totalPrice", void 0);
    __decorate([
        (0, typeorm_1.Column)({ default: false }),
        __metadata("design:type", Boolean)
    ], CoursePurchase.prototype, "isPaid", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Date)
    ], CoursePurchase.prototype, "paidAt", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)(),
        __metadata("design:type", Date)
    ], CoursePurchase.prototype, "createAt", void 0);
    __decorate([
        (0, typeorm_1.UpdateDateColumn)(),
        __metadata("design:type", Date)
    ], CoursePurchase.prototype, "updateAt", void 0);
    __decorate([
        (0, typeorm_1.BeforeInsert)(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], CoursePurchase.prototype, "generateUUID", null);
    CoursePurchase = __decorate([
        (0, typeorm_1.Entity)("coursePurchase"),
        __metadata("design:paramtypes", [Object])
    ], CoursePurchase);
    return CoursePurchase;
}());
//# sourceMappingURL=CoursePurchaseEntity.js.map