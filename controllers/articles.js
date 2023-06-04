import { article } from "../helper/article.js";

export const getArticle = async (req, res) => {
  try {
    res.json({
      success: true,
      statusCode: res.statusCode,
      message: "Article is ready",
      article,
    });
  } catch (error) {
    console.log(error);
  }
};
