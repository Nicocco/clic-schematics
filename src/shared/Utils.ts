export namespace Utils {

    /**
     * Know if an object is null or undefined
     * @param object object to test
     */
    export function isNullOrUndefined(object: any): boolean {
        return object === null
            || object === undefined;
    }
}