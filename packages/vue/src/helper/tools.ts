import { LogInterface } from '@/typings/logs'

let localRequire = require
let app: any

if (typeof window !== 'undefined' && typeof window.require !== 'undefined') {
  localRequire = window.require
  app = localRequire('electron').remote.app
} else {
  app = localRequire('electron').app
}

const fs = localRequire('fs')
const path = localRequire('path')

export function updateFileExists () {
  let relativePath = (process.env.NODE_ENV === 'production') ? '../../../../' : '.'
  return fs.existsSync(path.resolve(app.getAppPath(), relativePath, 'update.ready'))
}

export function updateInterval () {
  const Noty = require('noty')
  const repeat = setInterval(() => {
    if (updateFileExists()) {
      clearInterval(repeat)
      new Noty({
        text: 'Une mise à jour doit-être installé. L\'application se fermera dans 60 sec.',
        theme: 'bootstrap-v3',
        layout: 'top',
        type: 'warning',
        timeout: 300000
      }).show()
      setTimeout(() => {
        app.quit()
      }, 61000)
    }
  }, 3000)
}

export function mainConfigFile (appPath: string, dev: boolean) {
  if (dev) {
    return path.resolve(appPath, '..\\config\\main_ultron.json')
  } else {
    return path.resolve('.\\config\\main_ultron.json')
  }
}

export function cleanLogRecipe (recipe: LogInterface) {
  let obj = JSON.parse(JSON.stringify(recipe))

  obj.recipe.steps.map((value: any) => {
    if (value.options.connection) {
      value.options.connection.password = ''
      value.options.connection.userName = ''
    }
    return value
  })

  return obj
}

// Regular expression to separate the digit string from the non-digit strings.
const reParts = /\d+|\D+/g

// Regular expression to test if the string has a digit.
const reDigit = /\d/

// Add cmpStringsWithNumbers to the global namespace.  This function takes to
// strings and compares them, returning -1 if `a` comes before `b`, 0 if `a`
// and `b` are equal, and 1 if `a` comes after `b`.
export function cmpStringsWithNumbers (a: any, b: any) {
  // Get rid of casing issues.
  a = a.toUpperCase()
  b = b.toUpperCase()

  // Separates the strings into substrings that have only digits and those
  // that have no digits.
  const aParts = a.match(reParts)
  const bParts = b.match(reParts)

  // Used to determine if aPart and bPart are digits.
  let isDigitPart

  // If `a` and `b` are strings with substring parts that match...
  if (aParts && bParts && (isDigitPart = reDigit.test(aParts[0])) === reDigit.test(bParts[0])) {
    // Loop through each substring part to compare the overall strings.
    const len = Math.min(aParts.length, bParts.length)
    for (let i = 0; i < len; i++) {
      let aPart = aParts[i]
      let bPart = bParts[i]

      // If comparing digits, convert them to numbers (assuming base 10).
      if (isDigitPart) {
        aPart = parseInt(aPart, 10)
        bPart = parseInt(bPart, 10)
      }

      // If the substrings aren't equal, return either -1 or 1.
      if (aPart !== bPart) {
        return aPart > bPart ? -1 : 1
      }

      // Toggle the value of isDigitPart since the parts will alternate.
      isDigitPart = !isDigitPart
    }
  }

  // Use normal comparison.
  return a - b
}
