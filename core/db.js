'use strict';

const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const { resolve } = require('path');
const { existsSync, mkdirSync } = require('fs');
const storageExists = existsSync(resolve(__dirname, '..', 'storage'));

if (!storageExists) {
    mkdirSync(resolve(__dirname, '..', 'storage'));
}

const adapter = new FileSync(resolve(__dirname, '..', 'storage', 'db.json'), {
    serialize: obj => JSON.stringify(obj),
    deserialize: data => JSON.parse(data)
});
const db = lowdb(adapter);

module.exports = db;
