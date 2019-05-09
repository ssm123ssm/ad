const mongo = require('mongodb').MongoClient;
var dbURL = 'mongodb://localhost:27017/db';
module.exports = {
    connect: function (collection, cb) {
        mongo.connect(dbURL, function (err, db) {
            if (err) {
                console.log(err);
                //db.close();
                return err;
            } else {
                var col = db.collection(collection);
                cb(col);
                db.close();
            }
        });
    },
    findAll: function (cb) {
        this.connect('default', function (col) {
            col.find({}).toArray(function (err, ress) {
                if (err) {
                    console.log(err);
                    return;
                } else {
                    cb(ress);
                }
            });
        });
    },
    insert: function (obj, cb) {
        this.connect('default', function (col) {
            col.insert(obj);
            cb();
        });
    },
    removeDoc: function (id, cb) {
        this.connect('default', function (col) {
            console.log(`removing id ${id}`);
            col.remove({
                _id: new ObjectId(id)
            });
            cb();
        });
    },
    search: function (query, target, cb) {
        var searchQ = {};
        searchQ[query] = target;
        this.connect('default', function (col) {
            col.find(searchQ).toArray(function (err, ress) {
                if (err) {
                    console.log(err);
                    return;
                } else {
                    cb(ress);
                }
            });
        });
    }
};
