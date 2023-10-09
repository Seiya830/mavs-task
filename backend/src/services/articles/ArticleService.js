import db from '../../models/index.js';

// クラス
class ArticleService {
  /**
   * 記事一覧取得
   * @return articles
   */

  async getArticleList() {
      try {
        // データベースからすべての記事を検索し、それを返す
        return await db.Articles.findAll();
      } catch (error) {
        console.error(error);
        throw new Error("メモを取得できませんでした");
      }
  }

  /**
   * 記事削除
   * @param {number} id - 削除したい記事のID
   *  @return {number} result - 削除されたレコードの数（削除に成功すれば1、失敗すれば0）
   */

  async deleteArticle(id) {
    try {
      // 指定されたIDの記事をデータベースから削除
      const result = await db.Articles.destroy({
          where: { id: id }
      });

      // 削除した記事がデータベースに存在しない場合、エラーを表示
      if (result === 0) {
          throw new Error("指定されたIDのメモが存在しない、または既に削除されています");
      }

      // 削除に成功した場合、削除されたレコードの数を返す
      return result;
    } catch (error) {
      // エラー発生時にはエラー内容をコンソールに表示
      console.error(error);
      // エラーメッセージを表示
      throw new Error("メモの削除に失敗しました");
    }
}

}

export default ArticleService;
