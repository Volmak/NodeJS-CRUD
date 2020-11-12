
class BaseModel {
// too basic really to have multiple classes TODO: consider it anyway
    constructor(TableName){
        this.DB = require('../db')[TableName];
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
        record.id = this._getNextId();
        this.DB.push(record);
    }

    delete(id){
        this.DB.splice(this._getArrayIndex(id), 1);
    }

    replace (record){
        this.DB.splice(this._getArrayIndex(record.id), 1, record);
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
}

module.exports = BaseModel;