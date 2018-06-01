const bookshelf = require('./bookshelf');

class User extends bookshelf.Model {
  get tableName() {
    return 'users';
  }
  get hasTimestamps() {
    return true;
  }

  items() {
    return this.hasMany('Item', 'owner');
  }
}

module.exports = bookshelf.model('User', User);
