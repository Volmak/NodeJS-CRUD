
class CrudController {
    
    constructor(model){
        this.MODEL = model;
    }

    get(req, res) {
        const id = req.params.id;
        let result;
        if (id) {
            result = this.MODEL.getById(id);
        } else {
            result = this.MODEL.all();
        }
        res.send(result);
    }

    post(req, res) {
        this.MODEL.create(req.body);
        res.send('Success! New record was added.'); //no fails
    }

    delete(req, res) {
        this.MODEL.delete(req.params.id);
        res.send('Success! The record was deleted.'); //no fails
    }

    put(req, res) {
        this.MODEL.replace(req.body);
        res.send('Success! The record was replaced'); //no fails
    }

    patch (req, res) {
        this.MODEL.edit(req.body);
        res.send('Success! The record was modified'); //no fails
    }
};

module.exports = CrudController;