"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var User = /** @class */ (function () {
    function User(id, lname, fname, email, confirmed, admin, tasks) {
        this.id = id;
        this.lname = lname;
        this.fname = fname;
        this.email = email;
        this.confirmed = confirmed;
        this.admin = admin;
        this.tasks = tasks;
    }
    return User;
}());
exports.User = User;
