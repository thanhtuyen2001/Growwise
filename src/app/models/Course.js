const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const Course = new Schema(
  {
    name: { type: String, maxLength: 150, required: true, minLength: 1 },
    description: { type: String },
    image: { type: String },
    videoId: { type: String, maxLength: 600 },
    level: { type: String, maxLength: 600 },
    slug: { type: String, slug: 'name', unique: true },
  },
  {
    timestamps: true,
  },
);

// add plugin
mongoose.plugin(slug);
Course.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: 'all',
});

module.exports = mongoose.model('Course', Course);
// mongoose will convert ModelName into the snakecase pattern + in form of plural
