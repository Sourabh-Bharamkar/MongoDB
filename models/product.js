const mongoose=require('mongoose')
const Schema=mongoose.Schema;


const productSchema=new Schema({
  title:{
    type:String,
    required:true
  },
  price:{
    type:Number,
    required:true 
  },
  description:{
    type:String,
    required:true
  },
  imageUrl:{
    type:String,
    required:true
  }
})

module.exports=mongoose.model('Product',productSchema)




// const getDb = require('../util/database').getDb
// const mongoDb = require('mongodb')

// class Product {
//   constructor(title, price, description, imageUrl, id, userId) {
//     this.title = title;
//     this.price = price;
//     this.description = description;
//     this.imageUrl = imageUrl;
//     this._id = id ? new mongoDb.ObjectId(id) : null;
//     this.userId = userId
//   }

//   async save() {

//     try {
//       const db = getDb();
      
//       if (this._id) {
//         //update the product
//         await db.collection('products').updateOne({ _id: this._id }, { $set: this })

//       } else {
//         //create the product
//         await db.collection('products').insertOne(this)

//       }
//     } catch (err) {
//       console.log(err)
//     }

//     // const db = getDb();

//     // if (this._id) {
//     //   //update the product
//     //   return db.collection('products').updateOne({ _id: this._id }, { $set: this })
//     //     .then((result) => {
//     //       console.log(result)
//     //     }).catch((err) => {
//     //       console.log(err)
//     //     })
//     // } else {
//     //   //create the product
//     //   return db.collection('products').insertOne(this)
//     //     .then((result) => {
//     //       console.log(result)
//     //     }).catch((err) => {
//     //       console.log(err)
//     //     })
//     // }

//   }

//   static async fetchAll() {
//     try {
//       const db = getDb();
//       const products = await db.collection('products').find().toArray();
//       return products;

//     } catch (err) {
//       console.log(err)
//     }

//     // const db = getDb();
//     // return db.collection('products').find().toArray()
//     //   .then((products) => {
//     //     console.log(products)
//     //     return products;
//     //   }).catch((err) => {
//     //     console.log(err)
//     //   })
//   }


//   static async findById(prodId) {

//     try {
//       const db = getDb();
//       const product = await db.collection('products').find({ _id: new mongoDb.ObjectId(prodId) }).next()
//       console.log(product);
//       return product;

//     } catch (err) {
//       console.log(err)
//     }

//     // const db = getDb();
//     // return db.collection('products').find({ _id: new mongoDb.ObjectId(prodId) }).next()
//     //   .then(((product) => {
//     //     console.log(product);
//     //     return product;
//     //   }))
//     //   .catch((err) => {
//     //     console.log(err)

//     //   })
//   }

//   static async deleteById(prodId) {
//     try {
//       const db = getDb();
//       await db.collection('products').deleteOne({ _id: new mongoDb.ObjectId(prodId) })
//     } catch (err) {
//       console.log(err)
//     }

//     // const db = getDb();
//     // return db.collection('products').deleteOne({ _id: new mongoDb.ObjectId(prodId) })
//     //   .then((result) => {
//     //     console.log('Deleted')
//     //   }).catch((err) => {
//     //     console.log(err)
//     //   })
//   }

// }

// module.exports = Product;
