import express from "express";
import {
  addArticle,
  deleteArticle,
  editArticle,
  getAllArticles,
} from "../controller/article.controller";

const articleRouter = express.Router();

articleRouter.post("/add-article", addArticle);
articleRouter.put("/edit-article", editArticle);
articleRouter.get("", getAllArticles);
articleRouter.delete("/delete-article", deleteArticle);

export default articleRouter;
