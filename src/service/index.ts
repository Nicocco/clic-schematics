import { Rule, SchematicContext, Tree, apply, url, applyTemplates, move, chain, mergeWith } from '@angular-devkit/schematics';
import { strings, normalize } from '@angular-devkit/core';
import { Utils } from '../shared/Utils';

export function service(options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    Utils.AngularProjectCheck(tree);
    const templateSource = apply(url('./files'), [
      applyTemplates({
        classify: strings.classify,
        dasherize: strings.dasherize,
        name: options.name,
        http: options.http
      }),
      move(normalize(options.path as string))
    ]);

    return chain([
      mergeWith(templateSource)
    ]);
  };
}
