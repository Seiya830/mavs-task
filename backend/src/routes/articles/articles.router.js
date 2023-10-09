import ArticleService from '../../services/articles/ArticleService.js';
import express from 'express';
import authenticate from '../../middleware/authenticate.js';
import db from '../../models/index.js';

// expressのルーターを初期化
const router = express.Router();
// ArticleServiceのインスタンスを作成
const articleService = new ArticleService();

/**
 * メモ新規登録
 */
router.post('/add', async (req, res, next) => {
  try {
    // リクエストボディからメモデータを取得
    const { title, content, author_id } = req.body;

    // データベースに新しいメモを作成して保存
    const newMemo = await db.Articles.create({
      title,
      content,
      author_id,
    });

    // 新しく作成されたメモを返す
    res.status(201).json(newMemo);
  } catch (error) {
    console.error(error);
    res.status(500).json({});
  }
});

/**
 * すべてのメモを取得
 */
router.get('/get', async (req, res, next) => {
  try {
    // ArticleServiceを使用して、すべてのメモのリストを取得
    const memos = await articleService.getArticleList();
    console.log(memos);
    res.status(200).json(memos);
  } catch (error) {
    console.error(error);
    res.status(500).json({});
  }
});

/**
 * メモ削除
 */
router.delete('/delete/:id', async (req, res, next) => {
  try {
    // リクエストパラメータからメモのIDを抽出
    const { id } = req.params;

    // ArticleServiceを使用して、指定されたIDのメモを削除
    await articleService.deleteArticle(id);
    res.status(200).json({ message: 'メモが正常に削除されました' });
  } catch (error) {
    console.error(error);
    res.status(500).json({});
  }
});

export default router;