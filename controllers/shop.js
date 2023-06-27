const Product = require('../models/product');
const User = require('../models/user')
const Order=require('../models/order');
const order = require('../models/order');

exports.getProducts = async (req, res, next) => {

  try {
    const products = await Product.find();
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });

  } catch (err) {
    console.log(err)
  }

};

exports.getProduct = async (req, res, next) => {

  try {

    const prodId = req.params.productId;
    const product = await Product.findById(prodId);
    res.render('shop/product-detail', {
      product: product,
      pageTitle: product.title,
      path: '/products'
    });

  } catch (err) {
    console.log(err)
  }

};

exports.getIndex = async (req, res, next) => {

  try {
    const products = await Product.find();
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });

  } catch (err) {
    console.log(err)
  }

};

exports.getCart = async (req, res, next) => {

  try {

    const user = await req.user.populate('cart.items.productId');

    const products = user.cart.items;
    console.log(products)
    res.render('shop/cart', {
      path: '/cart',
      pageTitle: 'Your Cart',
      products: products
    });


  } catch (err) {
    console.log(err)
  }


};

exports.postCart = async (req, res, next) => {

  try {
    const prodId = req.body.productId;
    const product = await Product.findById(prodId)
    await req.user.addToCart(product);
    res.redirect('/cart');
  } catch (err) {
    console.log(err)
  }

};


exports.postCartDeleteProduct = async (req, res, next) => {
  try {
    const prodId = req.body.productId;
    await req.user.deleteCartItem(prodId)
    res.redirect('/cart');

  } catch (err) {
    console.log(err)
  }

};

exports.postOrder = async (req, res, next) => {
  try {
    const user = await req.user.populate('cart.items.productId');
    console.log('x')
console.log(user)
    const products = user.cart.items.map((product)=>{
      return {product:{...product.productId._doc},quantity:product.quantity}
      //_doc is used  to store all related data otherwise it will store only object id  
    })

    const order=new Order({ 
      products:products,
      user:{
        name:req.user.name,
        userId:req.user._id
      }

    })

    await order.save()
    await req.user.clearCart();
    res.redirect('/orders')

  } catch (err) {
    console.log(err)

  }

};



exports.getOrders = async (req, res, next) => {

  try {
    const orders = await Order.find({'user.userId':req.user._id})
    res.render('shop/orders', {
      path: '/orders',
      pageTitle: 'Your Orders',
      orders: orders
    });

  } catch (err) {
    console.log(err)
  }


};
