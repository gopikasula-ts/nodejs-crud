const knex = require('./knex')

module.exports = {
    getAll(){
        return knex('sticker')
    },
    getSticker(id){
        return knex('sticker').where('id',id).first()
    },
    create(sticker){
        return knex('sticker').insert(sticker).then(id=>knex('sticker').where('id',id[0]))
    },
    update(id,sticker){
        return knex('sticker').where('id',id).update(sticker).then(()=>knex('sticker').where('id',id))
    },
    delete(id){
        return knex('sticker').where('id',id).delete()
    }
}