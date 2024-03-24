import articleModel from "../model/article.model.ts";

export const addArticle = async (req: any, res: any) => {
  try {
    const { title, description, category } = req.body;
    const { authorization } = req.headers;

    const userData = JSON.parse(atob(authorization.split(".")[1]));
    console.log(title, description, category, userData.email);

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
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const editArticle = async (req: any, res: any) => {
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
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getAllArticles = async (req: any, res: any) => {
  try {
    const articleData = await articleModel.find();

    return res.status(200).json({
      data: articleData,
      message: "Articles found successfully.",
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteArticle = async (req: any, res: any) => {
  try {
    const { id } = req.body;
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
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};
