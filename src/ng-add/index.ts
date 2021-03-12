import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import { AngularConstantes } from '../shared/angular-constantes';
import { SchematicConstantes } from '../shared/constantes';
import { Utils } from '../shared/Utils';

export function ngAdd(): Rule {
    return (tree: Tree, _context: SchematicContext) => {
        Utils.AngularProjectCheck(tree);
        const jsonPackageStr: string = tree.read(AngularConstantes.packageJsonFileName)!.toString('utf-8');
        const jsonPackage: any = JSON.parse(jsonPackageStr);

        if (Utils.isNullOrUndefined(jsonPackage[AngularConstantes.dependenciesSectionName])) {
            jsonPackage[AngularConstantes.dependenciesSectionName] = {};
        }

        for (var NeededPackage of SchematicConstantes.clicPackages) {
            jsonPackage[AngularConstantes.dependenciesSectionName][NeededPackage.packageName]
                = NeededPackage.packageVersion;
            _context.logger.log('info', 'added ' + NeededPackage.packageName + '@'
                + NeededPackage.packageVersion
                + 'as dependency');
        }

        tree.overwrite('package.json', JSON.stringify(jsonPackage, null, 4));
        _context.addTask(new NodePackageInstallTask());
        return tree;
    }
}