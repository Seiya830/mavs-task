// import nanoid from 'nanoid';
import db from '../../models/index.js';
import AuthService from '../auth/AuthService.js';

const authService = new AuthService();

// クラス
class UserService {
  /**
   * ユーザー情報取得
   * @param ユーザーID
   * @return ユーザー情報
   */
  async getUser(user_id) {
    // ユーザーIDをキーにユーザー情報を取得する
    const rows = await db.Users.findOne({ where: { id: user_id } });
    console.log(rows.dataValues);
    // 取得したデータを返却形式に整形して格納し返却する
    const resData = {
      id: rows.dataValues.id,
      name: rows.dataValues.name,
      email: rows.dataValues.email,
    };
    return resData;
  }
  /**
   * ユーザー情報検索
   * @param 検索条件
   * @return ユーザー情報リスト
   */
  async searchUser(id, name, email, password) {
    const where = {};
    // IDが指定されている場合はIDを条件へ追加する
    if (id) {
      where.id = id;
    }
    // 名前が指定されている場合は名前を条件へ追加する
    if (name) {
      where.name = name;
    }
    // メールアドレスが指定されている場合はメールアドレスを条件へ追加する
    if (email) {
      where.email = email;
    }
    // パスワードが指定されている場合はパスワードを条件へ追加する
    if (password) {
      const hash_password = authService.hashSha256(password);
      where.password = hash_password;
    }

    // 検索実行
    const rows = await db.Users.findAll({ where });

    // 取得したデータを返却形式に整形して格納し返却する
    const resDataList = [];
    for (const row of rows) {
      const resData = {
        id: row.dataValues.id,
        name: row.dataValues.name,
        email: row.dataValues.email,
      };
      // 返却用リストへ格納する
      resDataList.push(resData);
    }

    return resDataList;
  }

  /**
   * ユーザー新規登録
   * 
   * @param {string} username - ユーザー名
   * @param {string} email - メールアドレス
   * @param {string} password - パスワード
   * @return {object} - 新しく作成されたユーザーの情報
   */
  async createUser(username, email, password) {
    // パスワードをハッシュ化
    const hashedPassword = authService.hashSha256(password);
    // データベースに新しいユーザーを追加
    const newUser = await db.Users.create({
      name: username,
      email,
      password: hashedPassword
    });
    // 新しく作成されたユーザーの情報を返却
    return {
      id: newUser.dataValues.id,
      name: newUser.dataValues.name, 
      email: newUser.dataValues.email
    };
  }
}

export default UserService;
