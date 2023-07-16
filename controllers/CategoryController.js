const Category = require('../models/Categorys');

const ObjectId = require('mongoose').Types.ObjectId;

module.exports = class CategoryController {
  static async createCategory(req, res) {
    const categoria = req.body.Category;
    const image = req.file;

    console.log(req.file);
    if (!categoria) {
      res.status(422).json({
        message: 'Informe a categoria que deseja adicionar',
      });
      return;
    }
    if (!image) {
      res.status(422).json({
        message: 'A imagem é obrigatoria',
      });
      return;
    }

    // create Category
    const category = new Category({
      Category: categoria,
      image: image.filename,
    });

    try {
      const newCategory = await category.save();
      res.status(200).json({
        message: 'Categoria criada com sucesso',
        newCategory,
      });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  static async getAll(req, res) {
    const categorys = await Category.find().sort('-createdAt');

    if (!categorys) {
      res.status(422).json({
        message: 'Nenhuma categoria foi encontrada',
      });
      return;
    }

    try {
      res.status(200).json({
        categorys,
      });
      return;
    } catch (error) {
      res.status(500).json({ message: error });
      return;
    }
  }

  static async getCategoryById(req, res) {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
      res.status(422).json({
        message: 'ID inválido, Categoria não encontrada',
      });
      return;
    }

    const category = await Category.findById(id);

    if (!category) {
      res.status(422).json({
        message: 'Categoria não encontrada',
      });
      return;
    }
    res.status(200).json({
      category,
    });
  }

  static async updateCategory(req, res) {
    const id = req.params.id;

    const categoria = req.body.Category;
    const image = req.file;

    const updateData = {};

    if (!ObjectId.isValid(id)) {
      res.status(422).json({
        message: 'ID inválido, Categoria não encontrada',
      });
      return;
    }

    const category = await Category.findById(id);

    if (!category) {
      res.status(422).json({
        message: 'Categoria não encontrada',
      });
      return;
    }

    // Validations
    if (!categoria) {
      res.status(422).json({ message: 'A categoria é obrigatória!' });
      return;
    } else {
      updateData.Category = categoria;
    }

    if (req.file) {
      updateData.image = image.filename;
    }

    await Category.findByIdAndUpdate(id, updateData);

    res
      .status(200)
      .json({ category, message: 'Categoria atualizada com sucesso!' });
  }
  static async deleteCategory(req, res) {
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
      res.status(422).json({ message: 'ID inválido!' });
      return;
    }

    const category = await Category.findOne({ _id: id });
    if (!category) {
      res.status(404).json({ message: 'Categoria não encontrada!' });
      return;
    }

    try {
      await Category.findByIdAndRemove(id);

      res.status(200).json({ message: 'Categoria removida com sucesso!' });
    } catch (err) {
      console.log(err);
    }
  }
};
