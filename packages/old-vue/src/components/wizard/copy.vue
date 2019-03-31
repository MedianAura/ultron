<template>
  <div class="cellule-info">
    <div class="row">
      <div class="col-md-12">
        <h5>{{ title }}</h5>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group col-md-12">
        <table>
          <tr>
            <td>Source:</td>
            <td>{{ steps[sequence]['options']['from'] }}</td>
          </tr>
          <tr>
            <td>Destination:</td>
            <td>{{ steps[sequence]['options']['to'] }}</td>
          </tr>
          <tr>
            <td>Fichiers:</td>
            <td>{{ steps[sequence]['options']['mask'] }}</td>
          </tr>
          <tr>
            <td>Répertoires à exclure:</td>
            <td>
              <span v-if="steps[sequence]['options']['excludeFolder']['sources']">Sources:</span>
              <span v-else>Sources: N/A</span>
              <ul v-if="steps[sequence]['options']['excludeFolder']['sources']">
                <li
                  class="nav-item"
                  v-for="option in steps[sequence]['options']['excludeFolder']['sources']"
                  v-bind:key="option.id"
                >
                  {{ option }}
                </li>
              </ul>
              <span v-if="steps[sequence]['options']['excludeFolder']['sources']">Destination:</span>
              <span v-else>Destination: N/A</span>
              <ul v-if="steps[sequence]['options']['excludeFolder']['dest']">
                <li
                  class="nav-item"
                  v-for="option in steps[sequence]['options']['excludeFolder']['dest']"
                  v-bind:key="option.id"
                >
                  {{ option }}
                </li>
              </ul>
            </td>
          </tr>
          <tr>
            <td>Fichiers à exclure:</td>
            <td>
              <span v-if="steps[sequence]['options']['excludeFile']['sources']">Sources:</span>
              <span v-else>Sources: N/A</span>
              <ul v-if="steps[sequence]['options']['excludeFile']['sources']">
                <li
                  class="nav-item"
                  v-for="option in steps[sequence]['options']['excludeFile']['sources']"
                  v-bind:key="option.id"
                >
                  {{ option }}
                </li>
              </ul>
              <span v-if="steps[sequence]['options']['excludeFile']['sources']">Destination:</span>
              <span v-else>Destination: N/A</span>
              <ul v-if="steps[sequence]['options']['excludeFile']['dest']">
                <li
                  class="nav-item"
                  v-for="option in steps[sequence]['options']['excludeFile']['dest']"
                  v-bind:key="option.id"
                >
                  {{ option }}
                </li>
              </ul>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Getter } from 'vuex-class';
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class Copy extends Vue {
  @Getter('application/getSteps') steps!: any;
  @Prop() sequence!: number;

  get title() {
    return this.steps[this.sequence]['options']['title']
      ? this.steps[this.sequence]['options']['title']
      : 'Copy de fichier(S)';
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
