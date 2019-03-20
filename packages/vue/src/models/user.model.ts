const regex = new RegExp('(CN=([^,]+))')

export class User {
  name: string | null = null;
  sAMAccountName: string | null = null;
  memberOf: string[] = [];
  dn: string | null = null;
  description: string | null = null;
  controls: string[] = [];
  roles: string[] = [];

  constructor (options: User) {
    this.name = options.name
    this.sAMAccountName = options.sAMAccountName
    this.memberOf = options.memberOf
    this.dn = options.dn
    this.description = options.description
    this.controls = options.controls

    for (let i = 0; i < options.memberOf.length; i++) {
      let group = this.getGroupName(options.memberOf[i])

      if (!group) {
        continue
      }

      this.roles.push(group)
    }
  }

  /**
   *
   * @param dn
   * @returns {string}
   */
  private getGroupName (dn: string) {
    let groupNames: string[] | null = regex.exec(dn.replace('é', 'e'))
    return groupNames && groupNames.length > 2 ? groupNames[2] : null
  }
}
