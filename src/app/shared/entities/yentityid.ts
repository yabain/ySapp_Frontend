
export class YEntityID
{
    private _id:String;
    constructor()
    {
        this._id=this.generateId();
    }
    /**
     * @description this method allows to generate a unique identifier with 16 characteristics
     * @return a caracter chain of 16 elements 
     */
    generateId():String
    {
        var timestamp = (new Date().getTime() / 1000 | 0).toString(16);
        return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function() {
            return (Math.random() * 16 | 0).toString(16);
        }).toLowerCase();
    }
    
    setId(id:String)
    { 
        this._id=id;
    }

    toString():String
    {
        return this._id;
    }
    toObject():any
    {
        return this._id;
    }
    equals(id:YEntityID):Boolean
    {
        return this._id===id.toString()
    }
}