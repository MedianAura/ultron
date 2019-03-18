import {get} from 'lodash';
import {JsonFactoryService} from '@/app/services/json-factory.service';
import {StepOption} from '@/app/models/step-option.model';
import {Step} from '@/app/models/step.model';
import {StepTypeEnum} from '@/app/enums/step-type.enum';
import {GlobalOptionFactoryService} from '@/app/services/global-option-factory.service';
import {
  CommandOption,
  ConvertOption,
  CopyOption,
  EcvOption,
  EmailOption,
  FindReplaceOption,
  FtpOption,
  GitCleanOption,
  GitCloneOption,
  GitRebaseOption,
  SshOption,
  ZipOption
} from '@/app/models/step-options';

const debug = require('debug')('ultron:service:StepOptionFactory');

class StepOptionFactory {

  getStepOptions(step: Step, config: object) {
    if (typeof step.jsonOptions === 'string') {
      step.jsonOptions = get(
        config,
        step.jsonOptions.replace('config.', ''),
        undefined
      );
    }

    if (typeof step.jsonOptions === 'undefined') {
      throw Error(`Step options is undefined for <${step.type}>`);
    }

    step.options = this.getClass(step.type, step);
  }

  private getClass(type: string, step: Step): StepOption {
    let temp: object = JSON.parse(
      GlobalOptionFactoryService.replaceApplicationGlobalVariable(JSON.stringify(step.jsonOptions))
    );

    switch (type) {
      case StepTypeEnum.CMD:
        return JsonFactoryService.getJsonConverter().deserialize(temp, CommandOption);
      case StepTypeEnum.CONVERT:
        return JsonFactoryService.getJsonConverter().deserialize(temp, ConvertOption);
      case StepTypeEnum.COPY:
        return JsonFactoryService.getJsonConverter().deserialize(temp, CopyOption);
      case StepTypeEnum.ECV:
        return JsonFactoryService.getJsonConverter().deserialize(temp, EcvOption);
      case StepTypeEnum.EMAIL:
        return JsonFactoryService.getJsonConverter().deserialize(temp, EmailOption);
      case StepTypeEnum.FTP:
        return JsonFactoryService.getJsonConverter().deserialize(temp, FtpOption);
      case StepTypeEnum.GITCLEAN:
        return JsonFactoryService.getJsonConverter().deserialize(temp, GitCleanOption);
      case StepTypeEnum.GITCLONE:
        return JsonFactoryService.getJsonConverter().deserialize(temp, GitCloneOption);
      case StepTypeEnum.GITREBASE:
        return JsonFactoryService.getJsonConverter().deserialize(temp, GitRebaseOption);
      case StepTypeEnum.REPLACE:
        return JsonFactoryService.getJsonConverter().deserialize(temp, FindReplaceOption);
      case StepTypeEnum.SSH:
        return JsonFactoryService.getJsonConverter().deserialize(temp, SshOption);
      case StepTypeEnum.ZIP:
        return JsonFactoryService.getJsonConverter().deserialize(temp, ZipOption);
      default:
        throw Error(`Type <${type}> doesn't exist as a step.`);
    }
  }
}

export const StepOptionFactoryService = new StepOptionFactory();
