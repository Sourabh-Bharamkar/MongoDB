const Product = require('../models/product');
const mongoDb = require('mongodb')

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};


exports.postAddProduct = async (req, res, next) => {

  try {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    const product = new Product(title, price, description, imageUrl, null, req.user._id)
    await product.save();
    console.log('Created Product');
    res.redirect('/admin/products');

  } catch (err) {
    console.log(err)
  }

  // const title = req.body.title;
  // const imageUrl = req.body.imageUrl;
  // const price = req.body.price;
  // const description = req.body.description;
  // const product = new Product(title, price, description, imageUrl, null, req.user._id)
  // product.save()
  //   .then(result => {
  //     // console.log(result);
  //     console.log('Created Product');
  //     res.redirect('/admin/products');
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   });

};


exports.getEditProduct = async (req, res, next) => {
  try {

    const editMode = req.query.edit;
    if (!editMode) {
      return res.redirect('/');
    }
    const prodId = req.params.productId;
    const product = await Product.findById(prodId)

    if (!product) {
      return res.redirect('/');
    }

    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,
      product: product
    });


  } catch (err) {
    console.log(err)
  }


  // const editMode = req.query.edit;
  // if (!editMode) {
  //   return res.redirect('/');
  // }
  // const prodId = req.params.productId;
  // Product.findById(prodId)
  //   .then(product => {
  //     if (!product) {
  //       return res.redirect('/');
  //     }
  //     res.render('admin/edit-product', {
  //       pageTitle: 'Edit Product',
  //       path: '/admin/edit-product',
  //       editing: editMode,
  //       product: product
  //     });
  //   })
  //   .catch(err => console.log(err));

};

exports.postEditProduct = async (req, res, next) => {

  try {

    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedImageUrl = req.body.imageUrl;
    const updatedDesc = req.body.description;

    const product = new Product(updatedTitle, updatedPrice, updatedDesc, updatedImageUrl, prodId, req.user._id)

    await product.save();
    console.log('UPDATED PRODUCT!');
    res.redirect('/admin/products');

  } catch (err) {

    console.log(err)

  }

  // const prodId = req.body.productId;
  // const updatedTitle = req.body.title;
  // const updatedPrice = req.body.price;
  // const updatedImageUrl = req.body.imageUrl;
  // const updatedDesc = req.body.description;

  // const product = new Product(updatedTitle, updatedPrice, updatedDesc, updatedImageUrl, prodId, req.user._id)

  // product.save()
  //   .then(result => {
  //     console.log('UPDATED PRODUCT!');
  //     res.redirect('/admin/products');
  //   })
  //   .catch(err => console.log(err));
};


exports.getProducts = async (req, res, next) => {

  try {
    console.log('hey')
    const products = await Product.fetchAll();
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  } catch (err) {
    console.log(err)
  }


  // Product.fetchAll()
  //   .then(products => {
  //     res.render('admin/products', {
  //       prods: products,
  //       pageTitle: 'Admin Products',
  //       path: '/admin/products'
  //     });
  //   })
  //   .catch(err => console.log(err));
};

exports.postDeleteProduct = async (req, res, next) => {

  try {
    const prodId = req.body.productId;
    await Product.deleteById(prodId)
    console.log('DESTROYED PRODUCT');
    res.redirect('/admin/products');
  } catch (err) {
    console.log(err)
  }


  // const prodId = req.body.productId;
  // Product.deleteById(prodId)
  //   .then(() => {
  //     console.log('DESTROYED PRODUCT');
  //     res.redirect('/admin/products');
  //   })
  //   .catch(err => console.log(err));


};
