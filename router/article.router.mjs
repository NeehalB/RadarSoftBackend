import express from "express";
import {
  addArticle,
  deleteArticle,
  editArticle,
  getAllArticles,
  getUserArticles,
} from "../controller/article.controller.mjs";

const articleRouter = express.Router();

articleRouter.post("/add-article", addArticle);
articleRouter.get("/get-user-articles", getUserArticles);
articleRouter.get("/get-user-articles", getUserArticles);
articleRouter.put("/edit-article", editArticle);
articleRouter.get("", getAllArticles);
articleRouter.delete("/delete-article", deleteArticle);

export default articleRouter;
