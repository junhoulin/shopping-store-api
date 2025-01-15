import { v4 as uuidv4 } from 'uuid';

// 定義使用者的結構
interface User {
  name: string;
  password: string;
  id: string;
}

class UserModal {
  private users: User[];
  constructor() {
    this.users = [
      {
        name: 'abx123456',
        password: 'sdssdsddsd',
        id: uuidv4()
      }
    ];
  }
  getALL() {
    return this.users;
  }

  created(user: string, password: string): User {
    const newUser = {
      name: user,
      password: password,
      id: uuidv4()
    };
    this.users.push(newUser);
    return newUser;
  }
}

export default new UserModal();

