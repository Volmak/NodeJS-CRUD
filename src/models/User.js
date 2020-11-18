
const BaseModel = require('./BaseModel');

class UserModel extends BaseModel {

    constructor(){
        const schema = {
            username: {
                type: "String",
                mandatory: true
            },
            password: {
                type: "String",
                mandatory: true
            }
        }
        super('Users', schema);
    }

    getUser(username){
        return this.DB.find((user) => {
            return user.username == username;
        })
    }
}

module.exports = UserModel;
