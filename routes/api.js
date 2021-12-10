const express = require("express");
const router = express.Router();
const validator = require("./../middlewares/validator");
const Article = require("./../models/articles");

router.get("/articles", async function (req, res) {
  let page = parseInt(req.query.page) || 1;
  let tag = req.query.tag || "";
  let limit = req.query.limit || 2;
  let search = req.query.search || "";
  let sort = req.query.sort || "desc";
  try {
    let articles, articleCount;
    articles =
      (await Article.getAllArticles({ limit, page, search, tag, sort })) || {};
    articleCount = (await Article.getTotalArticles({ search, tag })) || {};
    let totalPages = Math.ceil(articleCount / limit);
    let tagDetails = tag ? await Article.getTagDetails(tag) : {};
    let meta = {
      page,
      totalPages,
      articleCount,
      tag: tagDetails,
    };
    res.json({ meta, articles });
  } catch (e) {
    res.status(404).json({ message: "Page couldn't found" });
  }
});
router.get("/articles/tags", async function (req, res) {
  let article = (await Article.getAllTags()) || {};
  res.json(article);
});
router.get(
  "/articles/:slug",
  validator.getArticleValidator,
  async function (req, res) {
    let article = (await Article.getArticleBySlug(req.body.slug)) || {};
    res.json(article);
  }
);

module.exports = router;
