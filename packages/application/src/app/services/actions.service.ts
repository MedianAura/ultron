// import store from '../store'
// import HttpClientService from '../services/httpClient.service'
// import { ApplicationModel } from '@/models/application.model'
// import ApplicationsService from '../services/applications.service'
// import { sprintf } from 'sprintf-js'
// import { CodecParams, VersionsType } from '@/typings/actions'
//
// const async = window.require('async')
// const Client = window.require('ssh2-sftp-client')
// const path = window.require('path')
// const SSH2Shell = window.require('ssh2shell')
// const fs_jetpack = window.require('fs-jetpack')
// const spawnSync = window.require('child_process').spawnSync
// const fs = window.require('fs-extra')
// const fso = require('../helper/fso')
// const glob = window.require('glob')
// const iconvlite = window.require('iconv-lite')
// const _ = window.require('lodash')
//
// export class ActionsService {
//   static gitClone (application: ApplicationModel, version: VersionsType, config: any, next: any): void {
//     console.log('gitClone', config)
//
//     store.commit('application/updateProgress', {
//       actionName: 'gitClone',
//       actionParams: ''
//     })
//
//     application.gitWorkInstance.clone(
//       config.repositoryUrl,
//       config.cwd,
//       ['--branch=' + config.branch]
//     ).then(() => next(null)).catch((e: any) => next(e))
//   }
//
//   static gitRebase (application: ApplicationModel, version: VersionsType, config: any, next: any): void {
//     console.log('gitRebase', config)
//
//     store.commit('application/updateProgress', {
//       actionName: 'gitRebase',
//       actionParams: ''
//     })
//
//     application.gitWorkInstance.cwd(
//       version.workPath
//     )
//       .then(application.gitWorkInstance.fetch(
//         ['--all']
//       ))
//       .then(application.gitWorkInstance.checkout(
//         ['-b', config.branch, config.remote + '/' + config.branch]
//       ))
//       .then(application.gitWorkInstance.rebase(
//         { '--onto': config.selectedTag }
//       ))
//       .then(application.gitWorkInstance.push(
//         config.remote,
//         config.branch,
//         { '--force': null }
//       ))
//       .then(() => next(null))
//       .catch((e: any) => next(e))
//   }
//
//   static commands (application: ApplicationModel, version: VersionsType, config: any, next: any): void {
//     console.log('commands', config)
//
//     store.commit('application/updateProgress', {
//       actionName: 'commands',
//       actionParams: ''
//     })
//
//     setTimeout(() => {
//       new Promise((resolve: any, reject: any) => {
//         let status: number = -1
//
//         fs.writeFileSync(application.workRootPath + 'commands.bat', config.cmd.join('\r\n'))
//         status = spawnSync(application.workRootPath + 'commands.bat', { windowsHide: true }).status
//         fs.unlinkSync(application.workRootPath + 'commands.bat')
//
//         console.log('commands status:', status)
//
//         if (status !== 0) {
//           reject(new Error('Erreur commands'))
//         } else {
//           resolve(null)
//         }
//       }).then(() => next(null)).catch((e: any) => next(e))
//     }, 100)
//   }
//
//   static gitClean (application: ApplicationModel, version: VersionsType, config: any, next: any): void {
//     console.log('gitClean', config)
//
//     store.commit('application/updateProgress', {
//       actionName: 'gitClean',
//       actionParams: ''
//     })
//
//     setTimeout(() => {
//       new Promise((resolve: any, reject: any) => {
//         const fs = window.require('fs-extra')
//
//         config.file.forEach((file: any) => {
//           console.info('Remove : ' + version.workPath + file)
//           fs.removeSync(version.workPath + file)
//         })
//
//         config.folder.forEach((folder: any) => {
//           console.info('Remove : ' + version.workPath + folder)
//           fs.removeSync(version.workPath + folder)
//         })
//
//         resolve(null)
//       }).then(() => next(null)).catch((e: any) => next(e))
//     }, 100)
//   }
//
//   static convert (application: ApplicationModel, version: VersionsType, config: any, next: any): void {
//     console.log('Conversion de fichiers', config)
//
//     store.commit('application/updateProgress', {
//       actionName: 'convert',
//       actionParams: ''
//     })
//
//     setTimeout(() => {
//       new Promise((resolve: any, reject: any) => {
//         let codecConverter_path = 'M:\\_Programmes\\outils\\'
//
//         let status: number = -1
//         async.each(config.codec, function (codec: CodecParams, nextCodec: any) {
//           status = spawnSync(
//             codecConverter_path + 'codec_converter.exe',
//             [' -i ' + codec.__inputPath,
//               ' -m ' + codec.inputMask.join(' '),
//               ' -o ' + codec.__outputPath,
//               ' --codec-in ' + codec.codecIn,
//               ' --codec-out ' + codec.codecOut],
//             { windowsHide: true, windowsVerbatimArguments: true }
//           ).status
//
//           if (status !== 0) {
//             nextCodec('Erreur convert')
//           } else {
//             nextCodec()
//           }
//         }, function (err: any) {
//           if (err) {
//             console.log(err)
//             reject(err)
//           } else {
//             resolve(null)
//           }
//         })
//       }).then(() => next(null)).catch((e: any) => next(e))
//     }, 100)
//   }
//
//   static ftp (application: ApplicationModel, version: VersionsType, config: any, next: any): void {
//     console.log('Ftp', config)
//
//     store.commit('application/updateProgress', {
//       actionName: 'FTP',
//       actionParams: ''
//     })
//     setTimeout(() => {
//       new Promise((resolve: any, reject: any) => {
//         let sftp = new Client()
//
//         let zipdir = path.resolve(config.ftp.from) // application.path + '\\zip\\'
//         let from = zipdir + '\\' + config.ftp.file
//         let to = config.ftp.to + '/' + config.ftp.file
//
//         sftp.connect({
//           host: config.connection.host,
//           port: config.connection.port,
//           username: config.connection.userName,
//           password: config.connection.password
//         }).then(function () {
//           return sftp.put(from, to, null, null)
//         }).then(function (data: any) {
//           console.log(sprintf("Fichier copié de '%s' à '%s'.", from, to))
//           resolve(null)
//         }).catch(function (err: any) {
//           console.log('Erreur de copie ftp: ', err)
//           reject(err)
//         })
//       }).then(() => next(null)).catch((e: any) => next(e))
//     }, 100)
//   }
//
//   static ssh (application: ApplicationModel, version: VersionsType, config: any, next: any): void {
//     console.log('Ssh', config)
//
//     let obj = {
//       actionName: 'Commandes ssh',
//       actionParams: ''
//     }
//     store.commit('application/updateProgress', obj)
//
//     // TODO:On peut surement faire mieux.
//     // On ajout clear à la car si la dernière commande plante même si on appel error avec close il passe pareil dans onEnd
//
//     let sshCmd = _.reduce(config.cmd, (result: string[], value: string) => {
//       result.push(value)
//       result.push('echo $?')
//       return result
//     }, [])
//
//     sshCmd.unshift('clear')
//
//     let SSH = new SSH2Shell({
//       server: {
//         host: config.connection.host,
//         port: config.connection.port,
//         userName: config.connection.userName,
//         password: config.connection.password
//       },
//       commands: sshCmd,
//       idleTimeOut: 300000,
//       onCommandComplete: function (command: any, response: any, sshObj: any) {
//         console.log('command:', command)
//         console.log('response:', response)
//         if (command.indexOf('$?') > -1) {
//           // TODO:On peut surement faire mieux.
//           if (response.split('\r\n')[1].trim() !== '0') {
//             this.emit('error', 'Error: ' + response, '', true, next('Error'))
//           }
//         }
//       },
//       onEnd: function (sessionText: any, sshObj: any) {
//         console.log('onEnd', sessionText)
//         next(null)
//       }
//     })
//
//     SSH.connect()
//   }
//
//   static copy (application: ApplicationModel, version: VersionsType, config: any, next: any): void {
//     console.log('Copier', config)
//
//     let obj = {
//       actionName: 'Copie des fichiers',
//       actionParams: config.title
//     }
//
//     store.commit('application/updateProgress', obj)
//
//     setTimeout(() => {
//       new Promise((resolve: any, reject: any) => {
//         let status: number = -1
//
//         let extra = []
//         if (config.excludeFolder.source.length > 0 || config.excludeFolder.dest.length > 0) {
//           extra.push('/XD')
//           if (config.excludeFolder.source.length > 0) extra.push(config.excludeFolder.source.join(' '))
//           if (config.excludeFolder.dest.length > 0) extra.push(config.excludeFolder.dest.join(' '))
//         }
//
//         if (config.excludeFile.source.length > 0 || config.excludeFile.dest.length > 0) {
//           extra.push('/XF')
//           if (config.excludeFile.source.length > 0) extra.push(config.excludeFile.source.join(' '))
//           if (config.excludeFile.dest.length > 0) extra.push(config.excludeFile.dest.join(' '))
//         }
//
//         let sourceFolder = config.from
//         let destinationFolder = config.to
//         let fileMask = config.mask
//
//         status = fso.robocopy(sourceFolder, destinationFolder, fileMask, extra)
//         if (status == null) {
//           resolve(status)
//         } else {
//           reject(status)
//         }
//       }).then(() => next(null)).catch((e: any) => next(e))
//     }, 100)
//   }
//
//   static ecv (application: ApplicationModel, version: VersionsType, config: any, next: any): void {
//     console.log('Générer fichier ecv', config)
//     let obj = {
//       actionName: 'Génère fichier ecv',
//       actionParams: 'Configuration: ' + config.config
//     }
//     store.commit('application/updateProgress', obj)
//
//     setTimeout(() => {
//       new Promise((resolve: any, reject: any) => {
//         // Création du fichier de config
//         let configpath = path.resolve('c:/bidon/ultron/ecv/' + version.customName + '.ecvconf')
//         fs_jetpack.write(configpath, config.config.join('\r\n').replace('%archiveVersion%', config.archiveVersion).replace('%expirationDate%', config.expirationDate))
//
//         let sGenerator = 'M:\\_Programmes\\Outils\\ecv_generator64.exe'
//
//         let status: number = -1
//         status = spawnSync(sGenerator, [configpath], { windowsHide: true, windowsVerbatimArguments: true }).status
//
//         if (status !== 0) {
//           reject(new Error('Erreur ecv_generator'))
//         } else {
//           resolve(null)
//         }
//       }).then(() => next(null)).catch((e: any) => next(e))
//     }, 100)
//   }
//
//   static zip (application: ApplicationModel, version: VersionsType, config: any, next: any): void {
//     console.log(config.type, config)
//
//     let sActionName = config.title ? config.title : (config.type === 'compress' ? 'Compression de fichier (zip)' : 'Extraction de fichier (zip)')
//     let obj = {
//       actionName: sActionName,
//       actionParams: ''
//     }
//     store.commit('application/updateProgress', obj)
//
//     setTimeout(() => {
//       new Promise((resolve: any, reject: any) => {
//         let from = path.resolve(config.from) + '\\'
//         let to = path.resolve(config.to) + '\\'
//         let mask = config.mask
//         let fileName = config.fileName
//
//         let aParams = []
//
//         switch (config.type) {
//           case 'compress':
//             aParams.push('a -ibck')
//             aParams = aParams.concat(config.params)
//             aParams.push(to+fileName)
//             aParams = aParams.concat(mask.map((value: string) => {
//               value = from + value
//               return value
//             }))
//             break
//           case 'extract':
//             aParams.push('x -ibck')
//             aParams = aParams.concat(config.params)
//             aParams.push(from+fileName)
//             aParams = aParams.concat(mask)
//             aParams.push(to)
//             break
//           default:
//             next("Type d'extraction non défini : " + config.type)
//             return
//         }
//
//         console.log(aParams)
//         let status: number = -1
//         status = spawnSync('winrar', aParams, { windowsHide: true, windowsVerbatimArguments: true }).status
//
//         if (status !== 0) {
//           reject(new Error('Erreur zip'))
//         } else {
//           resolve(null)
//         }
//       }).then(() => next(null)).catch((e: any) => next(e))
//     }, 100)
//   }
//
//   static email (application: ApplicationModel, version: VersionsType, config: any, next: any): void {
//     console.log('Courriel', config)
//     let obj = {
//       actionName: 'Envoie de courriel',
//       actionParams: config.title
//     }
//     store.commit('application/updateProgress', obj)
//
//     HttpClientService.sendDefaultMail(config).then(function (response: any) {
//       // handle success
//       console.log(response)
//       next(null)
//     })
//       .catch(function (response: any) {
//         // handle error
//         console.log(response)
//         next('Erreur courriel')
//       })
//   }
//
//   static findReplace (application: ApplicationModel, version: VersionsType, config: any, next: any): void {
//     console.log('Recherche et remplacement', config)
//
//     store.commit('application/updateProgress', {
//       actionName: 'findReplace',
//       actionParams: ''
//     })
//
//     setTimeout(() => {
//       new Promise((resolve: any, reject: any) => {
//         let inputPath = path.resolve(config.inputPath) + '\\'
//         let outputPath = path.resolve(config.outputPath) + '\\'
//
//         fso.buildPath(outputPath)
//
//         let files = fs.readdirSync(inputPath)
//
//         _.filter(files, (file: string) => {
//           let maskMatch = false
//
//           _.each(config.mask, (value: string) => {
//             let reg = new RegExp(value)
//             if (reg.test(file)) { maskMatch = true }
//           })
//           return maskMatch
//         })
//
//         async.each(files, function (file: string, nextFile: any) {
//           let content = fs.readFileSync(inputPath + file, config.codec)
//
//           let reg = new RegExp(config.find.pattern, config.find.flags)
//
//           content = content.replace(new RegExp(config.find.pattern, config.find.flags), config.replace)
//
//           fs.writeFileSync(outputPath + file, content, { encoding: config.codec })
//
//           nextFile()
//         }, function (err: any) {
//           if (err) {
//             console.log(err)
//             reject(err)
//           } else {
//             resolve(null)
//           }
//         })
//       }).then(() => next(null)).catch((e: any) => next(e))
//     }, 100)
//   }
//
//   static minify (application: ApplicationModel, version: VersionsType, config: any, next: any): void {
//     console.log('Minifier', config)
//     let obj = {
//       actionName: 'Compression de fichier (zip)',
//       actionParams: config.title
//     }
//     store.commit('application/updateProgress', obj)
//
//     new Promise((resolve) => {
//       setTimeout(() => {
//         let oRxvVersion: any
//         let sPathname = path.resolve(version.workPath)
//         let sRxvVersion = path.resolve(version.workPath, 'rxv_version.js')
//
//         let aFilesConfig = glob.sync(sPathname + '\\**\\*-main.js')
//         _.each(aFilesConfig, function (sFile: string) {
//           let sContent = iconvlite.decode(fs.readFileSync(sFile), 'win1252')
//           let buildHash = fs.readFileSync(sRxvVersion, { 'encoding': 'utf8' })
//
//           buildHash = buildHash.match(/build_hash[\s]*:[\s]*"[a-z0-9]+/gi)
//           buildHash = buildHash[0].match(/"[a-z0-9]+/gi)
//           buildHash = buildHash[0].replace(/"/gi, '')
//
//           sContent = sContent.replace(/"bust=.*/, '"bust=' + buildHash + '"')
//           fs.writeFileSync(sFile, iconvlite.encode(sContent, 'win1252'))
//         })
//
//         let currentDrive = version.workPath.split('\\')[0]
//         let validDrive = 'S:'
//         if (currentDrive.toUpperCase() === 'U:') {
//           validDrive = 'V:'
//         }
//
//         let sPathConfigRxvNew = path.resolve(currentDrive, './RxvNew', 'RxVigilance/Config')
//         let sPathConfigRxvCourant = path.resolve(validDrive, './RxvCourant', 'RxVigilance/Config')
//
//         if (fs.existsSync(sPathConfigRxvNew)) {
//           fso.robocopy(sPathConfigRxvNew, path.resolve(version.workPath, '../Config'), '*.*')
//         } else if (fs.existsSync(sPathConfigRxvCourant)) {
//           fso.robocopy(sPathConfigRxvCourant, path.resolve(version.workPath, '../Config'), '*.*')
//         }
//
//         async.waterfall([
//           function (next: any) {
//             let sPathMinificator = path.resolve('M:\\_Programmes\\Utilitaires\\ModuleMinificator\\dist\\minificator.exe')
//             next(null, sPathMinificator)
//           },
//           function (sPathMinificator: string, next: any) {
//             let oResult = spawnSync(sPathMinificator, ['-a', '--module', version.workPath], { windowsHide: true })
//             next(null, oResult)
//           },
//           function (oResult: any, next: any) {
//             fs.emptyDirSync(path.resolve(version.workPath, '../Config'))
//             next(null, oResult)
//           },
//           function (oResult: any, next: any) {
//             fs.deleteDirSync(path.resolve(version.workPath, '../Config'))
//             next(null, oResult)
//           }
//         ], function (err: any, oResult: any) {
//           if (oResult.stdout.length > 0) {
//             console.log('Minifier. (Résultat): ', oResult.stdout.toString())
//           }
//           if (oResult.stderr.length > 0) {
//             console.log('Minifier. (Erreur): ', oResult.stderr.toString())
//           }
//           if (err) {
//             console.log('Minifier. (Erreur): ', err)
//           }
//         })
//
//         resolve()
//       }, 300)
//     }).then(() => next(null))
//   }
//
//   static boilerplate (application: ApplicationModel, version: VersionsType, config: any, next: any): void {
//     console.log('__ACTION USAGE__', config)
//     let obj = {
//       actionName: '__ACTION NAME__',
//       actionParams: ApplicationsService.stringifyParams(config)
//     }
//     store.commit('application/updateProgress', obj)
//
//     new Promise((resolve) => {
//       setTimeout(() => {
//         // __ACTION__
//
//         resolve()
//       }, 300)
//     }).then(() => next(null))
//   }
// }
//
// export default new ActionsService()
