// const axios = require('axios')
//
// class HttpClientService {
//   SEND_DEFAULT_MAIL = 'https://email.vigilance.test/api/send-html-markdown'
//   GET_DEFAULT_MAIL = 'https://email.vigilance.test/api/get-html'
//
//   sendDefaultMail (data: any) {
//     let bodyFormData = new FormData()
//     bodyFormData.set('title', data.title)
//     bodyFormData.set('text', data.text.replace(/\r\n/gmi, '<br />').replace(/\r/gmi, '<br />').replace(/\n/gmi, '<br />'))
//     bodyFormData.set('to', data.to)
//     bodyFormData.set('subject', data.subject)
//     if (typeof data.from !== 'undefined' && data.from !== '') {
//       bodyFormData.set('from', data.from)
//     }
//     if (typeof data.markdown !== 'undefined' && data.markdown !== '') {
//       bodyFormData.set('markdown', data.markdown)
//     }
//
//     return axios({
//       method: 'post',
//       url: this.SEND_DEFAULT_MAIL,
//       data: bodyFormData,
//       config: { headers: { 'Content-Type': 'multipart/form-data' } }
//     })
//   }
//
//   getDefaultEmail (data: any) {
//     let bodyFormData = new FormData()
//     bodyFormData.set('title', data.title)
//     bodyFormData.set('text', data.text)
//     if (data.markdown !== '') {
//       bodyFormData.set('markdown', data.markdown)
//     }
//
//     axios({
//       method: 'post',
//       url: this.GET_DEFAULT_MAIL,
//       data: bodyFormData,
//       config: { headers: { 'Content-Type': 'multipart/form-data' } }
//     })
//       .then(function (response: any) {
//         // handle success
//         console.log(response.data)
//         return response
//       })
//       .catch(function (response: any) {
//         // handle error
//         console.log(response)
//         return response
//       })
//   }
// }
//
// export default new HttpClientService()
