const express = require("express");
const router = express.Router();
const validator = require("./../middlewares/validator");
const Article = require("./../models/articles");

router.get(
  "/articles/:slug",
  validator.getArticleValidator,
  async function (req, res) {
    let article = (await Article.getArticleBySlug(req.body.slug)) || {};
    res.json(article);
  }
);

router.get("/articles", async function (req, res) {
  let page = parseInt(req.query.page) || 1;
  let limit = 5;
  try {
    let articles = (await Article.getAllArticles(limit, page)) || {};
    let articleCount = (await Article.getTotalArticles()) || 0;
    let totalPages = Math.ceil(articleCount / limit);
    let nextPageUrl =
      page >= totalPages ? null : "/api/articles?page=" + (page + 1);
    let prevPageUrl = page <= 1 ? null : "/api/articles?page=" + (page - 1);
    let firstPageUrl = "/api/articles";
    let lastPageUrl =
      totalPages == 1 ? "/api/articles" : "/api/articles?page=" + totalPages;
    let meta = {
      nextPageUrl,
      prevPageUrl,
      firstPageUrl,
      lastPageUrl,
      page,
      totalPages,
    };
    if (articles.length) res.json({ meta, articles });
    else throw new Error("404");
  } catch (e) {
    res.status(404).json({ message: "Page couldn't found" });
  }
});

module.exports = router;
