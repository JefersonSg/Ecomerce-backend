const Product = require('../models/Product');
const jwt = require('jsonwebtoken');

// Helpers
const getToken = require('../helpers/getToken');
const getUserByToken = require('../helpers/getUserByToken');
const ObjectId = require('mongoose').Types.ObjectId;

module.exports = class ProductController {
  static async create(req, res) {
    const {
      name,
      brand,
      price,
      model,
      sizeP,
      sizeM,
      sizeG,
      sizeGG,
      colorP,
      colorM,
      colorG,
      colorGG,
      amountP,
      amountM,
      amountG,
      amountGG,
    } = req.body;

    const images = req.files;

    if (!name) {
      res.status(422).json({
        message: 'Digite o nome do produto',
      });
      return;
    }

    if (!price) {
      res.status(422).json({
        message: 'Digite o preço do produto',
      });
      return;
    }
    if (!brand) {
      res.status(422).json({
        message: 'Digite a marca do produto',
      });
      return;
    }
    if (!model) {
      res.status(422).json({
        message: 'Digite o modelo do produto',
      });
      return;
    }

    // generate a const stock with all infos products/

    if (!colorP && !colorM && !colorG && !colorGG) {
      res.status(422).json({
        message: 'Digite a cor do produto',
      });
      return;
    }

    if (!amountP && !amountM && !amountG && !amountGG) {
      res.status(422).json({
        message: 'Digite a quantidade em estoque',
      });
      return;
    }
    const stock = {
      sizeP: {
        color: colorP,
        amount: amountP,
      },
      sizeM: {
        color: colorM,
        amount: amountM,
      },
      sizeG: {
        color: colorG,
        amount: amountG,
      },
      sizeGG: {
        color: colorGG,
        amount: amountGG,
      },
    };

    if (images.length === 0) {
      res.status(422).json({
        message: 'A imagem é obrigatoria',
      });
      return;
    }

    // create Product
    const product = new Product({
      name,
      brand,
      price,
      model,
      stock: stock,
      images: [],
    });

    images.map((image) => {
      product.images.push(image.filename);
    });

    try {
      const newProduct = await product.save();
      res.status(200).json({
        message: 'Produco criado com sucesso',
        newProduct,
      });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  static async getAll(req, res) {
    const products = await Product.find().sort('-createdAt');

    if (!products) {
      res.status(200).json({
        message: 'nenhum item encontrado',
      });
    }

    res.status(200).json({
      products,
    });
  }

  static async getProductById(req, res) {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
      res.status(422).json({
        message: 'ID inválido, produto não encontrado',
      });
      return;
    }

    const product = await Product.findById(id);

    if (!product) {
      res.status(422).json({
        message: 'produto não encontrado',
      });
      return;
    }
    res.status(200).json({
      product,
    });
  }

  static async updateProduct(req, res) {
    const id = req.params.id;
    const {
      name,
      brand,
      price,
      model,
      sizeP,
      sizeM,
      sizeG,
      sizeGG,
      colorP,
      colorM,
      colorG,
      colorGG,
      amountP,
      amountM,
      amountG,
      amountGG,
    } = req.body;
    const images = req.files;

    const updateData = {};
    // check if ID exists

    if (!ObjectId.isValid(id)) {
      res.status(422).json({
        message: 'ID inválido, produto não encontrado',
      });
      return;
    }
    // check if Product exists

    const product = await Product.findOne({ _id: id });

    if (!product) {
      res.status(404).json({ message: 'Produto não encontrado!' });
      return;
    }

    // validations
    if (!name) {
      res.status(422).json({ message: 'O nome é obrigatório!' });
      return;
    } else {
      updateData.name = name;
    }

    if (!brand) {
      res.status(422).json({ message: 'A marca é obrigatória!' });
      return;
    } else {
      updateData.brand = brand;
    }

    if (!model) {
      res.status(422).json({ message: 'O modelo é obrigatório!' });
      return;
    } else {
      updateData.model = model;
    }
    if (!price) {
      res.status(422).json({ message: 'O preço é obrigatório!' });
      return;
    } else {
      updateData.price = price;
    }
    if (!colorP && !colorM && !colorG && !colorGG) {
      res.status(422).json({
        message: 'Digite a cor que tem no estoque',
      });
      return;
    }

    if (!amountP && !amountM && !amountG && !amountGG) {
      res.status(422).json({
        message: 'Digite a quantidade que tem no estoque',
      });
      return;
    }
    const stock = {
      sizeP: {
        color: colorP,
        amount: amountP,
      },
      sizeM: {
        color: colorM,
        amount: amountM,
      },
      sizeG: {
        color: colorG,
        amount: amountG,
      },
      sizeGG: {
        color: colorGG,
        amount: amountGG,
      },
    };
    updateData.stock = stock;

    if (images.length > 0) {
      updateData.images = [];
      images.map((image) => {
        updateData.images.push(image.filename);
      });
    }
    console.log(updateData);
    await Product.findByIdAndUpdate(id, updateData);

    res
      .status(200)
      .json({ product, message: 'Produto atualizado com sucesso!' });
  }

  // remove a pet
  static async removeProductById(req, res) {
    const id = req.params.id;

    // check if id is valid
    if (!ObjectId.isValid(id)) {
      res.status(422).json({ message: 'ID inválido!' });
      return;
    }

    // check if Product exists
    const product = await Product.findOne({ _id: id });

    if (!product) {
      res.status(404).json({ message: 'Produto não encontrado!' });
      return;
    }

    try {
      await Product.findByIdAndRemove(id);

      res.status(200).json({ message: 'Produto removido com sucesso!' });
    } catch (err) {
      console.log(err);
    }
  }
};
