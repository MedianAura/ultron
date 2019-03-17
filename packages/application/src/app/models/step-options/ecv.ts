// import {Getter, Mutation} from 'vuex-class'
// import {Component, Inject, Prop, Vue} from 'vue-property-decorator'
// import moment from 'moment'
//
// @Component
// export default class Ecv extends Vue {
//     @Mutation('application/updateParams') updateParams: any
//     @Getter('application/getSteps') steps!: any
//     @Prop() sequence!: number
//     @Inject('$validator') $validator!: any;
//
//     archiveVersion: string = ''
//     archiveExpirationDate: string = moment().format('YYYY-MM-DD')
//
//     get title() {
//         return this.steps[this.sequence]['options']['title'] ? this.steps[this.sequence]['options']['title'] : 'ECV'
//     }
//
//     set title(value) {
//         this.steps[this.sequence]['options']['title'] = value
//     }
//
//     mounted() {
//         this.archiveVersion = this.steps[this.sequence]['options']['archiveVersion']
//     }
//
//     updateValues() {
//         let params = {
//             'index': this.sequence,
//             'options': {
//                 'title': this.title,
//                 'config': this.steps[this.sequence]['options']['config'],
//                 'expirationDate': this.archiveExpirationDate,
//                 'archiveVersion': this.archiveVersion
//             }
//         }
//         this.updateParams(params)
//     }
// }
