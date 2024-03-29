import * as mongoose from 'mongoose';

export const FormSchema = new mongoose.Schema(
  {
    status: String,
    name: String,
    phone: String,
    address: String,
    email: String,
    eventKind: String,
    date: String,
    time: String,
    styleKind: String,
    cerimonial: String,
    guestNumber: Number,
    locationEvent: String,
    locationCerimony: String,
    locationForniture: String,
    pointsComtemplated: String,
    colorsILike: String,
    colorsIDontLike: String,
    whatCantBeMiss: String,
    flowersIlike: String,
    flowersIDontLike: String,
    howDidYouFindUs: String,
    inspirationsPath: String,
    budget: String,
    contract: String,
  },
  { timestamps: true, collection: 'forms' },
);
