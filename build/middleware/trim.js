"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (req, res, next) {
    var exception = 'password';
    Object.keys(req.body).forEach(function (key) {
        if (!exception.includes(key) && typeof req.body[key] === 'string') {
            req.body[key] = req.body[key].trim();
        }
    });
    next();
});
//# sourceMappingURL=trim.js.map