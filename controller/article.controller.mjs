import articleModel from "../model/article.model.mjs";

export const addArticle = async (req, res) => {
  try {
    const { title, description, category } = req.body;
    const { authorization } = req.headers;

    const userData = JSON.parse(atob(authorization.split(".")[1]));

    const articleData = new articleModel({
      title,
      description,
      category,
      email: userData.email,
    });

    articleData.save();

    if (articleData) {
      return res.status(200).json({
        message: "Article added successfully!",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const editArticle = async (req, res) => {
  try {
    const { title, description, category, id } = req.body;

    const { authorization } = req.headers;

    const userData = JSON.parse(atob(authorization.split(".")[1]));

    const articleData = await articleModel.updateOne(
      { email: userData.email, _id: id },
      { $set: { title, description, category } }
    );

    if (articleData.acknowledged) {
      res.status(200).json({
        message: "Article updated successfully!",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getAllArticles = async (req, res) => {
  try {
    const articleData = await articleModel.find();

    return res.status(200).json({
      data: articleData,
      message: "Articles found successfully.",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteArticle = async (req, res) => {
  try {
    const { id } = req.query;
    const { authorization } = req.headers;

    const userData = JSON.parse(atob(authorization.split(".")[1]));

    const articleData = await articleModel.deleteOne({
      _id: id,
      email: userData.email,
    });

    if (articleData.acknowledged) {
      return res.status(200).json({
        message: "Deleted article successfully.",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getUserArticles = async (req, res) => {
  try {
    const { authorization } = req.headers;
    const { id } = req.query;

    const userData = JSON.parse(atob(authorization.split(".")[1]));

    let criteria = { email: userData.email };

    if (id) {
      criteria = { ...criteria, _id: id };
    }
    const articleData = await articleModel.find(criteria);

    return res.status(200).json({
      data: articleData,
      message: "Articles found successfully.",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
