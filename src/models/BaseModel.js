
class BaseModel {
    
    constructor(TableName, schema){
        this.DB = require('../db')[TableName];
        this.SCHEMA = schema;
    }

    getById(id) {
        return this.DB.find((record) => {
            return record.id == id;
        })
    }

    all() {
        return this.DB;
    }

    create(record) {
        let bySchemaRecord = this._getBySchemaRecord(record, true);
        bySchemaRecord.id = this._getNextId();
        this.DB.push(bySchemaRecord);
        return bySchemaRecord.id;
    }

    delete(id){
        this.DB.splice(this._getArrayIndex(id), 1);
    }

    replace (record){
        this.DB.splice(
            this._getArrayIndex(record.id),
            1,
            this._getBySchemaRecord(record, true)
        );
    }

    edit(newRecord) {
        let savedRecord = this.getById(newRecord.id);
        Object.assign(savedRecord, this._getBySchemaRecord(newRecord));
    }

    filter(key, valueArray){
        return this.DB.filter((record) => {
            return valueArray.indexOf(record[key]) > -1;
        })
    }

    /*TODO: remove if database is added*/
    _getNextId() {
        const lastId = Math.max.apply(
            Math, 
            this.DB.map((record) => {
                return record.id;
            })
        )
        return lastId + 1;
    }

    _getArrayIndex(id) {
        return this.DB.findIndex((record) => record.id == id);
    }

    _getBySchemaRecord(record, checkMandatoryKays){
        let bySchemaRecord = {};
        for(let key in this.SCHEMA){
            if (key in record) {
                bySchemaRecord[key] = this._getInBySchemaType(key, record[key])
            } else if (checkMandatoryKays && this.SCHEMA[key].mandatory) {
                /*TODO: Leave this to Express for now, but consider Exception handling */
                throw 'Missing mandatory field';
            }
        }
        return bySchemaRecord;
    }

    /*overlkill? TODO: consider removal*/
    _getInBySchemaType(key, value){
        const bySchemaType = this.SCHEMA[key].type;
        switch(bySchemaType){
            case "Integer" : return parseInt(value);
            case "Float" : return parseFloat(value);
            case "String" : return String(value);
            case "Bool" : return Boolean(value);
            case "Array" : return (value instanceof Array) ? value : [value];
        }
    }
}

module.exports = BaseModel;