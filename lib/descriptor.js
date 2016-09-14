/*
 * Express-Api-Descriptor
 * Copyright(c) 2016 Andreas Limoli
 * ISC Licensed
 */

'use strict';

var apiList = [];
var apiListEntity = {};

function Descriptor (express) {
    // Extends Express Functionalities
    express.prototype.constructor.application.descriptor = function (o) {
        setDescriptor(this._router.stack[this._router.stack.length-1].route, o);
        return this;
    }

    express.Route.prototype.descriptor = function (o) {
        setDescriptor(this, o);
        return this;
    }

    return {
        list : function () {
            return apiList;
        },
        listByEntity : function () {
            return apiListEntity;
        }
    }
}

function setDescriptor (route, o) {
    o.method = route.stack[route.stack.length-1].method;
    o.path = route.path;
    apiList.push(o);

    if (o.entity) {
        setEntity(o.entity, o);
    } else {
        var segments = apiList[apiList.length-1].path.split('/');

        // If segment length is 2 it equals to have 1 entity (first element is empty)
        if (segments.length == 2 && segments[1] == '') {
            setEntity("root", o);
        } else {
            setEntity(segments[segments.length-1], o);
        }
    }
}

function setEntity (entity, api) {
    // Control if exists already the entity
    if (apiListEntity[entity]) {
        apiListEntity[entity].apis.push(api);
    } else {
        // Otherwise crete a new entity
        apiListEntity[entity] = {
            entity : entity,
            apis : [api]
        };
    }
}

module.exports = Descriptor;