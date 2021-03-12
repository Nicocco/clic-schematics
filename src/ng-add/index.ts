import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';


// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function ngAdd(): Rule {
    return (tree: Tree, _context: SchematicContext) => {
        if (tree.exists('package.json')) {
            const jsonPackageStr: string = tree.read('package.json')!.toString('utf-8');
            const jsonPackage: any = JSON.parse(jsonPackageStr);

            const dependancies: string = 'dependencies';
            if (jsonPackage[dependancies] === null
                || jsonPackage[dependancies] === undefined) {
                jsonPackage[dependancies] = {};
            }

            const pkg = '@lgm-clic/ts-flux';
            const version = "1.0.0-rc1";
            jsonPackage[dependancies][pkg] = version;

            tree.overwrite('package.json', JSON.stringify(jsonPackage, null, 4));
            _context.logger.log('info', 'added @lgm-clic/ts-flux as dependency');
            _context.addTask(new NodePackageInstallTask());
        }

        return tree;
    }
}