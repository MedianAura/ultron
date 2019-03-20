<template>
    <div class="cellule-info">
        <div class="row">
            <div class="col-md-12"><h5>{{title}}</h5></div>
        </div>
        <div class="form-row">
            <div class="form-group col-md-12">
                <span>Serveur: {{steps[sequence]['options']['ref']}}</span>
            </div>
        </div>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="commande">Commande(s):</label>
            <pre id="commande">{{steps[sequence]['options']['cmd'].join('\r\n')}}</pre>
          </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Getter } from 'vuex-class'
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class Ssh extends Vue {
  @Getter('application/getSteps') steps!: any
  @Prop() sequence!: number

  get title () {
    return this.steps[this.sequence]['options']['title'] ? this.steps[this.sequence]['options']['title'] : 'SSH'
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
