<template>
  <div id="main-panel">
    <div class="row">
      <div class="col-md-12">
        <recipe-selection-section :application="application"></recipe-selection-section>
      </div>
    </div>
    <div class="row">
      <div class="col-md-5">
        <version-section :application="application"></version-section>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import VersionComponent from './versions.component.vue';
import RecipeSelection from './recipe-selection.component.vue';
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {
    versionSection: VersionComponent,
    recipeSelectionSection: RecipeSelection,
  },
})
export default class Main extends Vue {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less"></style>
