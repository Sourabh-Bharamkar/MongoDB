const mongoDb=require('mongodb')
const getDb = require('../util/database').getDb;


class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }

  save() {
    const db = getDb();
    return db.collection('users').insertOne(this)
  }

  static findById(userId){
    const db=getDb();
    return db.collection('users').findOne({_id: new mongoDb.ObjectId(userId)})
  }
  
}

module.exports = User;
