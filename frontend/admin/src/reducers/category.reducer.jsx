import { categoryConstants } from "../actions/constants";

const initState = {
  categories: [],
  loading: false,
  error: null,
};

const buildNewCategories = (idpadre, categories, category) => {
  let myCategories = [];

    if(idpadre == undefined){
        return [
            ...categories,
            {
                _id: category._id,
                nombre: category.nombre,
                slug: category.slug,
                children: []
            }
        ]
    }

  for (let cat of categories) {
    if (cat._id == idpadre) {
      myCategories.push({
        ...cat,
        children:
          cat.children
            ? buildNewCategories(idpadre, [...cat.children, {
                _id: category._id,
                nombre: category.nombre,
                slug: category.slug,
                idpadre: category.idpadre,
                children: category.children
            }], category)
            : [],
      });
    } else {
      myCategories.push({
        ...cat,
        children:
          cat.children
            ? buildNewCategories(idpadre, cat.children, category)
            : [],
      });
    }
  }

  return myCategories;
};

export default (state = initState, action) => {
  switch (action.type) {
    case categoryConstants.GET_ALL_CATEGORIES_SUCCESS:
      state = {
        ...state,
        categories: action.payload.categories,
      };

      break;
    case categoryConstants.ADD_NEW_CATEGORY_REQUEST:
      state = {
        ...state,
        loading: true,
      };

      break;
    case categoryConstants.ADD_NEW_CATEGORY_SUCCESS:
        const category = action.payload.category
      const updatedCategories = buildNewCategories(
        category.idpadre,
        state.categories,
        category
      );
      state = {
        ...state,
        categories: updatedCategories,
        loading: false,
      };

      break;
    case categoryConstants.ADD_NEW_CATEGORY_FAILURE:
      state = {
        ...initState,
      };

      break;
  }

  return state;
};
