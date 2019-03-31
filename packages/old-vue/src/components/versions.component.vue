<template>
  <div>
    <div class="form-row">
      <h5>Versions</h5>
      <table
        id="table-versions"
        class="table table-condensed"
        v-for="(environnement, index) in environments"
        :key="environnement.id"
      >
        <thead>
          <tr>
            <th colspan="2">{{ index }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in environnement" :key="item.id">
            <td class="col-a">
              {{ item.name }}
            </td>
            <td class="col-b">
              {{ item.version }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Getter } from 'vuex-class';

@Component
export default class VersionsSection extends Vue {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="css">
#table-versions td.col-a {
  width: 40%;
}

#table-versions td.col-b {
  width: 60%;
}
</style>
