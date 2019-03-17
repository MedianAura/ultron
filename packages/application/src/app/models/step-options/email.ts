// @Component
// export default class Email extends Vue {
//     @Mutation('application/updateParams') updateParams: any
//     @Getter('application/getSteps') steps!: any
//     @Prop() sequence!: number
//
//     additionalDest = ''
//
//     get title() {
//         return this.steps[this.sequence]['options']['title'] ? this.steps[this.sequence]['options']['title'] : 'eMail'
//     }
//
//     updateValues() {
//         let destinataires = this.steps[this.sequence]['options']['to']
//         if ((this.$refs.dstAddionnels as HTMLInputElement).value !== '') {
//             let response = ApplicationsService.validateAddresses((this.$refs.dstAddionnels as HTMLInputElement).value)
//             if (response.success) {
//                 destinataires += ',' + response.data
//                 this.additionalDest = ''
//             } else {
//                 // todo en cas d'erreur
//             }
//         }
//         let params = {
//             'index': this.sequence,
//             'options': {
//                 'template': this.steps[this.sequence]['options']['template'],
//                 'to': destinataires,
//                 'subject': this.steps[this.sequence]['options']['subject'],
//                 'title': this.steps[this.sequence]['options']['title'],
//                 'text': (this.$refs.mailText as HTMLInputElement).value,
//                 'markdown': (this.$refs.markdownText as HTMLInputElement).value
//             }
//         }
//         this.updateParams(params)
//     }
// }
