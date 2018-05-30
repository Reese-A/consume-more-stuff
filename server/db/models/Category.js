const bookshelf = require('./bookshelf');

class Category extends bookshelf.Model {
  get tableName() {
    return 'categories';
  }
  get hasTimestamps() {
    return true;
  }

  Items() {
    return this.hasMany('Item', 'category_id');
  }
}

module.exports = bookshelf.model('Category', Category);
