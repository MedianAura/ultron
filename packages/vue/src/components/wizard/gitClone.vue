<template>
    <div class="cellule-info">
        <div class="row">
            <div class="col-md-12"><h5>{{title}}</h5></div>
        </div>
        <div class="form-row">
            <div class="form-group col-md-12">
              <label>Repositoy: {{steps[sequence]['options']['repositoryUrl']}}</label>
            </div>

          <div class="form-group col-md-12" v-if="steps[sequence]['options']['repoDev'] != ''">
            <label>Repositoy Dev: {{steps[sequence]['options']['repoDev']}}</label>
          </div>

          <div class="form-group col-md-12" v-if="steps[sequence]['options']['branch'] != ''">
            <label>Branch: {{steps[sequence]['options']['branch']}}</label>
          </div>

          <div class="form-group col-md-12" v-if="steps[sequence]['options']['cwd'] != ''">
            <label>CWD: {{steps[sequence]['options']['cwd']}}</label>
          </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Getter } from 'vuex-class'
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class gitClone extends Vue {
  @Getter('application/getSteps') steps!: any
  @Prop() sequence!: number

  get title () {
    return this.steps[this.sequence]['options']['title'] ? this.steps[this.sequence]['options']['title'] : 'Git clone'
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
