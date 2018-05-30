const bookshelf = require('./bookshelf');

class Category extends bookshelf.Model {
  get tableName() {
    return 'conditions';
  }
  get hasTimestamps() {
    return true;
  }

  items() {
    return this.hasMany('Item', 'condition');
  }
}

module.exports = bookshelf.model('Condition', Condition);
