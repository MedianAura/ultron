
const t = {
    "type": "module",
    "name": "Accueil",
    "xRay": "",
    "changelog": "changelog.md",
    "config": {
        "git": {
            "repositoryUrl": "git@git.vigilance.local:vigilance/accueil.git",
            "repoDev": ""
        },
        "gitClean": {
            "folder": [
                "rxvlibrairies/.git",
                "rxvlibrairies/test",
                ".git",
                ".dist",
                ".docs",
                ".tasks"
            ],
            "file": [
                "rxvlibrairies/.gitignore",
                "rxvlibrairies/readme.md",
                "rxvlibrairies/history.txt",
                "rxvlibrairies/jsdoc.conf.json",
                ".ecvDebug",
                ".editorconfig",
                ".gitignore",
                ".jshintrc",
                ".jsinspectrc",
                "configuration_javascript.rxvcm",
                "gulpfile.js",
                "init.sh",
                "package.json",
                "yarn.lock"
            ]
        },
        "data": {
            "sources": {
                "title": "Sources",
                "root": "%disque%\\__sources\\accueil\\",
                "folder": [
                    "data"
                ],
                "file": []
            },
            "valides": {
                "title": "Valides",
                "root": "%disque%\\qa_valides\\accueil\\",
                "folder": [
                    "data"
                ],
                "file": []
            }
        }
    },
    "versions": [
        {
            "name": "Test",
            "title": "Version test",
            "type": "test",
            "visible": true,
            "workPath": "accueil",
            "customName": "accueil",
            "steps": [
                {
                    "type": "gitClone",
                    "options": "config.git"
                },
                {
                    "type": "commands",
                    "options": {
                        "title": "Mise à jour des dépendences",
                        "cmd": [
                            "c:",
                            "cd %workPath%",
                            "init.sh"
                        ]
                    }
                },
                {
                    "type": "gitClean",
                    "options": "config.gitClean"
                },
                {
                    "type": "copy",
                    "options": {
                        "title": "Copie du dossier DATA",
                        "mask": "*.*",
                        "from": "%disque%\\__sources\\accueil\\data\\",
                        "to": "%workPath%data\\",
                        "excludeFolder": {
                            "source": [],
                            "dest":[]
                        },
                        "excludeFile": {
                            "source": [],
                            "dest":[]
                        }
                    }
                },
                {
                    "type": "copy",
                    "options": {
                        "title": "Copie du dossier trainning",
                        "mask": "*.*",
                        "from": "%disque%:\\__sources\\accueil\\trainning\\",
                        "to": "%workPath%trainning",
                        "excludeFolder": {
                            "source": [],
                            "dest":[]
                        },
                        "excludeFile": {
                            "source": [],
                            "dest":[]
                        }
                    }
                },
                {
                    "type": "ecv",
                    "options": {
                        "title": "Création de l'archive pour RxVigilance Windows",
                        "config" : [
                            "[Configuration]",
                            "archiveFilename=C:/vigilwin/rxvigilance/%customName%.ecv",
                            "archiveRootDir=%archiveRootDir%",
                            "archiveType=debug",
                            "archiveVersion=%archiveVersion%",
                            "expirationDate=%expirationDate%",
                            "compressionLevel=9"
                        ]
                    }
                },
                {
                    "type": "zip",
                    "options": {
                        "title": "Création d'une archives RAR",
                        "type": "compress",
                        "params": ["-r","-o+","-ep1"],
                        "mask": ["*.*"],
                        "fileName": "%customName%.zip",
                        "from": "%workRootPath%",
                        "to": "C:\\bidon\\"
                    }
                },
                {
                    "type": "ftp",
                    "options": {
                        "title": "Envoi par FTP de %customName%.zip sur test.vigilance.ca",
                        "ref": "test.vigilance.ca",
                        "ftp": {
                            "from": "c:\\bidon\\",
                            "file": "%customName%.zip",
                            "to": "/var/www/depot_html"
                        }
                    }
                },
                {
                    "type": "copy",
                    "options": {
                        "title": "Copie pour déploiement sur fluffy",
                        "mask": "*.*",
                        "from": "%workPath%",
                        "to": "S:\\ultron\\latest\\RxVigilance\\%customName%",
                        "excludeFolder": {
                            "source": [],
                            "dest":[]
                        },
                        "excludeFile": {
                            "source": [],
                            "dest":[]
                        }
                    }
                },
                {
                    "type": "ssh",
                    "options": {
                        "ref": "rx.vigilance.test",
                        "title": "Déploiement de RxVgilance sur rx.vigilance.test",
                        "cmd": [
                            "cd /home/vigilance/Fluffy",
                            "fab manual_module_deploy:test,%customName%,ultron"
                        ]
                    }
                },
                {
                    "type": "ssh",
                    "options": {
                        "ref": "test.vigilance.ca",
                        "title": "Déploiement sur test.vigilance.ca/test/",
                        "cmd": [
                            "cd /var/www/depot_html",
                            "sh ./goTest.sh %customName%"
                        ]
                    }
                }
            ]
        },
        {
            "name": "TestRelease",
            "title": "Version test release",
            "type": "test",
            "visible": true,
            "workPath": "accueil",
            "customName": "accueil",
            "steps": [
                {
                    "type": "gitClone",
                    "options": "config.git"
                },
                {
                    "type": "zip",
                    "options": {
                        "title": "Extraction de l'archives release",
                        "type": "extract",
                        "params": ["-o+"],
                        "mask": ["*.*"],
                        "fileName": "release.zip",
                        "from": "%workPath%.dist\\",
                        "to": "c:\\bidon\\modules\\%customName%\\"
                    }
                },
                {
                    "type": "copy",
                    "options": {
                        "title": "Copie du dossier DATA",
                        "mask": "*.*",
                        "from": "%disque%\\__sources\\accueil\\data\\",
                        "to": "c:\\bidon\\modules\\%customName%\\data\\",
                        "excludeFolder": {
                            "source": [],
                            "dest":[]
                        },
                        "excludeFile": {
                            "source": [],
                            "dest":[]
                        }
                    }
                },
                {
                    "type": "copy",
                    "options": {
                        "title": "Copie du dossier trainning",
                        "mask": "*.*",
                        "from": "%disque%\\__sources\\accueil\\trainning\\",
                        "to": "c:\\bidon\\modules\\%customName%\\trainning\\",
                        "excludeFolder": {
                            "source": [],
                            "dest":[]
                        },
                        "excludeFile": {
                            "source": [],
                            "dest":[]
                        }
                    }
                },
                {
                    "type": "ecv",
                    "options": {
                        "title": "Création de l'archive pour RxVigilance Windows",
                        "config" : [
                            "[Configuration]",
                            "archiveFilename=C:/vigilwin/rxvigilance/%customName%.ecv",
                            "archiveRootDir=c:/bidon/modules",
                            "archiveType=debug",
                            "archiveVersion=%archiveVersion%",
                            "expirationDate=%expirationDate%",
                            "compressionLevel=9"
                        ]
                    }
                },
                {
                    "type": "zip",
                    "options": {
                        "title": "Création d'une archives RAR",
                        "type": "compress",
                        "params": ["-r","-o+","-ep1"],
                        "mask": ["*.*"],
                        "fileName": "%customName%.zip",
                        "from": "c:\\bidon\\modules\\",
                        "to": "C:\\bidon\\"
                    }
                },
                {
                    "type": "ftp",
                    "options": {
                        "title": "Envoi par FTP de %customName%.zip sur test.vigilance.ca",
                        "ref": "test.vigilance.ca",
                        "ftp": {
                            "from": "c:\\bidon\\",
                            "file": "%customName%.zip",
                            "to": "/var/www/depot_html"
                        }
                    }
                },
                {
                    "type": "copy",
                    "options": {
                        "title": "Copie pour déploiement sur fluffy",
                        "mask": "*.*",
                        "from": "c:\\bidon\\modules\\%customName%\\",
                        "to": "S:\\ultron\\latest\\RxVigilance\\%customName%",
                        "excludeFolder": {
                            "source": [],
                            "dest":[]
                        },
                        "excludeFile": {
                            "source": [],
                            "dest":[]
                        }
                    }
                },
                {
                    "type": "ssh",
                    "options": {
                        "ref": "rx.vigilance.test",
                        "title": "Déploiement de RxVgilance sur rx.vigilance.test",
                        "cmd": [
                            "cd /home/vigilance/Fluffy",
                            "fab manual_module_deploy:test,%customName%,ultron"
                        ]
                    }
                },
                {
                    "type": "ssh",
                    "options": {
                        "ref": "test.vigilance.ca",
                        "title": "Déploiement sur test.vigilance.ca/test/",
                        "cmd": [
                            "cd /var/www/depot_html",
                            "sh ./goTest.sh %customName%"
                        ]
                    }
                },
                {
                    "type": "commands",
                    "options": {
                        "title": "Supprimer le dossier c:\\bidon\\modules\\%customName%\\",
                        "cmd": [
                            "c:",
                            "rmdir /S /Q c:\\bidon\\modules\\%customName%\\"
                        ]
                    }
                }
            ]
        },
        {
            "name": "approbation",
            "title": "Approbation de la version release",
            "type": "approbation",
            "visible": true,
            "workPath": "accueil",
            "customName": "accueil",
            "steps": [
                {
                    "type": "gitClone",
                    "options": "config.git"
                },
                {
                    "type": "gitRebase",
                    "options": {
                        "remote" : "origin",
                        "branch" : "env/production"
                    }
                },
                {
                    "type": "zip",
                    "options": {
                        "title": "Extraction de l'archives release",
                        "type": "extract",
                        "params": ["-o+"],
                        "mask": ["*.*"],
                        "fileName": "release.zip",
                        "from": "%workPath%.dist\\",
                        "to": "c:\\bidon\\modules\\%customName%\\"
                    }
                },
                {
                    "type": "copy",
                    "options": {
                        "title": "Copie du modules dans __sources",
                        "mask": "*.*",
                        "from": "c:\\bidon\\modules\\%customName%\\",
                        "to": "%disque%\\__sources\\accueil",
                        "excludeFolder": {
                            "source": [],
                            "dest":[
                                "data",
                                "trainning"
                            ]
                        },
                        "excludeFile": {
                            "source": [],
                            "dest":[]
                        }
                    }
                },
                {
                    "type": "email",
                    "options": {
                        "template": {
                            "ref": "generique",
                            "title": "Accueil"
                        },
                        "to": "fdm@vigilance.ca",
                        "subject": "Approbation du module Accueil",
                        "title": "Accueil",
                        "text": "",
                        "markdown": "%changelog%"
                    }
                }
            ]
        }
    ],
    "environnements": [
        {
            "environment": "dev",
            "name": "html",
            "ref": "html",
            "path": "http://test.vigilance.ca/test/accueil/rxv_version.js?bust=%timestamp%",
            "version": ""
        },
        {
            "environment": "dev",
            "name": "rx.vigilance.test",
            "ref": "rx.vigilance.test",
            "path": "https://rx.vigilance.test/module/accueil/rxv_version.js?cle=e60f0d9ff352064d0a6c98a27ed55088&bust=%timestamp%",
            "version": ""
        },
        {
            "environment": "fdm",
            "name": "rxvnew",
            "ref": "rxvnew",
            "path": "%disque%\\rxvnew\\rxvigilance\\accueil\\rxv_version.js?",
            "version": ""
        },
        {
            "environment": "fdm",
            "name": "rxvcourant",
            "ref": "rxvcourant",
            "path": "%disque_s%\\rxvcourant\\rxvigilance\\accueil\\rxv_version.js",
            "version": ""
        },
        {
            "environment": "prod",
            "name": "html",
            "ref": "html",
            "path": "http://test.vigilance.ca/rxvigilance/accueil/rxv_version.js?bust=%timestamp%",
            "version": ""
        },
        {
            "environment": "prod",
            "name": "rx.vigilance.local",
            "ref": "rx.vigilance.local",
            "path": "https://rx.vigilance.local/module/accueil/rxv_version.js?token=297d9303fad6c2603e4c088d7b28bb3edb71ee01428cf22dd38a651a760740de&bust=%timestamp%",
            "version": ""
        },
        {
            "environment": "prod",
            "name": "rx.vigilance.stage",
            "ref": "rx.vigilance.stage",
            "path": "https://rxstage.vigilance.ca/module/accueil/rxv_version.js?cle=e60f0d9ff352064d0a6c98a27ed55088&bust=%timestamp%",
            "version": ""
        },
        {
            "environment": "prod",
            "name": "rxint.vigilance.ca",
            "ref": "rxint.vigilance.ca",
            "path": "https://rxint.vigilance.ca/module/accueil/rxv_version.js?cle=e60f0d9ff352064d0a6c98a27ed55088&bust=%timestamp%",
            "version": ""
        },
        {
            "environment": "prod",
            "name": "rx.vigilance.ca",
            "ref": "rx.vigilance.ca",
            "path": "https://rx.vigilance.ca/module/accueil/rxv_version.js?cle=e60f0d9ff352064d0a6c98a27ed55088&bust=%timestamp%",
            "version": ""
        }
    ]
}

export class Application {
    private test: string = "bob"
}
