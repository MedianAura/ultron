const regex = new RegExp('(CN=([^,]+))');

export class User {
  /**
   * @param dn
   * @returns {string}
   */
  private static getGroupName(dn: string) {
    const groupNames: string[] | null = regex.exec(dn.replace('é', 'e'));
    return groupNames && groupNames.length > 2 ? groupNames[2] : null;
  }

  public name: string | null = null;
  public sAMAccountName: string | null = null;
  public memberOf: string[] = [];
  public dn: string | null = null;
  public description: string | null = null;
  public controls: string[] = [];
  public roles: string[] = [];

  constructor(options: User) {
    this.name = options.name;
    this.sAMAccountName = options.sAMAccountName;
    this.memberOf = options.memberOf;
    this.dn = options.dn;
    this.description = options.description;
    this.controls = options.controls;

    for (const member of options.memberOf) {
      const group = User.getGroupName(member);

      if (!group) {
        continue;
      }

      this.roles.push(group);
    }
  }
}
