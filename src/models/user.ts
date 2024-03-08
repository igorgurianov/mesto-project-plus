import mongoose, { Model, Document } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';

export interface IUser {
  name: string,
  about: string,
  avatar: string,
  email: string,
  password: string
}

interface UserModel extends Model<IUser> {
  // eslint-disable-next-line no-unused-vars
  findUserByCredentials: (email: string, password: string) => Promise<Document<unknown, any, IUser>>
}

const userSchema = new mongoose.Schema<IUser>({
  name: {
    type: String,
    minlength: [2, 'Поле "Имя" должно содержать от 2 до 30 символов'],
    maxlength: [30, 'Поле "Имя"должно содержать от 2 до 30 символов'],
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: [2, 'Поле "О себе" должно содержать от 2 до 200 символов'],
    maxlength: [200, 'Поле "О себе" должно содержать от 2 до 200 символов'],
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: (url: string) => {
        const regex = /^(https?):\/\/[^\s/$.?#].[^\s]*$/;
        return regex.test(url);
      },
      message: 'Неправильный формат ссылки',
    },
  },
  email: {
    type: String,
    required: [true, 'Не заполнено поле email'],
    unique: true,
    validate: {
      validator: (email: string) => validator.isEmail(email),
      message: 'Неправильный формат почты',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.static('findUserByCredentials', function
findUserByCredentials(email: string, password: string) {
  return this.findOne({ email })
    .select('+password')
    .then((user: IUser) => {
      if (!user) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }
      return bcrypt.compare(password, user.password)
        .then((mathed) => {
          if (!mathed) {
            return Promise.reject(new Error('Неправильные почта или пароль'));
          }
          return user;
        });
    });
});

export default mongoose.model<IUser, UserModel>('user', userSchema);
