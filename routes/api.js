const express = require("express");
const router = express.Router();
const validator = require("./../middlewares/validator");
const Article = require("./../models/articles");

router.get(
  "/articles/:slug",
  validator.getArtticleValidator,
  async function (req, res) {
    let article = (await Article.getArticleBySlug(req.body.slug)) || {};
    res.json(article);
  }
);

module.exports = router;
