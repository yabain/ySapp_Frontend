export class YEnumUtil
{
    static getListOfKey(enumName: any)
    {
        return Object.keys(enumName)
    }

    static getListOfValue(enumName: any)
    {
        return Object.values(enumName)
    }
}