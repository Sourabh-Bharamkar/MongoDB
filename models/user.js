const mongoDb = require('mongodb')
const getDb = require('../util/database').getDb;


class User {
  constructor(name, email, cart, id) {
    this.name = name;
    this.email = email;
    this.cart = cart;
    this._id = id
  }

  save() {
    const db = getDb();
    return db.collection('users').insertOne(this)
  }

  static async findById(userId) {
    try {
      const db = getDb();
      const user = await db.collection('users').findOne({ _id: new mongoDb.ObjectId(userId) })
      return user;

    } catch (err) {
      console.log(err)
    }

  }

  async addToCart(product) {

    try {
      console.log(this.cart)
      const cartProductIndex = this.cart.items.findIndex((cp) => {
        console.log(cp.productId)
        return cp.productId.toString() == product._id.toString();
      })

      let newQuantity = 1;
      const updatedCartItems = [...this.cart.items]
      console.log(cartProductIndex)

      if (cartProductIndex>=0) {
        newQuantity = this.cart.items[cartProductIndex].quantity + 1;
        updatedCartItems[cartProductIndex].quantity = newQuantity ;

      } else {
        updatedCartItems.push({
          productId: new mongoDb.ObjectId(product._id),
          quantity: newQuantity
        })
      }

      const updatedCart = {
        items: updatedCartItems
      }
      const db = getDb();

      await db.collection('users').updateOne({ _id: new mongoDb.ObjectId(this._id) }, { $set: { cart: updatedCart } })

    } catch (err) {
      console.log(err)
    }

  }

}


module.exports = User;
