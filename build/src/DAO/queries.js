"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bulkFindAndUpdate = exports.bulkFindAndUpdateOne = exports.insertMany = exports.insertData = exports.aggregateWithPopulateData = exports.aggregateData = exports.countData = exports.deepPopulateData = exports.populateData = exports.removeMany = exports.removeData = exports.updateMany = exports.findAndUpdate = exports.getUniqueData = exports.getSingleData = exports.getData = exports.saveData = void 0;
const saveData = (model, data) => {
    return new Promise((resolve, reject) => {
        try {
            let save_info = model.create(data);
            return resolve(save_info);
        }
        catch (err) {
            return reject(err);
        }
    });
};
exports.saveData = saveData;
const getData = (model, query, projection, options) => {
    return new Promise((resolve, reject) => {
        try {
            let fetch_data = model.find(query, projection, options);
            return resolve(fetch_data);
        }
        catch (err) {
            return reject(err);
        }
    });
};
exports.getData = getData;
const getSingleData = (model, query, projection, options) => {
    return new Promise((resolve, reject) => {
        try {
            let fetch_data = model.findOne(query, projection, options);
            return resolve(fetch_data);
        }
        catch (err) {
            return reject(err);
        }
    });
};
exports.getSingleData = getSingleData;
const getUniqueData = (model, key_name, query, options) => {
    return new Promise((resolve, reject) => {
        try {
            let fetch_data = model.distinct(key_name, query, options);
            return resolve(fetch_data);
        }
        catch (err) {
            return reject(err);
        }
    });
};
exports.getUniqueData = getUniqueData;
const findAndUpdate = (model, query, update, options) => {
    return new Promise((resolve, reject) => {
        try {
            let update_data = model.findOneAndUpdate(query, update, options);
            return resolve(update_data);
        }
        catch (err) {
            return reject(err);
        }
    });
};
exports.findAndUpdate = findAndUpdate;
const updateMany = (model, query, update) => {
    return new Promise((resolve, reject) => {
        try {
            let update_data = model.updateMany(query, update);
            return resolve(update_data);
        }
        catch (err) {
            return reject(err);
        }
    });
};
exports.updateMany = updateMany;
const removeData = (model, query) => {
    return new Promise((resolve, reject) => {
        try {
            let delete_data = model.deleteOne(query);
            return resolve(delete_data);
        }
        catch (err) {
            return reject(err);
        }
    });
};
exports.removeData = removeData;
const removeMany = (model, query) => {
    return new Promise((resolve, reject) => {
        try {
            let delete_data = model.deleteMany(query);
            return resolve(delete_data);
        }
        catch (err) {
            return reject(err);
        }
    });
};
exports.removeMany = removeMany;
const populateData = (model, query, projection, options, collection_options) => {
    return new Promise((resolve, reject) => {
        try {
            let fetch_data = model.find(query, projection, options).populate(collection_options).exec();
            return resolve(fetch_data);
        }
        catch (err) {
            return reject(err);
        }
    });
};
exports.populateData = populateData;
const deepPopulateData = (model, query, projection, options, coll_options, pop_options) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let fetch_data = yield model.find(query, projection, options).populate(coll_options).exec();
        let populateData = yield model.populate(fetch_data, pop_options);
        return (populateData);
    }
    catch (err) {
        return (err);
    }
});
exports.deepPopulateData = deepPopulateData;
const countData = (model, query) => {
    return new Promise((resolve, reject) => {
        try {
            let fetch_data = model.count(query);
            return resolve(fetch_data);
        }
        catch (err) {
            return reject(err);
        }
    });
};
exports.countData = countData;
const aggregateData = (model, group, options) => {
    return new Promise((resolve, reject) => {
        try {
            let fetch_data;
            if (options !== undefined) {
                fetch_data = model.aggregate(group).option(options);
            }
            else {
                fetch_data = model.aggregate(group);
            }
            return resolve(fetch_data);
        }
        catch (err) {
            return reject(err);
        }
    });
};
exports.aggregateData = aggregateData;
const aggregateWithPopulateData = (model, group, options, populate_options) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let fetch_data;
        if (options !== undefined) {
            fetch_data = yield model.aggregate(group).option(options);
        }
        else {
            fetch_data = yield model.aggregate(group);
        }
        let populateData = yield model.populate(fetch_data, populate_options);
        return (populateData);
    }
    catch (err) {
        return (err);
    }
});
exports.aggregateWithPopulateData = aggregateWithPopulateData;
const insertData = (model, data, options) => {
    return new Promise((resolve, reject) => {
        try {
            let saveData = model.collection.insert(data, options);
            return resolve(saveData);
        }
        catch (err) {
            return reject(err);
        }
    });
};
exports.insertData = insertData;
const insertMany = (model, data, options) => {
    return new Promise((resolve, reject) => {
        try {
            let saveData = model.collection.insertMany(data, options);
            return resolve(saveData);
        }
        catch (err) {
            return reject(err);
        }
    });
};
exports.insertMany = insertMany;
const bulkFindAndUpdateOne = (bulk, query, update, options) => {
    return new Promise((resolve, reject) => {
        try {
            let update_data = bulk.find(query).upsert().update(update, options);
            return resolve(update_data);
        }
        catch (err) {
            return reject(err);
        }
    });
};
exports.bulkFindAndUpdateOne = bulkFindAndUpdateOne;
const bulkFindAndUpdate = (bulk, query, update, options) => {
    return new Promise((resolve, reject) => {
        try {
            let update_data = bulk.find(query).upsert().updateOne(update, options);
            return resolve(update_data);
        }
        catch (err) {
            return reject(err);
        }
    });
};
exports.bulkFindAndUpdate = bulkFindAndUpdate;
