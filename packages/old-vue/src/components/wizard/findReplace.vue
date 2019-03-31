<template>
  <div class="cellule-info">
    <h5>{{ title }}</h5>
    <div class="form-group col-md-12">
      <table class="table">
        <tr>
          <td>input-path:</td>
          <td>{{ steps[sequence]['options']['inputPath'] }}</td>
        </tr>
        <tr>
          <td>mask:</td>
          <td>{{ steps[sequence]['options']['inputMask'].toString() }}</td>
        </tr>
        <tr>
          <td>output-path:</td>
          <td>{{ steps[sequence]['options']['outputPath'] }}</td>
        </tr>
        <tr>
          <td>pattern:</td>
          <td>{{ steps[sequence]['options']['find']['pattern'] }}</td>
        </tr>
        <tr>
          <td>flags:</td>
          <td>{{ steps[sequence]['options']['find']['flags'] }}</td>
        </tr>
        <tr>
          <td>replace:</td>
          <td>{{ steps[sequence]['options']['replace'] }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { Getter } from 'vuex-class';
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class FindReplace extends Vue {
  @Getter('application/getSteps') steps!: any;
  @Prop() sequence!: number;

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
