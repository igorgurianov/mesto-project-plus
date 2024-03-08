import mongoose, { ObjectId } from 'mongoose';
import linkValidator from '../utils/validators';

export interface ICard {
  name: string,
  link: string,
  owner: mongoose.Types.ObjectId,
  likes?: ObjectId[],
  createdAt?: Date
}

const cardSchema = new mongoose.Schema<ICard>({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    requred: true,
    validate: {
      validator: linkValidator,
      message: 'Неверный формат ссылки',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    default: [],
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model<ICard>('card', cardSchema);
