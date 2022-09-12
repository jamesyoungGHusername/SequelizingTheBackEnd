const router = require('express').Router();
const sequelize = require('sequelize');
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try{
    const categories = await Category.findAll({
      include:[{model:Product}],
    });
    res.status(200).json(categories);
  } catch (err){
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try{
    const categories = await Category.findByPk(req.params.id,{
      include:[{model:Product}],
    });

    if(!categories){
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }
    res.status(200).json(categories);
  }catch (err){
    res.status(500).json(err);
  }
});

router.post('/', async  (req, res) => {
  try{
    const category = await Category.create({
      category_name:req.body.category_name,
    });
    res.status(200).json(category);
  }catch (err){
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try{
    const category = Category.update(
      {category_name:req.body.category_name},
      {where: {id:req.params.id}}
    );
    res.status(200).json({message:"updated"});
  }catch (err){
    res.status(500).json(err);
  }
  // update a category by its `id` value
});

router.delete('/:id', async (req, res) => {
  try{
    const category = await Category.destroy({
      where:{
        id: req.params.id
      }
    });
    if(!category){
      res.status(404).json({message:"no category found with that id"});
      return;
    }
    res.status(200).json(category);
  }catch (err){
    res.status(500).json(err);
  }
  // delete a category by its `id` value
});

module.exports = router;
