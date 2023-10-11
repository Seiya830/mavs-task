import db from '../../models/index.js';

// クラス
class ArticleService {
  /**
   * 記事一覧取得
   * @return articles
   */

  async getArticleList() {
      try {
        // データベースからすべての記事を取得
        return await db.Articles.findAll();
      } catch (error) {
        console.error(error);
        throw new Error("メモを取得できませんでした");
      }
  }

  /**
   * 記事削除
   * @param {number} id 削除したい記事のID
   *  @return {number} 削除に成功すれば1、失敗すれば0を返す
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

/**
 * 記事編集
 * @param {number} id 編集したい記事のID
 * @param {object} data 更新したい内容
 * @return {object} article 更新された記事
 */

async editArticle(id, data) {
  try {
    // IDに基づいて記事を検索
    const article = await db.Articles.findByPk(id);
    // 編集対象の記事が存在しない場合のチェック
    if (!article) {
      throw new Error("指定されたIDのメモが存在しません");
    }

    // 記事内容を更新
    await article.update(data);
    return article;
  } catch (error) {
    console.error(error);
    throw new Error("メモの編集に失敗しました");
  }
}

}

export default ArticleService;
