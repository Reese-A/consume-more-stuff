const bookshelf = require('./bookshelf');

class Item extends bookshelf.Model {
  get tableName() {
    return 'items';
  }
  get hasTimestamps() {
    return true;
  }

  condition() {
    return this.belongsTo('Condition', 'condition_id');
  }

  category() {
    return this.belongsTo('Category', 'category_id');
  }

  status() {
    return this.belongsTo('Status', 'status_id');
  }

  owner() {
    return this.belongsTo('User', 'owner');
  }
}

module.exports = bookshelf.model('Item', Item);
