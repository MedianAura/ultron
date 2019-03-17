// import { waterfall } from 'async'
// import store from '../store'
//
// class SequencesService {
//   public sequence (listActions: any) {
//     waterfall(listActions, function (err: any, result: any) {
//       // result now equals 'done'
//       console.log(err, result)
//
//       let actionProgress = store.state.application.actionsProgress.getValue()
//       actionProgress.actionCompleted = true
//       store.state.application.actionsProgress.next(actionProgress)
//     })
//   }
// }
//
// export default new SequencesService()
