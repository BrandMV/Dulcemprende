const Category = require('../models/category')
const slugify = require('slugify')

function createCategories(categories, idpadre = null){

    const categoryList = []
    let category
    if(idpadre == null){
        category = categories.filter(cat => cat.idpadre == undefined)
    }else{
        category = categories.filter(cat => cat.idpadre == idpadre)
    }

    for(let cate of category){
        categoryList.push({
            _id: cate._id,
            nombre: cate.nombre,
            slug: cate.slug,
            children: createCategories(categories, cate._id)
        })
    }

    return categoryList
}

exports.addCategory = (req, res) => {

    const categoryObj={
        nombre: req.body.nombre,
        slug: slugify(req.body.nombre),
    }

    if(req.file){
        categoryObj.categoryImage = process.env.API + '/public/' + req.file.filename
    }
    if(req.body.idpadre){
        categoryObj.idpadre = req.body.idpadre
    }

    const cat = new Category(categoryObj)
    cat.save((error, category) => {
        if(error) return res.status(400).json({ error })
        if(category) return res.status(201).json({ category })

    })
}

exports.getCategories = (req, res) => {
    Category.find({}).exec((error, categories) => {
        if(error) return res.status(400).json({ error })

        if(categories){

            const categoryList = createCategories(categories)
            res.status(200).json({categoryList})
        }
    })
}