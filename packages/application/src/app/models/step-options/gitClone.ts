@Component
export default class gitClone extends Vue {
    @Getter('application/getSteps') steps!: any
    @Prop() sequence!: number

    get title() {
        return this.steps[this.sequence]['options']['title'] ? this.steps[this.sequence]['options']['title'] : 'Git clone'
    }
}

