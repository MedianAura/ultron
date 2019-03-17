export default class Copy extends Vue {
    @Getter('application/getSteps') steps!: any
    @Prop() sequence!: number

    get title() {
        return this.steps[this.sequence]['options']['title'] ? this.steps[this.sequence]['options']['title'] : 'ZIP'
    }

    get cmd() {
        let cmd = 'winrar '

        let from = path.resolve(this.steps[this.sequence]['options']['from']) + '\\'
        let to = path.resolve(this.steps[this.sequence]['options']['to']) + '\\'
        let mask = this.steps[this.sequence]['options']['mask']
        let fileName = this.steps[this.sequence]['options']['fileName']

        let aParams: string[] = []
        switch (this.steps[this.sequence]['options']['type']) {
            case 'compress':
                aParams.push('a -ibck')
                aParams = aParams.concat(this.steps[this.sequence]['options']['params'])
                aParams.push(to + fileName)
                aParams = aParams.concat(mask.map((value: string) => {
                    value = from + value
                    return value
                }))
                break
            case 'extract':
                aParams.push('x -ibck')
                aParams = aParams.concat(this.steps[this.sequence]['options']['params'])
                aParams.push(from + fileName)
                aParams = aParams.concat(mask)
                aParams.push(to)
                break
        }

        return cmd + aParams.join(' ')
    }
}
