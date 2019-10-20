import { Rule, SchematicContext, Tree, apply, url, applyTemplates, move, chain, mergeWith, SchematicsException } from '@angular-devkit/schematics';
import { strings, normalize } from '@angular-devkit/core';


// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function service(options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {

    const workspaceConfig = tree.read('/angular.json');
    if (!workspaceConfig) { 
      throw new SchematicsException('Could not find Angular workspace configuration');
    }

    const templateSource = apply(url('./files'), [
      applyTemplates({
        classify: strings.classify,
        dasherize: strings.dasherize,
        name: options.name
      }),
      move(normalize(options.path as string))
    ]);

    return chain([
      mergeWith(templateSource)
    ]);
  };
}
