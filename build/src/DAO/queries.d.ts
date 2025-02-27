declare const saveData: (model: any, data: any) => Promise<unknown>;
declare const getData: (model: any, query: any, projection: any, options: any) => Promise<unknown>;
declare const getSingleData: (model: any, query: any, projection: any, options: any) => Promise<unknown>;
declare const getUniqueData: (model: any, key_name: string, query: any, options: any) => Promise<unknown>;
declare const findAndUpdate: (model: any, query: any, update: any, options: any) => Promise<unknown>;
declare const updateMany: (model: any, query: any, update: any) => Promise<unknown>;
declare const removeData: (model: any, query: any) => Promise<unknown>;
declare const removeMany: (model: any, query: any) => Promise<unknown>;
declare const populateData: (model: any, query: any, projection: any, options: any, collection_options: any) => Promise<unknown>;
declare const deepPopulateData: (model: any, query: any, projection: any, options: any, coll_options: any, pop_options: any) => Promise<any>;
declare const countData: (model: any, query: any) => Promise<unknown>;
declare const aggregateData: (model: any, group: any, options: any) => Promise<unknown>;
declare const aggregateWithPopulateData: (model: any, group: any, options: any, populate_options: any) => Promise<any>;
declare const insertData: (model: any, data: any, options: any) => Promise<unknown>;
declare const insertMany: (model: any, data: any, options: any) => Promise<unknown>;
declare const bulkFindAndUpdateOne: (bulk: any, query: any, update: any, options: any) => Promise<unknown>;
declare const bulkFindAndUpdate: (bulk: any, query: any, update: any, options: any) => Promise<unknown>;
export { saveData, getData, getSingleData, getUniqueData, findAndUpdate, updateMany, removeData, removeMany, populateData, deepPopulateData, countData, aggregateData, aggregateWithPopulateData, insertData, insertMany, bulkFindAndUpdateOne, bulkFindAndUpdate };
