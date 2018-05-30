const bookshelf = require('./bookshelf');

class Category extends bookshelf.Model {
  get tableName() {
    return 'conditions';
  }
  get hasTimestamps() {
    return true;
  }

  items() {
    return this.hasMany('Item', 'condition_id');
  }
}

module.exports = bookshelf.model('Condition', Condition);
