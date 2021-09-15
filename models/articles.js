const mongoose = require("mongoose");
const articlesSchema = new mongoose.Schema({
  _id: mongoose.ObjectId,
  name: String,
  slug: String,
  content: String,
});
const articles = mongoose.model("articles", articlesSchema);
module.exports = {
  async getArticleBySlug(slug) {
    let article = await articles.findOne({ slug: slug }).exec();
    return article;
  },
};
