<template>
  <div class="cellule-info">
    <div class="row">
      <div class="col-md-12"><h5>{{ title }}</h5></div>
    </div>
    <div class="form-row">
      <div class="form-group col-md-12">
        <div class="form-group col-md-6">
          <label for="archiveExpirationDate">Date d'expiration:</label>
          <input id="archiveExpirationDate" v-validate="{ required: true, regex: /^((19\d{2})|(20\d{2}))-(((02)-(0[1-9]|[1-2][0-9]))|(((0(1|[3-9]))|(1[0-2]))-(0[1-9]|[1-2][0-9]|30))|((01|03|05|07|08|10|12)-(31)))$/ }" v-model="archiveExpirationDate"  name="archiveExpirationDate"  v-on:change="updateValues" type="text" class="form-control">
          <span class="alert-danger">{{ errors.first('wizard.archiveExpirationDate') }}</span>
        </div>
        <div class="form-group col-md-6">
          <label for="archiveVersion">Version de l'archive:</label>
          <input  v-validate="{ required: true, regex: /^[0-9]+.[0-9]+.[0-9]+.[0-9]+$/ }" id="archiveVersion" name="archiveVersion" v-model="archiveVersion" v-on:change="updateValues" type="text" class="form-control">
          <span class="alert-danger">{{ errors.first('wizard.archiveVersion') }}</span>
      </div>
      </div>
      <div class="form-group col-md-12">
        <label for="fichierCofing">Contenu du fichier de configuration:</label>
        <pre id="fichierCofing">{{steps[sequence]['options']['config'].join('\r\n')}}</pre>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Getter, Mutation } from 'vuex-class'
import { Component, Vue, Prop, Inject } from 'vue-property-decorator'
import moment from 'moment'

@Component
export default class Ecv extends Vue {
    @Mutation('application/updateParams') updateParams:any
    @Getter('application/getSteps') steps!: any
    @Prop() sequence!: number
    @Inject('$validator') $validator!: any;

    archiveVersion: string = ''
    archiveExpirationDate: string = moment().format('YYYY-MM-DD')

    get title () {
      return this.steps[this.sequence]['options']['title'] ? this.steps[this.sequence]['options']['title'] : 'ECV'
    }

    set title (value) {
      this.steps[this.sequence]['options']['title'] = value
    }

    mounted () {
      this.archiveVersion = this.steps[this.sequence]['options']['archiveVersion']
    }

    updateValues () {
      let params = {
        'index': this.sequence,
        'options': {
          'title': this.title,
          'config': this.steps[this.sequence]['options']['config'],
          'expirationDate': this.archiveExpirationDate,
          'archiveVersion': this.archiveVersion
        }
      }
      this.updateParams(params)
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
