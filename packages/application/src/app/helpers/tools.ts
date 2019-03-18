export class Tools {
  public static getDrive(appPath: string, dev: boolean) {
    const drive = appPath.split(':')[0].toLowerCase() + ':';
    if (drive === 'm:' && !dev) {
      return 'm:';
    }

    return 'u:';
  }

  public static getArchiveDrive(appPath: string, dev: boolean) {
    const drive = appPath.split(':')[0].toLowerCase() + ':';
    if (drive === 's:' && !dev) {
      return 's:';
    }

    return 'v:';
  }
}
