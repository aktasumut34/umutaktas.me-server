const mongoose = require("mongoose");

const articlesSchema = new mongoose.Schema({
  _id: mongoose.ObjectId,
  name: String,
  slug: String,
  content: String,
  read: String,
  image: String,
  created: Date,
  tags: [{ name: String, slug: String }],
});

const articles = mongoose.model("articles", articlesSchema);

module.exports = {
  async getArticleBySlug(slug) {
    let article = await articles.findOne({ slug: slug }).exec();
    return article;
  },
  async getAllTags() {
    let tags = await articles.distinct("tags");
    return tags;
  },
  async getTagDetails(slug) {
    let article = await articles.findOne({
      tags: { $elemMatch: { slug: slug } },
    });
    tag = article.tags.find((o) => o.slug === slug) || {
      name: "-",
      background: "#000",
      foreground: "#fff",
      slug: "?",
    };
    return tag;
  },
  async getArticleById(id) {
    let article = await articles.findOne({ _id: id }).exec();
    return article;
  },
  async getAllArticles({
    limit = 2,
    page = 1,
    sort = "desc",
    search = "",
    tag = "",
  } = {}) {
    limit = parseInt(limit);
    let article = [];
    if (search !== "") {
      article = await articles
        .find({
          $or: [
            { name: { $regex: ".*" + search + ".*", $options: "i" } },
            {
              tags: { $elemMatch: { slug: { $regex: ".*" + search + ".*" } } },
            },
          ],
        })
        .sort({ _id: sort })
        .skip((page - 1) * limit)
        .limit(limit)
        .exec();
    } else if (tag !== "") {
      article = await articles
        .find({
          tags: { $elemMatch: { slug: { $regex: ".*" + tag + ".*" } } },
        })
        .sort({ _id: sort })
        .skip((page - 1) * limit)
        .limit(limit)
        .exec();
    } else {
      article = await articles
        .find()
        .sort({ _id: sort })
        .skip((page - 1) * limit)
        .limit(limit)
        .exec();
    }
    return article;
  },
  async getTotalArticles({ search = "", tag = "" } = {}) {
    let articleCount = await articles
      .find({
        name: { $regex: ".*" + search + ".*", $options: "i" },
        tags: { $elemMatch: { slug: { $regex: ".*" + tag + ".*" } } },
      })
      .countDocuments();
    return articleCount;
  },
};
