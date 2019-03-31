const electron = require('electron')
const { setupMainHandler } = require('eiphop')

const applicationAction = require('./actions/application')

setupMainHandler(electron, { ...applicationAction }, true)
