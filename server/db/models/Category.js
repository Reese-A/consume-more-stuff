const bookshelf = require('./bookshelf');

class Category extends bookshelf.Model {
  get tableName() {
    return 'categories';
  }
  get hasTimestamps() {
    return true;
  }

  Items() {
    return this.hasMany('Item', 'category');
  }
}

module.exports = bookshelf.model('Category', Category);
