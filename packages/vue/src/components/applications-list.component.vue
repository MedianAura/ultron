<template>
  <div role="tablist">
    <!--<b-card no-body class="mb-1">-->
      <!--<b-card-header header-tag="header" class="p-1" role="tab">-->
        <!--<b-btn block href="#" v-b-toggle.applications variant="info">Applications</b-btn>-->
      <!--</b-card-header>-->
      <!--<b-collapse id="applications" visible accordion="my-accordion" role="tabpanel">-->
        <!--<b-card-body>-->
          <!--<ul id="apps-list" class="nav flex-column">-->
            <!--<li class="nav-item" v-for="application in getApplicationList()" v-bind:key="application.id"-->
                <!--:id="application.name" :class="{'active': getActiveItem(application.name)}">-->
              <!--<span @click="infoApplicationModule(application)">{{ application.name }}</span>-->
              <!--<span class="version"> ({{ application.version }})</span>-->
            <!--</li>-->
          <!--</ul>-->
        <!--</b-card-body>-->
      <!--</b-collapse>-->
    <!--</b-card>-->
    <!--<b-card no-body class="mb-1">-->
      <!--<b-card-header header-tag="header" class="p-1" role="tab">-->
        <!--<b-btn block href="#" v-b-toggle.modules variant="info">Modules</b-btn>-->
      <!--</b-card-header>-->
      <!--<b-collapse id="modules" accordion="my-accordion" role="tabpanel">-->
        <!--<b-card-body>-->
          <!--<ul id="mods-list" class="nav flex-column">-->
            <!--<li class="nav-item" v-for="module in getModuleList()" v-bind:key="module.id" :id="module.name"-->
                <!--:class="{'active': getActiveItem(module.name)}">-->
              <!--<span @click="infoApplicationModule(module)">{{ module.name }}</span>-->
              <!--<span class="version">({{ module.version }})</span>-->
              <!--<hr>-->
            <!--</li>-->
          <!--</ul>-->
        <!--</b-card-body>-->
      <!--</b-collapse>-->
    <!--</b-card>-->
    
    Stewpid !
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  
  @Component
  export default class SideBar extends Vue {
  
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .nav-item {
    cursor: pointer;
  }
  
  #mods-list li.active {
    font-weight: bold;
  }
  
  #apps-list li.active {
    font-weight: bold;
  }
  
  #applications, #modules {
    max-height: 700px;
    overflow: auto;
  }
  
  li.nav-item span {
    display: block
  }
  
  .version {
    font-weight: bold;
    font-size: x-small;
  }
</style>
