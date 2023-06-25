const Product = require('../models/product');
const User = require('../models/user')

exports.getProducts = async (req, res, next) => {

  try {
    const products = await Product.fetchAll();
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });

  } catch (err) {
    console.log(err)
  }

  // Product.fetchAll()
  //   .then(products => {
  //     res.render('shop/product-list', {
  //       prods: products,
  //       pageTitle: 'All Products',
  //       path: '/products'
  //     });
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   });
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

  // const prodId = req.params.productId;

  // Product.findById(prodId)
  //   .then(product => {
  //     res.render('shop/product-detail', {
  //       product: product,
  //       pageTitle: product.title,
  //       path: '/products'
  //     });
  //   })
  //   .catch(err => console.log(err));

};

exports.getIndex = async (req, res, next) => {

  try {
    const products = await Product.fetchAll();
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });

  } catch (err) {
    console.log(err)
  }

  // Product.fetchAll()
  //   .then(products => {
  //     res.render('shop/index', {
  //       prods: products,
  //       pageTitle: 'Shop',
  //       path: '/'
  //     });
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   });

};

exports.getCart = async (req, res, next) => {

  try {

    const products = await req.user.getCart();
    console.log(products)
    res.render('shop/cart', {
      path: '/cart',
      pageTitle: 'Your Cart',
      products: products
    });

    
  } catch (err) {
    console.log(err)
  }

  // req.user
  //   .getCart()
  //   .then(cart => {
  //     return cart
  //       .getProducts()
  //       .then(products => {
  //         res.render('shop/cart', {
  //           path: '/cart',
  //           pageTitle: 'Your Cart',
  //           products: products
  //         });
  //       })
  //       .catch(err => console.log(err));
  //   })
  //   .catch(err => console.log(err));
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


  // const prodId = req.body.productId;
  // let fetchedCart;
  // let newQuantity = 1;
  // req.user
  //   .getCart()
  //   .then(cart => {
  //     fetchedCart = cart;
  //     return cart.getProducts({ where: { id: prodId } });
  //   })
  //   .then(products => {
  //     let product;
  //     if (products.length > 0) {
  //       product = products[0];
  //     }

  //     if (product) {
  //       const oldQuantity = product.cartItem.quantity;
  //       newQuantity = oldQuantity + 1;
  //       return product;
  //     }
  //     return Product.findById(prodId);
  //   })
  //   .then(product => {
  //     return fetchedCart.addProduct(product, {
  //       through: { quantity: newQuantity }
  //     });
  //   })
  //   .then(() => {
  //     res.redirect('/cart');
  //   })
  //   .catch(err => console.log(err));
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

exports.postOrder = (req, res, next) => {
  let fetchedCart;
  req.user
    .getCart()
    .then(cart => {
      fetchedCart = cart;
      return cart.getProducts();
    })
    .then(products => {
      return req.user
        .createOrder()
        .then(order => {
          return order.addProducts(
            products.map(product => {
              product.orderItem = { quantity: product.cartItem.quantity };
              return product;
            })
          );
        })
        .catch(err => console.log(err));
    })
    .then(result => {
      return fetchedCart.setProducts(null);
    })
    .then(result => {
      res.redirect('/orders');
    })
    .catch(err => console.log(err));
};

exports.getOrders = (req, res, next) => {
  req.user
    .getOrders({ include: ['products'] })
    .then(orders => {
      res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders',
        orders: orders
      });
    })
    .catch(err => console.log(err));
};
