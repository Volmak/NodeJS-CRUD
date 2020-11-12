
const BaseModel = require('./BaseModel');

class OrdersModel extends BaseModel {

    constructor(){
        const schema = {
            id: {
                type: "Integer",
                mandatory: true
            },
            date: {
                type: "Date",
                mandatory: true
            },
            products: {
                type: "Array",
                mandatory: true
            },
            status: {
                type: "Status",
                mandatory: true
            }
        }
        super('Orders', schema);
        this.STATUS_ARRAY = ["Pending", "Processing", "Delivered", "Cancelled"];
    }

    create(record) {
        let timedRecord = record;
        timedRecord.date = this._getAsDateString(new Date);
        super.create(timedRecord);
    }

    _getAsDateString(date){
        return date.toISOString().substring(0, 10);
    }

    _getInBySchemaType(key, value){
        if (this.SCHEMA[key].type == "Date"){
            if (value instanceof Date){
                return this._getAsDateString(value);
            } else {
                return this._getAsDateString(new Date(value));
            }
        }
        if (this.SCHEMA[key].type == "Status"){
            if (this.STATUS_ARRAY.indexOf(value) > -1){
                return value;
            } else {
                /*TODO: Leave this to Express for now, but consider Exception handling */
                throw 'Invalid Status'; 
            }
        }
        return super._getInBySchemaType(key, value);
    }
}

module.exports = OrdersModel;