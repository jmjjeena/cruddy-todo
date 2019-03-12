const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const counter = require('./counter');

var items = {};

// Public API - Fix these CRUD functions ///////////////////////////////////////

exports.create = (text, callback) => {
  //generate id
  counter.getNextUniqueId((err, id) => {
    if (err) {
      throw ('error getting unique id');
    } else {
      var fileName = path.join(exports.dataDir, `${id}.txt`);
      fs.writeFile(fileName, text, (err) => {
        if (err) {
          throw (`error writing ${text} to ${fileName}`);
        } else {
          callback(null, {id, text});
        }
      }
      )}
  });
};

exports.readAll = (callback) => {
  fs.readdir(exports.dataDir, (err, items) => {
    if (err) {
      throw ('error readdir\'in the files in the directory');
    } else {
      var data = _.map(items, (item) => {
          return {id: item.slice(0, -4), text: item.slice(0, -4)};
        })
      callback(null, data);
    }} 
  );
};

exports.readOne = (id, callback) => {
  var fileName = path.join(exports.dataDir, `${id}.txt`);
  fs.readFile(fileName, (err, todoText) => {
    if (err) {
      callback(new Error(`No item with id: ${id}`));
    } else {
      callback (null, {id, text: todoText.toString()});
    }
  })
};

exports.update = (id, text, callback) => {
  var fileName = path.join(exports.dataDir, `${id}.txt`);
  fs.access(fileName, (err) => {
    if(err) {
      callback(new Error(`No item with id:`));
    } else {
      fs.writeFile(fileName, text, (err) => {
        if (err) {
          callback(new Error(`No item with id:`));
        } else {
          callback(null, {id, text});
        }
      })
    }
  })
};

exports.delete = (id, callback) => {
  var fileName = path.join(exports.dataDir, `${id}.txt`);

  fs.unlink(fileName, (err) => {
    if (err) {
      callback(new Error('item not found'));
    } else {
      callback(null);
    }
  })
};

// Config+Initialization code -- DO NOT MODIFY /////////////////////////////////

exports.dataDir = path.join(__dirname, 'data');

exports.initialize = () => {
  if (!fs.existsSync(exports.dataDir)) {
    fs.mkdirSync(exports.dataDir);
  }
};
