import {
  Rule, SchematicContext, Tree, apply, url, applyTemplates,
  move, chain, mergeWith, Source
} from '@angular-devkit/schematics';
import { strings, normalize } from '@angular-devkit/core';
import { Utils } from '../shared/Utils';

export function component(options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    Utils.AngularProjectCheck(tree);
    const templateSource: Source = apply(
      url(getUrlFilesSystemToCopy(options)),
      [
        applyTemplates(generateTemplate(options)),
        move(normalize(options.path as string))
      ]
    );
    return chain([
      mergeWith(templateSource)
    ]);
  };
}

/**
 * Generate de template given to the template files
 * @param options schematics options entries
 */
function generateTemplate(options: any): object {
  return {
    classify: strings.classify,
    dasherize: strings.dasherize,
    name: options.name,
    splitGetSet: options.splitGetSet,
    withoutStyleSheet: options.withoutStyleSheet
  }
}

/**
 * Return the correct file system to copy
 * @param options schematics options entries
 */
function getUrlFilesSystemToCopy(options: any): string {
  if (options.withoutStyleSheet) {
    return './files-without-style';
  } else {
    return './files';
  }
}
