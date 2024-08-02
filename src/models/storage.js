import mongoose from 'mongoose';

const storageSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true
  },
  filename: {
    type: String,
    required: true
  }
});

export const Storage = mongoose.model('Storage', storageSchema);