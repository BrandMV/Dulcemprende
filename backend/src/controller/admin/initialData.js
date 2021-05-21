const Category = require("../../models/category");
const Product = require("../../models/product");

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

exports.initialData = async (req, res) => {
  const categories = await Category.find({}).exec(); //exec retorna una promesa
  const products = await Product.find({})
    .select("_id name  price quantity description productPictures category")
    .exec(); //populate para sacar datos de category
  res.status(200).json({
    categories: createCategories(categories),
    products,
  });
};
