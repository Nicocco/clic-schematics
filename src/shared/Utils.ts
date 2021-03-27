import { SchematicsException, Tree } from "@angular-devkit/schematics";
import { AngularConstantes } from "./angular-constantes";

export namespace Utils {

    /**
     * Know if an object is null or undefined
     * @param object object to test
     */
    export function isNullOrUndefined(object: any): boolean {
        return object === null
            || object === undefined;
    }

    export function AngularProjectCheck(tree: Tree): void {
        const isAnAngularProject: boolean = tree.exists(AngularConstantes.packageJsonFileName);
        if (!isAnAngularProject) {
            throw new SchematicsException('Could not find Angular workspace configuration');
        }
    }
}