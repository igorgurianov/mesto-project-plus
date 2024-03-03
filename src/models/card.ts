import mongoose, { ObjectId } from 'mongoose';

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
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  }],
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

export default mongoose.model<ICard>('card', cardSchema);
