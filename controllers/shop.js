const Product = require('../models/product');
// const User = require('../models/user')

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

    const products=user.cart.items;
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
  try{
    const prodId = req.body.productId;
    await req.user.deleteCartItem(prodId)
    res.redirect('/cart');

  }catch(err){
    console.log(err)
  }
  
};

exports.postOrder = async (req, res, next) => {
  try{
 await req.user.addOrder();
 res.redirect('/orders');

  }catch(err){
    console.log(err)

  }

};



exports.getOrders = async (req, res, next) => {

  try{
   const orders= await req.user.getOrders()
   res.render('shop/orders', {
          path: '/orders',
          pageTitle: 'Your Orders',
          orders: orders
        });
        
  }catch(err){
    console.log(err)
  }


};
