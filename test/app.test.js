const knex = require('../db/knex')
const app = require('../app')
const request = require('supertest')
const expect = require('chai').expect
const stickers = require('./fixtures').stickers
const sticker = require('./fixtures').sticker

describe('CRUD operations on stickers api',()=>{
  before((done) => {
    knex.migrate.latest({})
      .then(() => {
        return knex.seed.run();
      }).then(() => done());
  });
  after((done)=>{
    knex.destroy().then(res= done())
  })

  it('Lists all Records', (done) => {
    request(app)
      .get('/api/v1/stickers')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).to.be.a('array');
        expect(response.body).to.deep.equal(stickers);
        done();
      });
  });
  it('lists sticker by id',(done)=>{
    request(app)
      .get(`/api/v1/stickers/${stickers[0].id}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response=>{
        expect(response.body).to.be.a('object');
        expect(response.body).to.deep.equal(stickers[0]);
        done()  
      })  
  })
  it('create a sticker',(done)=>{
    request(app)
      .post(`/api/v1/stickers`)
      .send(sticker)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response=>{

        const testSticker = {
          ...sticker,
          id:response.body.id 
        }
        expect(response.body).to.be.a('object');
        expect(response.body).to.deep.equal(testSticker);
        done()  
      })
      .catch(err=>console.log(err))  
  })
  it('updates a sticker',(done)=>{
    const testSticker = {
      ...sticker,
      id:4 
    }
    request(app)
      .put(`/api/v1/stickers/${testSticker.id}`)
      .send(sticker)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response=>{
        expect(response.body).to.be.a('object');
        expect(response.body).to.deep.equal(testSticker);
        done()  
      })
      .catch(err=>console.log(err))  
  })
  it('deletes a sticker',(done)=>{
    const testSticker = {
      ...sticker,
      id:4 
    }
    request(app)
      .delete(`/api/v1/stickers/${testSticker.id}`)
      .send(sticker)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response=>{
        expect(response.body).to.be.a('object');
        expect(response.body.delete).to.be.true;
        done()  
      })
      .catch(err=>console.log(err))  
  })
})