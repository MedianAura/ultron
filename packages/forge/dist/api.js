'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var tslib_1 = require('tslib');
var eiphop_1 = require('eiphop');
var electron_1 = tslib_1.__importDefault(require('electron'));
var application_1 = require('./actions/application');
eiphop_1.setupMainHandler(electron_1.default, tslib_1.__assign({}, application_1.actions), true);
//# sourceMappingURL=api.js.map
