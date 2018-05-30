const bookshelf = require('./bookshelf');

class Item extends bookshelf.Model {
  get tableName() {
    return 'items';
  }
  get hasTimestamps() {
    return true;
  }

  condition() {
    return this.belongsTo('Condition', 'condition');
  }

  category() {
    return this.belongsTo('Category', 'category');
  }

  status() {
    return this.belongsTo('Status', 'status');
  }

  owner() {
    return this.belongsTo('User', 'owner');
  }
}

module.exports = bookshelf.model('Item', Item);
