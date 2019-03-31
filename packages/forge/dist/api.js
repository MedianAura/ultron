'use strict';
var __assign =
  (this && this.__assign) ||
  function() {
    __assign =
      Object.assign ||
      function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
var electron = require('electron');
var setupMainHandler = require('eiphop').setupMainHandler;
var applicationAction = require('./actions/application');
setupMainHandler(electron, __assign({}, applicationAction), true);
//# sourceMappingURL=api.js.map
