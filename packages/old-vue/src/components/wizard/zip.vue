<template>
  <div class="cellule-info">
    <div class="row">
      <div class="col-md-12">
        <h5>{{ title }}</h5>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group col-md-12">
        <span>Type: {{ steps[sequence]['options']['type'] }}</span>
      </div>
      <div class="form-group col-md-12">
        <span>Commande: {{ cmd }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class Copy extends Vue {
  @Prop() sequence!: number;

  get title() {
    return '';
  }

  get cmd() {
    return '';
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
