export namespace SchematicConstantes {
    
    interface IPackage {
        packageName: string;
        packageVersion: string;
    }

    export var clicPackages: Array<IPackage> = [
        {
            packageName: '@la-clic/ts-flux',
            packageVersion: '1.0.0-rc.1'
        },
        {
            packageName: '@la-clic/logger',
            packageVersion: '1.0.0-rc.1'
        }
    ];
}
