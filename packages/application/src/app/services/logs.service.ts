// import store from '../store'
// import { Logs } from '@/typings/logs'
//
// const remote = window.require('electron').remote
//
// export class LogsService {
//   static FilePath: string = remote.getGlobal('appPath') + 'logs.yaml'
//   static watcher: any = null
//
//   static load (): Logs {
//     const YAML = window.require('js-yaml')
//     const fs = window.require('fs')
//     return YAML.safeLoad(fs.readFileSync(LogsService.FilePath))
//   }
//
//   static save (logs: Logs): void {
//     const YAML = window.require('js-yaml')
//     const fs = window.require('fs')
//
//     fs.writeFileSync(LogsService.FilePath, YAML.safeDump(logs))
//   }
//
//   static watch (): void {
//     if (LogsService.watcher !== null) {
//       LogsService.watcher.close()
//     }
//
//     const chokidar = window.require('chokidar')
//     LogsService.watcher = chokidar.watch(LogsService.FilePath, {
//       persistent: true,
//       ignored: '*.txt',
//       ignoreInitial: false,
//       interval: 100
//     })
//
//     console.log('watcher', LogsService.FilePath)
//     LogsService.watcher.on('all', () => store.dispatch('Logging/loadData'))
//   }
// }
