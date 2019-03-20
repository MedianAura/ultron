const fs = window.require('fs-extra')
const iconvlite = window.require('iconv-lite')
const async = window.require('async')

export function buildPath (path: string) {
  fs.ensureDirSync(path)
}

export function robocopy (sourceDir: String, destDir: String, fileMask: String, param: String[]) {
  param = (typeof param === 'undefined') ? [] : param

  let aFileMask = fileMask.split(',')
  async.each(aFileMask, function (mask: string, nextFile: any) {
    let aParam = [
      sourceDir,
      destDir,
      mask
    ]

    aParam = aParam.concat('/PURGE /E /R:2 /W:1 /MT:40 /NDL /NP /NJH /NJS'.split(' '))
    aParam = aParam.concat(param)
    console.log('robocopy',aParam.join(' '))

    let status = window.require('child_process').spawnSync('C:\\Windows\\System32\\robocopy.exe ', aParam, { windowsVerbatimArguments: true }).status

    if (status > 7) {
      nextFile('Erreur robocopy:'+status)
    } else {
      nextFile()
    }
  }, function (err: any) {
    if (err) {
      console.log('Error', err)
      return err
    } else {
      return null
    }
  })
}
