<template>
  <div id="app">
    <NavigationComponent></NavigationComponent>
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import NavigationComponent from './components/navigation.component.vue';

@Component({
  components: {
    NavigationComponent,
  },
})
export default class App extends Vue {}
</script>

<style lang="css">
@import "~bootstrap/dist/css/bootstrap.min.css";
@import "~noty/lib/noty.css";
@import "~noty/lib/themes/bootstrap-v3.css";
@import "~@fortawesome/fontawesome-free/css/all.css";

main {
  margin-top: 10px;
}

#anmodal .modal-body {
  max-height: 75vh;
  overflow: auto;
}

#logmodal .modal-body {
  max-height: 90vh;
  overflow: auto;
}
</style>
