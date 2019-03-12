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

  
  // _.map()
  var fileName = path.join(exports.dataDir, `${id}.txt`);
  fs.readFile(fileName, (err,))





  var data = _.map(items, (text, id) => {

    return { id, text };
  });
  console.log(data);
  callback(null, data);


  // const readCounter = (callback) => {
  //   fs.readFile(exports.counterFile, (err, fileData) => {
  //     if (err) {
  //       callback(null, 0);
  //     } else {
  //       callback(null, Number(fileData));
  //     }
  //   });
  // };
  
};

exports.readOne = (id, callback) => {
  var text = items[id];
  if (!text) {
    callback(new Error(`No item with id: ${id}`));
  } else {
    callback(null, { id, text });
  }
};

exports.update = (id, text, callback) => {
  var item = items[id];
  if (!item) {
    callback(new Error(`No item with id: ${id}`));
  } else {
    items[id] = text;
    callback(null, { id, text });
  }
};

exports.delete = (id, callback) => {
  var item = items[id];
  delete items[id];
  if (!item) {
    // report an error if item not found
    callback(new Error(`No item with id: ${id}`));
  } else {
    callback();
  }
};

// Config+Initialization code -- DO NOT MODIFY /////////////////////////////////

exports.dataDir = path.join(__dirname, 'data');

exports.initialize = () => {
  if (!fs.existsSync(exports.dataDir)) {
    fs.mkdirSync(exports.dataDir);
  }
};
