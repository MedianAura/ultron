<template>
  <div>
    <div id="logs" class="form-row">
      <h5>Logs</h5>
      <table id="table-logs" class="table">
        <thead>
          <tr>
            <th class="col-a">Version</th>
            <th class="col-b">Effectué le</th>
            <th class="col-c">Effectué par</th>
            <th class="col-d">&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in logs" :key="item.date" :class="logType(item.recipe.type)">
            <td class="col-a">{{ item.version }}</td>
            <td class="col-b">{{ item.date }}</td>
            <td class="col-c">{{ item.user }}</td>
            <td @click="showLog(index)" class="col-d">
                <i class="fas fa-eye"></i>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div>
      <b-modal id="logmodal" title="Log" :hide-footer="true">
        <h4>{{ selectedLog.date }}</h4>
        <pre>{{selectedLog}}</pre>
      </b-modal>
    </div>
  </div>

</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Getter } from 'vuex-class'

@Component({
})

export default class LogsSection extends Vue {
    // @Getter('Logging/getLogsSection') getLogsSection!: any;
    //
    // selectedLog: any = {}
    //
    // /**************************************************************************
    //  *  Méthodes
    //  */
    //
    // get logs () {
    //   return this.getLogsSection(this.application.config.name)
    // }
    //
    // logType (value: string) {
    //   if (value === 'production') {
    //     return 'table-danger'
    //   } else if (value === 'approbation') {
    //     return 'table-success'
    //   } else {
    //     return ''
    //   }
    // }
    //
    // showLog (ndx: number) {
    //   this.selectedLog = this.logs[ndx]
    //   this.$root.$emit('bv::show::modal', 'logmodal')
    // }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="css">
  #logs {
    max-height: 725px;
    overflow: auto;
  }

  #table-logs td.col-a, #table-logs th.col-a{
    width: 25%;
  }

  #table-logs td.col-b, #table-logs th.col-b {
    width: 35%;
  }

  #table-logs td.col-c, #table-logs th.col-c {
    width: 35%;
  }

  #table-logs td.col-d, #table-logs th.col-d {
    width: 5%;
  }

</style>
