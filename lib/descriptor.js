/*
    express-api-descriptor
    Copyright(c) 2017 Andrea Limoli
    MIT Licensed
*/

const apiList = [];
const apiListEntity = {};

function Descriptor(express) {

    // Extends Express functionalities
    express.prototype.constructor.application.descriptor = (o) => {
        setDescriptor(this._router.stack[this._router.stack.length - 1].route, o);
        return this;
    }

    express.Route.prototype.descriptor = (o) => {
        setDescriptor(this, o);
        return this;
    }

    return {
        list: () => {
            return apiList;
        },
        listByEntity: () => {
            return apiListEntity;
        }
    }
}

function setDescriptor(route, o) {
    o.method = route.stack[route.stack.length - 1].method;
    o.path = route.path;
    apiList.push(o);

    if (o.entity) {
        setEntity(o.entity, o);
    } else {
        const segments = apiList[apiList.length - 1].path.split('/');

        // If segment length is 2 it equals to have 1 entity (first element is empty)
        if (segments.length === 2 && segments[1] === '') {
            setEntity("root", o);
        } else {
            setEntity(segments[segments.length - 1], o);
        }
    }
}

function setEntity(entity, api) {
    // Control if the entity already exists
    if (apiListEntity[entity]) {
        apiListEntity[entity].apis.push(api);
    } else {
        // Otherwise crete a new entity
        apiListEntity[entity] = {
            entity: entity,
            apis: [api]
        };
    }
}

export default Descriptor;