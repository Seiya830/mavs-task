import articleService from '../../services/articles/ArticleService.js';
import express from 'express';
import authenticate from '../../middleware/authenticate.js';
import db from '../../models/index.js';

const router = express.Router();

/**
 * メモ新規登録
 */
router.post('/createMemo', authenticate, async (req, res, next) => {
  try {
    // リクエストボディからメモデータを取得
    const { title, body } = req.body;

    // データベースに新しいメモを作成して保存
    const newMemo = await db.Articles.createMemo({
      title,
      body,
    });

    res.status(201).json(newMemo); // 新しく作成されたメモを返す
  } catch (error) {
    console.error(error);
    res.status(500).json({});
  }
});

export default router;
