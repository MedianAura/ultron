<template>
  <div class="cellule-info">
    <h5>{{title}}</h5>
    <div class="form-row">
      <table class="table">
        <tr>
          <td>Titre:</td>
          <td> {{steps[sequence]['options']['template']['title']}}</td>
        </tr>
        <tr>
          <td>Sujet:</td>
          <td>{{steps[sequence]['options']['subject']}}</td>
        </tr>
        <tr>
          <td>Destinataires:</td>
          <td>

            <input readonly :value="steps[sequence]['options']['to']" type="email" class="form-control" id="dst"
                   v-on:change="updateValues">
            <div class="input-group mb-3">
              <input :value="additionalDest" ref="dstAddionnels" type="email" class="form-control" id="dst-add"
                     placeholder="Destinataires additionnels" aria-label="Recipient's username"
                     aria-describedby="basic-addon2">
              <div class="input-group-append">
                <button @click="updateValues()" class="btn btn-primary" type="button">Ajouter</button>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td>Message:</td>
          <td><textarea :value="steps[sequence]['options']['text']" ref="mailText" class="form-control" id="mes"
                        rows="5" v-on:change="updateValues"></textarea></td>
        </tr>
        <tr>
          <td>Markdown:</td>
          <td><textarea :value="steps[sequence]['options']['markdown']" ref="markdownText" class="form-control"
                        id="markdown" rows="5" v-on:change="updateValues"></textarea></td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
  import {Component, Vue, Prop} from 'vue-property-decorator';

  @Component
  export default class Email extends Vue {
    @Prop() sequence!: number;

    additionalDest = '';

    get title() {
      return ''
    }

    updateValues() {
      // let destinataires = this.steps[this.sequence]['options']['to'];
      // if ((this.$refs.dstAddionnels as HTMLInputElement).value !== '') {
      //   let response = ApplicationsService.validateAddresses((this.$refs.dstAddionnels as HTMLInputElement).value);
      //   if (response.success) {
      //     destinataires += ',' + response.data;
      //     this.additionalDest = '';
      //   } else {
      //     // todo en cas d'erreur
      //   }
      // }
      // let params = {
      //   'index': this.sequence,
      //   'options': {
      //     'template': this.steps[this.sequence]['options']['template'],
      //     'to': destinataires,
      //     'subject': this.steps[this.sequence]['options']['subject'],
      //     'title': this.steps[this.sequence]['options']['title'],
      //     'text': (this.$refs.mailText as HTMLInputElement).value,
      //     'markdown': (this.$refs.markdownText as HTMLInputElement).value
      //   }
      // };
      // this.updateParams(params);
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="css">
  .cellule-info {
    border: solid 1px grey;
    margin: 5px;
    padding: 6px;
    border-radius: 3px;
  }
</style>
