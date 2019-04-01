<template>
  <main role="main" class="container-fluid">
    <div class="row">
      <div class="col-md-3">
        Hey we got something here baby !!
        <!--        <SidebarComponent/>-->
      </div>
      <!--<div class="col-md-9">-->
      <!--<MainComponent v-if="application !== null" :application="application"/>-->
      <!--</div>-->
    </div>
  </main>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
// import SidebarComponent from '../components/applications-list.component.vue';
// import MainComponent from '../components/selected-application.component.vue';
import { EventManagerService } from '@/services/event-manager.service';

@Component({
  // components: { SidebarComponent, MainComponent },
})
export default class MainPage extends Vue {
  created() {
    EventManagerService.getApplications();
  }
}
</script>

<style scoped lang="less"></style>
