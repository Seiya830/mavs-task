import db from '../../models/index.js';

// クラス
class ArticleService {
  /**
   * 記事一覧取得
   * @return articles
   */

  async getArticleList() {
      try {
        // データベースからすべてのメモを検索し、それを返す
        return await db.Articles.findAll();
      } catch (error) {
        console.error(error);
        throw new Error("メモを取得できませんでした");
      }
  }
}

export default ArticleService;
