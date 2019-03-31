<template>
  <div>
    <div class="form-row">
      <div class="form-group col-4">
        <label for="version">Version:</label>
      </div>
      <div class="form-group col-4">
        <label for="branches">Git:</label>
      </div>
      <div class="form-group col-4">
        <button
          class="btn btn-primary"
          @click="selectPackage(selectedVersion)"
          :disabled="selectedGitVersion === ''"
          id="go-actions"
        >
          Lancer
        </button>
      </div>
    </div>
    <div>
      <b-modal
        size="lg"
        id="anmodal"
        title="Actions à effectuer"
        :no-close-on-backdrop="true"
        :no-close-on-esc="true"
        :hide-header-close="true"
      >
        <div>
          <div class="cellule-info">
            <div class="row">
              <div class="col-md-4"><h5>Dossier de travail:</h5></div>
              <div class="col-md-8">{{ selectedVersion.workPath }}</div>
            </div>
          </div>
        </div>
        <div>
          <form data-vv-scope="wizard">
            <component
              v-for="(actionComponent, index) in getActionComponents"
              :key="index"
              :sequence="index"
              v-bind:is="actionComponent"
            ></component>
          </form>
        </div>
        <div slot="modal-footer" class="w-100">
          <p class="float-left">Lancer la séquence d'actions ?</p>
          <div class="float-right">
            <b-btn id="btn-oui" size="sm" variant="primary" @click="prepareToActions">
              Oui
            </b-btn>
            <b-btn data-dismiss="modal" size="sm" variant="secondary" @click="discontinueActions">
              Non
            </b-btn>
          </div>
        </div>
      </b-modal>
    </div>
    <div>
      <b-modal
        ref="progressModal"
        id="pmodal"
        title="Avancement"
        hide-footer
        :no-close-on-backdrop="true"
        :no-close-on-esc="true"
        :hide-header-close="true"
      >
        <h4>{{ progress.actionName }}</h4>
        <p v-html="progress.actionParams">{{ progress.actionParams }}</p>
        <div>
          <b-progress :value="progress.actualStep" :max="progress.maxSteps" show-progress animated></b-progress>
        </div>
        <b-btn
          v-show="progress.actionCompleted === true"
          id="btn-close-progress"
          size="sm"
          variant="primary"
          @click="closeProgress"
        >
          Fermer
        </b-btn>
      </b-modal>
    </div>
    <div>
      <b-modal
        header-bg-variant="warning"
        centered
        ref="undefinedTasksModal"
        id="utmodal"
        title="Attention"
        :no-close-on-backdrop="true"
        :no-close-on-esc="true"
        :hide-header-close="true"
      >
        <h4>{{ undefinedTasksMessage }}</h4>
        <div>
          <b-list-group>
            <b-list-group-item v-for="item in undefinedTasks" :key="item.id">{{ item }}</b-list-group-item>
          </b-list-group>
        </div>
        <div slot="modal-footer" class="w-100">
          <p class="float-left">Il faut corriger le problème</p>
          <div class="float-right">
            <b-btn data-dismiss="modal" size="sm" variant="secondary" @click="discontinueActions">
              OK
            </b-btn>
          </div>
        </div>
      </b-modal>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import CopyComponent from '../components/wizard/copy.vue';
import EmailComponent from '../components/wizard/email.vue';
import FtpComponent from '../components/wizard/ftp.vue';
import SshComponent from '../components/wizard/ssh.vue';
import ZipComponent from '../components/wizard/zip.vue';
import EcvComponent from '../components/wizard/ecv.vue';
import ConvertComponent from '../components/wizard/convert.vue';
import GitCloneComponent from '../components/wizard/gitClone.vue';
import GitCleanComponent from '../components/wizard/gitClean.vue';
import CommandsComponent from '../components/wizard/commands.vue';
import FindReplaceComponent from '../components/wizard/findReplace.vue';
import GitRebaseComponent from '../components/wizard/gitRebase.vue';

@Component({
  components: {
    CopyComponent: CopyComponent,
    EmailComponent: EmailComponent,
    FtpComponent: FtpComponent,
    SshComponent: SshComponent,
    ZipComponent: ZipComponent,
    EcvComponent: EcvComponent,
    ConvertComponent: ConvertComponent,
    GitCloneComponent: GitCloneComponent,
    GitCleanComponent: GitCleanComponent,
    CommandsComponent: CommandsComponent,
    FindReplaceComponent: FindReplaceComponent,
    GitRebaseComponent: GitRebaseComponent,
  },
})
export default class ApplicationSection extends Vue {
  //
  // /**************************************************************************
  //  *  Variables
  //  */
  // undefinedTasksMessage = ''
  // actionsToExecute: { (application: ApplicationModel, version: object, config: object): void; } [] = []
  // undefinedTasks: string[] = []
  // selectedGitVersion = ''
  // selectedVersion: any = { 'name': ''}
  // progress: Progress = new Progress(null)
  //
  // /**************************************************************************
  //  *  Méthodes
  //  */
  // mounted () {
  //   this.__progress.subscribe((value:Progress) => {
  //     this.progress = value
  //   })
  //   this.getApplication.subscribe((application: ApplicationModel) => {
  //     if(application === this.application) {
  //       return
  //     }
  //     this.updateRecipe('')
  //   })
  // }
  //
  // selectPackage (version: string) {
  //   this.infoVersion(version)
  //
  //   this.steps.forEach((step: Step) => {
  //     let action: string = step.type
  //     let actionMethod = get(ActionsService, action, null)
  //     if (actionMethod === null) {
  //       this.undefinedTasks.push(action)
  //     }
  //   })
  //
  //   this.undefinedTasksMessage = 'Actions non implémentées:'
  //   if (this.undefinedTasks.length === 1) {
  //     this.undefinedTasksMessage = 'Action non implémentée:'
  //   }
  //   if (this.undefinedTasks.length > 0) {
  //     this.$root.$emit('bv::show::modal', 'utmodal')
  //   } else {
  //     this.actionComponents()
  //     this.$root.$emit('bv::show::modal', 'anmodal')
  //   }
  // }
  //
  // get tags () {
  //   return this.application.versions.tags
  // }
  //
  // get branches () {
  //   return this.application.versions.branches
  // }
  //
  // get versions () {
  //   return this.application.config.versions
  // }
  //
  // get recipeList () {
  //   // SÉB. 23oct2018 - J'ai ajouter un observable pour construire la liste des recettes sous le format de données standard voir
  //   // https://select2.org/data-sources/arrays + https://select2.org/data-sources/formats#grouped-data
  //   let data: object[] = [{ 'id': '', 'text': 'Choisissez' }]
  //
  //   let testList: SelectionOption = { 'text': 'Test', 'children': [] }
  //   this.tests.forEach((test: any) => {
  //     testList.children.push({ 'id': test.name, 'text': test.name })
  //   })
  //   data.push(testList)
  //
  //   let userGroup = store.state.login.user.memberOf.join(',')
  //   if (userGroup.indexOf('CN=Ultron') > -1) {
  //     let approbationList: SelectionOption = { 'text': 'Approbation', 'children': [] }
  //     this.approbations.forEach((approbation: any) => {
  //       approbationList.children.push({ 'id': approbation.name, 'text': approbation.name })
  //     })
  //     data.push(approbationList)
  //
  //     let productionList: SelectionOption = { 'text': 'Production', 'children': [] }
  //     this.productions.forEach((production: any) => {
  //       productionList.children.push({ 'id': production.name, 'text': production.name })
  //     })
  //     data.push(productionList)
  //   }
  //
  //   return data
  // }
  //
  // get versionList () {
  //   // SÉB. 23oct2018 - J'ai ajouter un observable pour construire la liste des branches et Tag sous le format de données standard voir
  //   // https://select2.org/data-sources/arrays + https://select2.org/data-sources/formats#grouped-data
  //   let data: object[] = [{ 'id': '', 'text': 'Choisissez' }]
  //
  //   let tagList: SelectionOption = { 'text': 'Tags', 'children': [] }
  //   this.tags.forEach((tag) => {
  //     tagList.children.push({ 'id': tag, 'text': tag })
  //   })
  //   data.push(tagList)
  //
  //   if (this.selectedVersion['type'] !== 'production') {
  //     let branchList: SelectionOption = { 'text': 'Branches', 'children': [] }
  //     this.branches.forEach((branche) => {
  //       branchList.children.push({ 'id': branche, 'text': branche })
  //     })
  //     data.push(branchList)
  //   }
  //
  //   return data
  // }
  //
  // /*******************************************************************************************
  //  * Événements
  //  */
  //
  // updateRecipe ($event: any) {
  //   // SÉB. 23oct2018 - On va chercher dans la liste des recettes la recette qui match avec le nom de la selection. (On pourrait avoir un UUID pour être plus safe ici)
  //   let selectedVersion = find(this.versions, (version: any) => version.name === $event) || { 'name' : ''}
  //   this.selectedVersion = selectedVersion
  // }
  //
  // updateGitVersion ($event: any) {
  //   // SÉB. 23oct2018 - On attribut la version GIT dans la variable sur le changement.
  //   this.selectedGitVersion = $event
  //
  //   this.selectedVersion.steps.forEach((step: Step, ndx: number) => {
  //     if (step.type === 'gitClone') {
  //       this.selectedVersion.steps[ndx].options.branch = this.selectedGitVersion
  //       this.selectedVersion.steps[ndx].options.cwd = this.selectedVersion.steps[ndx].options.cwd ? this.selectedVersion.steps[ndx].options.cwd : this.selectedVersion.workPath
  //     }
  //     if (step.type === 'gitRebase') {
  //       this.selectedVersion.steps[ndx].options.selectedTag = this.selectedGitVersion
  //     }
  //   })
  // }
  //
  // prepareToActions () {
  //   this.$validator.validate('wizard.*').then(result => {
  //     if (result) {
  //       this.actionsToExecute = []
  //       this.undefinedTasks = []
  //
  //       this.application.buildWorkdir(this.application.workRootPath)
  //
  //       this.steps.forEach((step: Step) => {
  //         let action: string = step.type
  //         let actionMethod = get(ActionsService, action, null)
  //         this.actionsToExecute.push(actionMethod.bind(actionMethod, this.application, this.selectedVersion, step.options))
  //       })
  //
  //       this.continueToActions()
  //     } else {
  //       $('#'+this.$validator.errors.items[0].field)[0].scrollIntoView({ block: 'center', inline: 'center' })
  //     }
  //   })
  // }
  //
  // closeProgress () {
  //   this.addLog({
  //     section: this.application.config.name,
  //     log: {
  //       date: moment().format('YYYY-MM-DD hh:mm:ss'),
  //       user: store.state.login.user.name,
  //       version: this.selectedGitVersion,
  //       recipe: this.selectedVersion
  //     }
  //   })
  //
  //   this.$root.$emit('bv::hide::modal', 'pmodal')
  //   this.application.getEnvVersion()
  // }
  //
  // discontinueActions () {
  //   this.$root.$emit('bv::hide::modal', 'utmodal')
  //   this.$root.$emit('bv::hide::modal', 'anmodal')
  // }
  //
  // continueToActions () {
  //   this.$root.$emit('bv::hide::modal', 'utmodal')
  //   this.$root.$emit('bv::hide::modal', 'anmodal')
  //   let obj = {
  //     maxSteps: this.steps.length,
  //     actionName: 'Initialisation',
  //     actionParams: 'Préparation des tâches',
  //     actionCompleted: false
  //   }
  //   this.initProgress(obj)
  //
  //   this.$set(this.progress, "actionCompleted", false)
  //
  //   this.$root.$emit('bv::show::modal', 'pmodal')
  //   SequencesService.sequence(this.actionsToExecute)
  // }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="css">
#btn-oui {
   margin-left: 12px;
}

td {
  padding-left: 10px;
  padding-right: 10px;
}
</style>
