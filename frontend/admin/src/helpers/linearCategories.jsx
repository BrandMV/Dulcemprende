const linearCategories = (categories, options = []) => {
    for (let category of categories) {
      options.push({
        _id: category._id,
        value: category._id,
        name: category.nombre,
        idpadre: category.idpadre,
        type: category.type
      });
      if (category.children.length > 0) {
        linearCategories(category.children, options);
      }
    }

    return options;
  };

  export default linearCategories