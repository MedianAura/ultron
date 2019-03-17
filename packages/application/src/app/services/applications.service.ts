// import * as _ from 'lodash'
// import { ApplicationModel } from '@/models/application.model'
// import { ExtraConfigsModel } from '@/models/extraConfigurations.model'
// import { ListeApps, ResponseType } from '@/typings/applications'
// import { Step } from '@/typings/actions'
//
// const remote = window.require('electron').remote
// const fs = window.require('fs')
//
// class ApplicationsService {
//   listeApplications: ListeApps[] = []
//   appConfiguration: ApplicationModel[] = []
//   versionRecipe: Step[] = []
//
//   objectPath: string[] = []
//   finalJsonData: string = ''
//
//   oGlobalConfig: any
//
//   constructor () {
//     this.listeApplications = []
//     this.appConfiguration = []
//
//     let recipesFolder = remote.getGlobal('dataPath')
//
//     let files = fs.readdirSync(recipesFolder)
//
//     files.forEach((file: string, index: number) => {
//       this.finalJsonData = fs.readFileSync(recipesFolder + file, 'utf8')
//       let oData = JSON.parse(this.finalJsonData)
//
//       if (!(typeof oData.name !== 'undefined' && oData.name !== '')) {
//         return
//       }
//
//       this.listeApplications.push({
//         name: oData.name,
//         type: oData.type,
//         version: ''
//       })
//
//       if (typeof oData.config !== 'undefined') {
//         this.reUsables(oData.config)
//       }
//
//       this.finalJsonData = _.replace(this.finalJsonData, new RegExp('%name%', 'g'), oData.name)
//       this.oGlobalConfig = JSON.parse(this.finalJsonData)
//
//       this.replaceExtra()
//       this.appConfiguration.push(new ApplicationModel(this.oGlobalConfig))
//     })
//   }
//
//   public setActions (idx: number, version: string) {
//     this.versionRecipe = _.get(this.appConfiguration, [idx, 'versions', version, 'steps'], null)
//   }
//
//   public getConfigFiles (): ApplicationModel[] {
//     return this.appConfiguration
//   }
//
//   public getFilesList (): ListeApps[] {
//     return this.listeApplications
//   }
//
//   reUsables (obj: any) {
//     var k
//     if (obj instanceof Object && !(obj instanceof Array)) {
//       for (k in obj) {
//         if (obj.hasOwnProperty(k)) {
//           // recursive call to scan property
//           if (this.objectPath.length === 0) {
//             this.objectPath.push('config')
//           }
//           this.objectPath.push(k)
//           let cle = '"' + this.objectPath.join('.') + '"'
//           let valeur = JSON.stringify(obj[k])
//           this.finalJsonData = _.replace(this.finalJsonData, new RegExp(cle, 'g'), valeur)
//           this.reUsables(obj[k])
//         }
//       }
//     } else {
//       this.objectPath.pop()
//
//       return
//     }
//     this.objectPath.pop()
//   }
//
//   public validateAddresses (addresses: string): ResponseType {
//     let aRetour = []
//     let allValid = true
//     addresses = addresses.replace('/;+/g', ',')
//     let aEmails = addresses.split(',')
//     for (let i=0; i<aEmails.length; i++) {
//       let eMail = aEmails[i].trim()
//       if (this.validEmail(eMail)) {
//         aRetour.push(eMail)
//       } else {
//         allValid = false
//       }
//     }
//
//     let reponse = {
//       success: allValid,
//       data: aRetour.length>0 ? aRetour.join(',') : ''
//     }
//
//     return reponse
//   }
//
//   private validEmail (email: string) {
//     var re = /^(([^<>()[]\\.,;:\s@"]+(\.[^<>()[]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
//
//     return re.test(String(email).toLowerCase())
//   }
//
//   public stringifyParams (obj: any): string {
//     let reponse = ''
//     let aKeys = Object.keys(obj)
//
//     for (let i=0; i<aKeys.length; i++) {
//       if (typeof obj[aKeys[i]] === 'string') {
//         reponse += aKeys[i] + ': ' + obj[aKeys[i]] + ' <br/> '
//
//         continue
//       }
//       if (typeof obj[aKeys[i]] === 'object') {
//         let aKeys2 = Object.keys(obj[aKeys[i]])
//         for (let j=0; j<aKeys2.length; j++) { reponse += aKeys[i] + '.' + aKeys2[j] + ': ' + obj[aKeys[i]][aKeys2[j]] + ' <br/> ' }
//
//         continue
//       }
//     }
//
//     return reponse.replace(/password:[\S\s]*<br/gi, 'password: ---- <br')
//   }
//
//   private replaceExtra () {
//     let extraConfigs = new ExtraConfigsModel()
//
//     this.oGlobalConfig.versions.forEach((version: any) => {
//       version.steps.forEach((step: any) => {
//         if (step.type === 'ftp' || step.type === 'ssh') {
//           this.insertConnection(step.options, extraConfigs)
//
//           return
//         }
//         if (step.type === 'ecv') {
//           this.replaceEcv(step, extraConfigs)
//         }
//       })
//     })
//   }
//
//   private replaceEcv (step: any, extraConfigs: any) {
//     let expirationDate = new Date()
//     expirationDate.setDate(expirationDate.getDate() + 180)
//
//     step.options['expirationDate'] = expirationDate.toISOString().split('T')[0]
//     step.options['archiveVersion'] = ''
//   }
//
//   private insertConnection (options: any, extraConfigs: any) {
//     let connection = extraConfigs.get('connection')
//
//     let config = options.ref
//     if (typeof connection[config] === 'undefined') {
//       console.log('Information de connection non trouvé dans connection.json: ', config)
//       return
//     }
//
//     options['connection'] = {}
//     options['connection'] = connection[config]
//   }
// }
//
// export default new ApplicationsService()
