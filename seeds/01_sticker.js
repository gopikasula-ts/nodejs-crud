const stickers = require('../stickers')
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('sticker').truncate()
    .then( ()=> {
      // Inserts seed entries
      return knex('sticker').insert(stickers);
    });
};
