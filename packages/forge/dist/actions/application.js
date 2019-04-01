"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var application_1 = require("@ultron/application");
exports.actions = {
    'get-applications': function (req, res) {
        res.send({ applications: application_1.Core.getApplications() });
    },
    'set-application': function (req, res) {
    },
    'set-recipe': function (req, res) {
    },
    'set-version': function (req, res) {
    },
};
//# sourceMappingURL=application.js.map