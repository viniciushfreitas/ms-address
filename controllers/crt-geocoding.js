const api = require('../config/api');
const axios = require('axios');

var newModule = {
    geoLocation: (req, fncResult) => {
        let errors = checkFields(req.body); 
        if (errors.length > 0){
            const msg = instantiateMessage(500, 'hedz.msg.error.empty.fields');
            msg.errors = errors;
            return fncResult(msg);
        }
        // R. Jaci, 54 - Chácara Inglesa, São Paulo - SP, 04140-080, Brasil
        let address = req.body.address + ',' + req.body.number + ',' + req.body.neighborhood + ',' + req.body.city + ' - ' + req.body.province + ',' + req.body.cep;
        let url = encodeURI(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${api.google}`);

        // let addresses = [ { details:
        //     { number: '418',
        //       route: 'Avenida Brasil',
        //       neighborhood: 'Jardins',
        //       city: 'São Paulo',
        //       province: 'SP',
        //       country: 'Brazil',
        //       postalCode: '01430-000' },
        //    geometry: { lat: -23.5761601, lng: -46.6644572 },
        //    formatted:
        //     'Av. Brasil, 418 - Jardins, São Paulo - SP, 01430-000, Brazil' },
        //  { details:
        //     { number: '1122',
        //       route: 'Avenida Brasil',
        //       neighborhood: 'Jardim America',
        //       city: 'São Paulo',
        //       province: 'SP',
        //       country: 'Brazil',
        //       postalCode: '01430-001' },
        //    geometry: { lat: -23.57165, lng: -46.66927 },
        //    formatted:
        //     'Av. Brasil, 1122 - Jardim America, São Paulo - SP, 01430-001, Brazil' } ];
            
        axios.get(url)
            .then(res => {
                let addresses = [];
                if (res.data.results.length > 0 ){

                    res.data.results.forEach(function (result) {
                        let element = {};
                        element.details = {};
                        
                        result.address_components.forEach(function (component) {
                            component.types.forEach(function (type) {
                                if (type==="street_number"){
                                    element.details.number = component.long_name;
                                }else if (type==="route"){
                                    element.details.route = component.long_name;
                                }else if (type==="sublocality"){
                                    element.details.neighborhood = component.long_name;
                                }else if (type==="administrative_area_level_2"){
                                    element.details.city = component.long_name;
                                }else if (type==="administrative_area_level_1"){
                                    element.details.province = component.short_name;
                                }else if (type==="country"){
                                    element.details.country = component.long_name;
                                }else if (type==="postal_code"){
                                    element.details.postalCode = component.long_name;
                                }
                            });
                        });

                        element.geometry = result.geometry.location;
                        element.formatted = result.formatted_address;

                        addresses.push(element);
                    });
                }
                const msg = instantiateMessage(200, 'hedz.msg.success');
                msg.results = addresses;
                return fncResult(msg);
            })
            .catch(err => {
                const msg = instantiateMessage(500, 'hedz.msg.error.generic');
                msg.systemError = err;
                return fncResult(msg);
            });
    }
};


const checkFields = (element) => {
    let errors = [];

    if (!element.cep || element.cep.length == 0){
        errors.push({text: msgI18n('hedz.address.register.cep.required')});
    }
    if (!element.province || element.province.length == 0){
        errors.push({text: msgI18n('hedz.address.register.city.province.required')});
    }
    if (!element.city || element.city.length == 0){
        errors.push({text: msgI18n('hedz.address.register.city.required')});
    }
    if (!element.address || element.address.length == 0){
        errors.push({text: msgI18n('hedz.address.register.address.required')});
    }
    if (!element.neighborhood || element.neighborhood.length == 0){
        errors.push({text: msgI18n('hedz.address.register.neighborhood.required')});
    }
    return errors;
}


module.exports = newModule;