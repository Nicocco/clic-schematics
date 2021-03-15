import { strings } from '@angular-devkit/core';
import { apply, applyTemplates, chain, MergeStrategy, mergeWith, move, Rule, SchematicContext, Source, Tree, url } from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import { normalize } from 'path';
import { AngularConstantes } from '../shared/angular-constantes';
import { SchematicConstantes } from '../shared/constantes';
import { Utils } from '../shared/Utils';
import * as ts from 'typescript';

export function ngAdd(): Rule {
    return chain([
        generateProjectTemplate(),
        addEnvVar(),
        addPackageDependancies()
    ]);
}

function generateProjectTemplate(): Rule {
    return (tree: Tree, _context: SchematicContext) => {
        Utils.AngularProjectCheck(tree);
        const templateSource: Source = apply(
            url('./files/'),
            [
                applyTemplates({
                    classify: strings.classify,
                    dasherize: strings.dasherize
                }),
                move(normalize('./src/app/'))
            ]
        );
        _context.logger.info('added source template');
        return mergeWith(templateSource, MergeStrategy.Overwrite);
    };
}

function addEnvVar(): Rule {
    return (tree: Tree, _context: SchematicContext) => {
        Utils.AngularProjectCheck(tree);
        let stringFileContent: string = tree.read(AngularConstantes.environementFileName)!
            .toString('utf-8');

        let node = ts.createSourceFile(AngularConstantes.environementFileName,
            stringFileContent,
            ts.ScriptTarget.Latest);
        return tree;
    }
}

function addPackageDependancies(): Rule {
    return (tree: Tree, _context: SchematicContext) => {
        Utils.AngularProjectCheck(tree);
        const jsonPackageStr: string = tree.read(AngularConstantes.packageJsonFileName)!
            .toString('utf-8');
        const jsonPackage: any = JSON.parse(jsonPackageStr);

        if (Utils.isNullOrUndefined(jsonPackage[AngularConstantes.dependenciesSectionName])) {
            jsonPackage[AngularConstantes.dependenciesSectionName] = {};
        }

        for (var NeededPackage of SchematicConstantes.clicPackages) {
            jsonPackage[AngularConstantes.dependenciesSectionName][NeededPackage.packageName]
                = NeededPackage.packageVersion;
            _context.logger.log('info', 'added ' + NeededPackage.packageName + '@'
                + NeededPackage.packageVersion
                + ' as dependency');
        }
        tree.overwrite('package.json', JSON.stringify(jsonPackage, null, 4));
        _context.addTask(new NodePackageInstallTask());
        return tree;
    }

}
