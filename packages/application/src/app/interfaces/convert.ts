export interface TypeOptionGit {
    title?: string
    repositoryUrl: string
    repoDev: string
    branch?: string
    cwd?: string
}

export interface TypeOptionGitRebase {
    title?: string
    "remote": string
    "branch": string
}

export interface TypeOptionGitClean {
    title?: string
    folder: string[]
    file: string[]
}

export enum VersionTypeEnum {
    TEST = 'test',
    DEV = 'dev',
    PROD = 'production'
}

export interface TypeOptionsFindReplace {
    inputPath: string
    inputMask: string[]
    outputPath: string
    codec: string
    find: string
    replace: string
}

export interface TypeOptionEmail {
    title: string
    template: {
        ref: string
        title: string
    }
    to: string
    subject: string
    text?: string
    markdown?: string
}

export interface TypeOptionFtp {
    ref: string
    title?: string
    ftp: FTP[]
    connection: Connection
}

export enum ZipTypeEnum {
    COMPRESS = 'compress',
    EXTRACT = 'extract'
}

export interface TypeOptionZip {
    title?: string
    type: ZipTypeEnum
    params: string[]
    mask: string[]
    fileName: string
    from: string
    to: string
}

export interface TypeOptionCopy {
    title?: string
    mask: string[]
    from: string
    to: string
    type: string
    excludeFolder?: {
        source?: string[]
        dest?: string[]
    }
    excludeFile?: {
        source?: string[]
        dest?: string[]
    }
}

export interface TypeOptionSsh {
    ref: string
    title?: string
    commands: string[]
    connection: Connection
}

export interface TypeOptionEcv {
    title?: string
    config: string[]
    expirationDate?: string
    archiveVersion?: string
}

export interface FTP {
    from: string
    file: string
    to: string
}

export interface Connection {
    host: string
    port: string
    userName: string
    password: string
}
