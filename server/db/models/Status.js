const bookshelf = require('./bookshelf');

class Status extends bookshelf.Model {
  get tableName() {
    return 'statuses';
  }
  get hasTimestamps() {
    return true;
  }

  Items() {
    return this.hasMany('Item', 'status_id');
  }
}

module.exports = bookshelf.model('Status', Status);
