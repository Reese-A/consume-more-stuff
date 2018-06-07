const bookshelf = require('./bookshelf');

class Verify extends bookshelf.Model {
  get tableName() {
    return 'verify';
  }
  get hasTimestamps() {
    return true;
  }

  user() {
    return this.belongsTo('User', 'user_id');
  }
}

module.exports = bookshelf.model('Verify', Verify);
