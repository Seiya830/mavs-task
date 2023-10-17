import UserService from '../../services/users/UserService.js';
import express from 'express';

// ルーターインスタンスを作成
const router = express.Router();

/**
 * ユーザー新規登録
 */
router.post('/createUser', async (req, res, next) => {
  try {
    // リクエストボディからユーザー名、メールアドレス、パスワードを取得
    const { username, email, password } = req.body;

    // メールアドレスとパスワードが提供されていない場合、400エラーを返す
    if (!email || !password) {
      return res.status(400).json({ error: 'ユーザー名、メールアドレスとパスワードは必須です。' });
    }

    // UserServiceクラスのインスタンスを作成
    const userService = new UserService();

    // UserServiceを使用して新しいユーザーをデータベースに追加
    const newUser = await userService.createUser(username, email, password);

    // 成功時、201ステータスコードと新しいユーザーの情報を返す
    res.status(201).json(newUser);
    
  } catch (error) {
    // 何らかのエラーが発生した場合、500エラーとエラーメッセージを返す
    console.error(error);
    res.status(500).json({ error: 'ユーザー登録中にエラーが発生しました。' });
  }
});

export default router;
