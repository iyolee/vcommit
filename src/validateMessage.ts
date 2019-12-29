import { getConfig } from './utils';
import { IConfig } from './types';

const MERGE_COMMIT_PATTERN = /^Merge /;
const IGNORED = /^WIP/;
// 有 fixup! 或者 squash! 标记的提交不会合并
// https://git-scm.com/docs/git-commit
const PATTERN = /^((fixup! |squash! )?(\w+)(?:\(([^\)\s]+)\))?: (.+))(?:\n|$)/;

export function validateMessage(raw: string, sourceFile: string): boolean {
  const config: IConfig = getConfig();
  let types = config.types;
  const MAX_LENGTH = config.maxSubjectLength || 100;
  // const AUTO_FIX = config.autoFix && sourceFile;

  // resolve types from a module
  if (typeof types === 'string' && types !== '*') {
    types = Object.keys(require(types).types);
  }

  const messageWithBody = raw
    .split('\n')
    .filter((line: string) => line.indexOf('#') !== 0)
    .join('\n');

  const message = messageWithBody.split('\n').shift() || '';

  if (message === '') {
    // tslint:disable-next-line: no-console
    console.log('Aborting commit due to empty commit message.');
    return false;
  }

  let isValid = true;

  if (MERGE_COMMIT_PATTERN.test(message)) {
    // tslint:disable-next-line: no-console
    console.log('Merge commit detected.');
    return true;
  }

  if (IGNORED.test(message)) {
    // tslint:disable-next-line: no-console
    console.log('Commit message validation ignored.');
    return true;
  }

  const match = PATTERN.exec(message);

  if (!match) {
    // tslint:disable-next-line: no-console
    console.error('does not match "<type>(<scope>): <subject>" !');
    isValid = false;
  } else {
    const firstLine = match[1];
    const squashing = !!match[2];
    const type = match[3];
    const scope = match[4];
    const subject = match[5];

    // const SUBJECT_PATTERN = new RegExp(config.subjectPattern || '.+');
    // const SUBJECT_PATTERN_ERROR_MSG = config.subjectPatternErrorMsg
    //   || 'subject does not match subject pattern!';

    if (firstLine.length > MAX_LENGTH && !squashing) {
      // tslint:disable-next-line: no-console
      console.error('is longer than %d characters !', MAX_LENGTH);
      isValid = false;
    }

    // if (AUTO_FIX) {
    //   type = lowercase(type);
    // }

    // if (types !== '*' && types.indexOf(type) === -1) {
    //   console.error('"%s" is not allowed type ! Valid types are: %s', type, types.join(', '));
    //   isValid = false;
    // }

    // isValid = validateScope(isValid, scope);

    // if (AUTO_FIX) {
    //   subject = lowercaseFirstLetter(subject);
    // }

    // if (!SUBJECT_PATTERN.exec(subject)) {
    //   error(SUBJECT_PATTERN_ERROR_MSG);
    //   isValid = false;
    // }
  }

  // Some more ideas, do want anything like this ?
  // - Validate the rest of the message (body, footer, BREAKING CHANGE annotations)
  // - auto add empty line after subject ?
  // - auto remove empty () ?
  // - auto correct typos in type ?
  // - store incorrect messages, so that we can learn

  // isValid = isValid || config.warnOnFail;

  // if (isValid) {
  //   if (AUTO_FIX && !squashing) {
  //     var scopeFixed = scope ? '(' + scope + ')' : '';
  //     var firstLineFixed = type + scopeFixed + ': ' + subject;

  //     if (firstLine !== firstLineFixed) {
  //       var rawFixed = raw.replace(firstLine, firstLineFixed);
  //       fs.writeFileSync(sourceFile, rawFixed);
  //     }
  //   }

  //   return true;
  // }

  const argInHelp = config.helpMessage && config.helpMessage.indexOf('%s') !== -1;

  if (argInHelp) {
    // tslint:disable-next-line: no-console
    console.log(config.helpMessage, messageWithBody);
  } else if (message) {
    // tslint:disable-next-line: no-console
    console.log(message);
  }

  if (!argInHelp && config.helpMessage) {
    // tslint:disable-next-line: no-console
    console.log(config.helpMessage);
  }

  return false;
}
