const crud = require('crud');

let fileName='Addresses', 
collectionName='addresses', 
primaryKey=['_id'], 
excludedKeys=[''];

var newModule = {
    saveOrUpdate: (editing, req, fncResult) => {
        crud.setCollection(fileName, collectionName, primaryKey, excludedKeys);
        if (!isDbConnected) return fncResult(instantiateMessage(500, 'hedz.msg.error.database.connection'));
        let errors = checkFields(req.body); 
        if (errors.length > 0){
            const msg = instantiateMessage(500, 'hedz.msg.error.empty.fields');
            msg.errors = errors;
            return fncResult(msg);
        }
        crud.saveOrUpdate(editing, req, (result)=>{
            fncResult(result);
        });
    },
    archive: (req, fncResult) => {
        crud.setCollection(fileName, collectionName, primaryKey, excludedKeys);
        if (!isDbConnected) return fncResult(instantiateMessage(500, 'hedz.msg.error.database.connection'));
        crud.archive(req, (result)=>{
            fncResult(result);
        });
    },
    delete: (req, fncResult) => {
        crud.setCollection(fileName, collectionName, primaryKey, excludedKeys);
        if (!isDbConnected) return fncResult(instantiateMessage(500, 'hedz.msg.error.database.connection'));
        crud.delete(req, (result)=>{
            fncResult(result);
        });
    },
    listAll: (fncResult) => {
        crud.setCollection(fileName, collectionName, primaryKey, excludedKeys);
        if (!isDbConnected) return fncResult(instantiateMessage(500, 'hedz.msg.error.database.connection'));
        crud.listAll((result)=>{
            fncResult(result);
        });
    },
    getByPK: (req, fncResult) => {
        crud.setCollection(fileName, collectionName, primaryKey, excludedKeys);
        if (!isDbConnected) return fncResult(instantiateMessage(500, 'hedz.msg.error.database.connection'));
        crud.getByPK(req, false, (result) => {
            fncResult(result);
        });
    }
};

const checkFields = (element) => {
    let errors = [];

    if (!element.name || element.name.length == 0){
        errors.push({text: msgI18n('hedz.address.register.name.required')});
    }
    if (!element.address || element.address.length == 0){
        errors.push({text: msgI18n('hedz.address.register.address.required')});
    }
    if (!element.number|| element.number.length == 0){
        errors.push({text: msgI18n('hedz.address.register.number.required')});
    }
    if (!element.neighborhood|| element.neighborhood.length == 0){
        errors.push({text: msgI18n('hedz.address.register.neighborhood.required')});
    }
    if (!element.city || element.city.length == 0){
        errors.push({text: msgI18n('hedz.address.register.city.required')});
    }
    if (!element.province || element.province.length == 0){
        errors.push({text: msgI18n('hedz.address.register.city.province.required')});
    }
    if (!element.lat || element.lat.length == 0){
        errors.push({text: msgI18n('hedz.address.register.lat.required')});
    }
    if (!element.lng || element.lng.length == 0){
        errors.push({text: msgI18n('hedz.address.register.lng.required')});
    }
    return errors;
}


module.exports = newModule;