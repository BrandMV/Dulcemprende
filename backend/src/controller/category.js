const Category = require('../models/category')
const slugify = require('slugify')
const shortid = require('shortid')

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
            idpadre: cate.idpadre,
            children: createCategories(categories, cate._id)
        })
    }

    return categoryList
}

exports.addCategory = (req, res) => {

    const categoryObj={
        nombre: req.body.nombre,
        slug: `${slugify(req.body.nombre)}-${shortid.generate()}`,
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

exports.updateCategories = async (req, res) => {

    const {_id, nombre, idpadre, type} = req.body
    const updatedCategories = []
    if(nombre instanceof Array){
        for(let i=0; i<nombre.length; i++){
            const category = {
                nombre: nombre[i],
                type: type[i]
            }
            if(idpadre[i] !== ""){
                category.idpadre = idpadre[i]
            }

            const updatedCategory = await Category.findOneAndUpdate({_id: _id[i]}, category, {new: true})
            updatedCategories.push(updatedCategory)
        }
        return res.status(201).json({updatedCategories: updatedCategories})
    }else{
        const category = {
            nombre,
            type
        }
        if(idpadre !== ""){
            category.idpadre = idpadre

        }
        const updatedCategory = await Category.findOneAndUpdate({_id}, category, {new: true})

        return res.status(201).json({ updatedCategory })

    }

 
}

exports.deleteCategories = async (req, res) => {
    const { ids } = req.body.payload
    const deletedCategories = []
    for(let i=0; i < ids.length; i++){
        const deleteCategory = await Category.findOneAndDelete({_id: ids[i]._id})
        deletedCategories.push(deleteCategory)
    }

    if(deletedCategories.length == ids.length){
        res.status(201).json({ message: 'Categorias eliminadas'})
    }else{
        res.status(400).json({ message: 'Algo salió mal'})
    }
}