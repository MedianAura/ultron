const { Core } = require('application')

const actions = {
  'get-applications': (req, res) => {
    res.send({ applications: Core.applications })
  },
  'set-application': (req, res) => {
    // res.send({ applications: Core.applications })
  },
  'set-recipe': (req, res) => {
    // res.send({ applications: Core.applications })
  },
  'set-version': (req, res) => {
    // res.send({ applications: Core.applications })
  }
}

module.exports = actions
