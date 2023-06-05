const { Schema, model } = require('mongoose');

const { enums } = require('../constants');

const catSchema = Schema(
  {
    name: {
      type: String,
      required: [true, 'Set cat name'],
    },
    age: {
      type: Number,
      required: [true, 'Set cat age'],
    },
    gender: {
      type: String,
      enum: Object.values(enums.GENDERS_ENUM),
      default: enums.GENDERS_ENUM.FEMALE,
    },
    color: {
      type: String,
      enum: Object.values(enums.COLORS_ENUM),
      default: enums.COLORS_ENUM.TABBY,
    },
    temperament: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(enums.STATUS_ENUM),
      default: enums.STATUS_ENUM.HOMELESS,
    },
    photo: {
      type: String,
      default: null,
    },
    location: {
      type: String,
      enum: Object.values(enums.CITY_ENUM),
      default: enums.CITY_ENUM.KYIV,
    },
  },
  { versionKey: false, timestamps: true }
);

const Cat = model('cat', catSchema);

module.exports = Cat;
