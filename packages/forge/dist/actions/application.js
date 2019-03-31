'use strict';
var Core = require('application').Core;
var actions = {
  'get-applications': function(req, res) {
    res.send({ applications: Core.applications });
  },
  'set-application': function(req, res) {},
  'set-recipe': function(req, res) {},
  'set-version': function(req, res) {},
};
module.exports = actions;
//# sourceMappingURL=application.js.map
