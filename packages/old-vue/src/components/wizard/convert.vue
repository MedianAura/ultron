<template>
  <div class="cellule-info">
    <h5>{{ title }}</h5>
    <div v-for="(convert, index) in listAction" :key="index" class="form-row">
      <div class="form-group col-md-12">
        <label>{{ index }}</label>
        <table class="table">
          <tr>
            <td>codec-in:</td>
            <td>{{ convert['codecIn'] }}</td>
          </tr>
          <tr>
            <td>codec-out:</td>
            <td>{{ convert['codecOut'] }}</td>
          </tr>
          <tr>
            <td>input-path:</td>
            <td>{{ convert['__inputPath'] }}</td>
          </tr>
          <tr>
            <td>input-mask:</td>
            <td>{{ convert['inputMask'] }}</td>
          </tr>
          <tr>
            <td>output-path:</td>
            <td>{{ convert['__outputPath'] }}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Getter } from 'vuex-class';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Convert extends Vue {
  @Getter('application/getSteps') steps!: any;
  @Prop() sequence!: number;

  get rootPath() {
    return this.steps[this.sequence]['options']['root'];
  }

  get workPath() {
    return this.steps[this.sequence]['options']['workPath'];
  }

  get title() {
    return this.steps[this.sequence]['options']['title']
      ? this.steps[this.sequence]['options']['title']
      : 'Conversion de fichier(s)';
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
