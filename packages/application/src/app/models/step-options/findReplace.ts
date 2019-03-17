import {Getter} from 'vuex-class'
import {Component, Prop, Vue} from 'vue-property-decorator'

@Component
export default class FindReplace extends Vue {
    @Getter('application/getSteps') steps!: any
    @Prop() sequence!: number

    get title() {
        return this.steps[this.sequence]['options']['title'] ? this.steps[this.sequence]['options']['title'] : 'Conversion de fichier(s)'
    }
}
