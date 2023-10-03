import articleService from '../../services/articles/ArticleService.js';
import express from 'express';
import authenticate from '../../middleware/authenticate.js';
import db from '../../models/index.js';

const router = express.Router();

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

export default router;
