const mongoose = require("mongoose");
const articlesSchema = new mongoose.Schema({
  _id: mongoose.ObjectId,
  name: String,
  slug: String,
  content: String,
  read: String,
  image: String,
  created: Date,
});
const articles = mongoose.model("articles", articlesSchema);
module.exports = {
  async getArticleBySlug(slug) {
    let article = await articles.findOne({ slug: slug }).exec();
    return article;
  },
  async getArticleById(id) {
    let article = await articles.findOne({ _id: id }).exec();
    return article;
  },
  async getAllArticles(limit = 20, page = 1, query = "") {
    let article = await articles
      .find()
      .sort({ _id: "desc" })
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();
    return article;
  },
  async getTotalArticles() {
    let articleCount = await articles.countDocuments();
    return articleCount;
  },
};
