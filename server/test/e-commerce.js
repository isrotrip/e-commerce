const chai = require('chai');
const chaiHttp = require('chai-http');
const {expect} = chai;
const mongoose = require('mongoose');

const app = require('../src/app');

let adminLoginToken = '';
let customerLoginToken = '';
let itemId = '';
let cartId = '';


chai.use(chaiHttp);

before(function (done) {
  mongoose.connect('mongodb://localhost:27017/e-commerce-development',function(){
    mongoose.connection.db.dropDatabase();
    done();
  });
});

describe('REGISTER USER TEST', () => {
  describe('success test:', () => {
    it('Should make sure that customers must be register /user/register with POST request', function(done) {
      const user = {
        name: 'adip',
        email: 'adip@mail.com',
        password: '12345'
      }
      chai
        .request(app)
        .post('/user/register')
        .send(user)
        .end(function(err, res){
          expect(err).to.be.null;
          expect(res).to.have.status(201);
          expect(res.body.message).to.be.equal(`${user.email} have been registered successfully`);
          done();
        })
    })
    it('Should make sure that admin must be register /user/registerAdminSecretRoute with POST request', function(done) {
      const user = {
        name: 'ilham',
        email: 'ilham@mail.com',
        password: '12345'
      }
      chai
        .request(app)
        .post('/user/registerAdminSecretRoute')
        .send(user)
        .end(function(err, res){
          expect(err).to.be.null;
          expect(res).to.have.status(201);
          expect(res.body.message).to.be.equal(`${user.email} have been registered successfully`);
          done();
        })
    })
  })
  describe('fail test:', () => {
    it('Should make sure that somebody can\'t be register if email has been taken /user/register with POST request', function(done) {
      const user = {
        name: 'adip',
        email: 'adip@mail.com',
        password: '12345'
      }
      chai
        .request(app)
        .post('/user/register')
        .send(user)
        .end(function(err, res){
          expect(err).to.be.null;
          expect(res).to.have.status(500);
          expect(res.body.error).to.be.equal(`User validation failed: email: email had been taken`);
          done();
        })
    })
    it('Should make sure that somebody can\'t be register if name empty /user/register with POST request', function(done) {
      const user = {
        name: '',
        email: 'isro@mail.com',
        password: '12345'
      }
      chai
        .request(app)
        .post('/user/register')
        .send(user)
        .end(function(err, res){
          expect(err).to.be.null;
          expect(res).to.have.status(500);
          expect(res.body.error).to.be.equal(`User validation failed: name: Please Input Your Name`);
          done();
        })
    })
    it('Should make sure that somebody can\'t be register if name empty /user/register with POST request', function(done) {
      const user = {
        name: 'isro',
        email: '',
        password: '12345'
      }
      chai
        .request(app)
        .post('/user/register')
        .send(user)
        .end(function(err, res){
          expect(err).to.be.null;
          expect(res).to.have.status(500);
          expect(res.body.error).to.be.equal(`User validation failed: email: Please Input Your Email`);
          done();
        })
    })
    it('Should make sure that somebody can\'t be register if name empty /user/register with POST request', function(done) {
      const user = {
        name: 'isro',
        email: 'isro@mail.com',
        password: ''
      }
      chai
        .request(app)
        .post('/user/register')
        .send(user)
        .end(function(err, res){
          expect(err).to.be.null;
          expect(res).to.have.status(500);
          expect(res.body.error).to.be.equal(`Please Input Your Password`);
          done();
        })
    })
    it('Should make sure that somebody can\'t be register if email wrong /user/register with POST request', function(done) {
      const user = {
        name: 'isro',
        email: 'is',
        password: '12345'
      }
      chai
        .request(app)
        .post('/user/register')
        .send(user)
        .end(function(err, res){
          expect(err).to.be.null;
          expect(res).to.have.status(500);
          expect(res.body.error).to.be.equal(`User validation failed: email: wrong email format`);
          done();
        })
    })
  })
})

describe('LOGIN TEST', () => {
  describe('success test:', () => {
    it('Should make sure that customer login /user/login with POST request', function(done) {
      const user = {
        email: 'adip@mail.com',
        password: '12345'
      }
      chai
        .request(app)
        .post('/user/login')
        .send(user)
        .end(function(err, res){
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body.isLogin).to.have.equal(true);
          expect(res.body.message).to.have.equal('Welcome Customer adip');
          expect(res.body.token).to.be.a('string');
          customerLoginToken = res.body.token;
          done();
        })
    })

    it('Should make sure that admin login /user/login with POST request', function(done) {
      const user = {
        email: 'ilham@mail.com',
        password: '12345'
      }
      chai
        .request(app)
        .post('/user/login')
        .send(user)
        .end(function(err, res){
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body.message).to.have.equal('Welcome Admin ilham');
          expect(res.body.isLogin).to.have.equal(true);
          expect(res.body.token).to.be.a('string');
          adminLoginToken = res.body.token
          done();
        })
    })
  })
  describe('fail test:', () => {
    it('Should make sure that email can\'t login if have wrong or empty email /user/login with POST request', function(done) {
      const user = {
        email: 'adip@ma.com',
        password: '12345'
      }
      chai
        .request(app)
        .post('/user/login')
        .send(user)
        .end(function(err, res){
          expect(err).to.be.null;
          expect(res).to.have.status(400);
          expect(res.body.error).to.have.equal('Wrong email');
          done();
        })
    })
    it('Should make sure that email can\'t login if have wrong or empty password /user/login with POST request', function(done) {
      const user = {
        email: 'adip@mail.com',
        password: '123'
      }
      chai
        .request(app)
        .post('/user/login')
        .send(user)
        .end(function(err, res){
          expect(err).to.be.null;
          expect(res).to.have.status(400);
          expect(res.body.error).to.have.equal('Wrong password');
          done();
        })
    })
  })
})

describe('ADD ITEMS TEST', () => {
  describe('success test:', () => {
    it('should create a new product when user login role is admin when request to /items with POST request', function(done){
      chai
        .request(app)
        .post('/items/uploadPhoto')
        .set('token', adminLoginToken)
        .attach('image', './test/picture/indomie.jpeg')
        .end(function(err, res){
          expect(err).to.be.null;
          expect(res).to.have.status(201);
          const product = {
            name: 'mie sedap',
            amount: 10,
            price: 1500,
            picture: res.body.pictureUrl
          }
          chai
            .request(app)
            .post('/items')
            .set('token', adminLoginToken)
            .send(product)
            .end(function(err, res){
              expect(err).to.be.null;
              expect(res).to.have.status(201);
              expect(res.body.message).to.be.equal(`${product.name} has been added by ${product.amount}. The current stock are ${product.amount}`)
              itemId = res.body.data._id
              done();
            })
        })
    }).timeout(10000)
  })

  describe('fail test:', () => {
    it('should not create a new product when no login token when request to /items with POST request', function(done){
      const product = {
        name: 'indomie',
        amount: 10,
        price: 2000
      }
      chai
        .request(app)
        .post('/items')
        .send(product)
        .end(function(err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(400);
          expect(res.body.error).to.be.equal('please login first');
          done();
        })
    })
    it('should not create a new product when user login role isn\'t admin when request to /items with POST request', function(done){
      const product = {
        name: 'indomie',
        amount: 10,
        price: 2000
      }
      chai
        .request(app)
        .post('/items')
        .set('token', customerLoginToken)
        .send(product)
        .end(function(err, res){
          expect(err).to.be.null;
          expect(res).to.have.status(400);
          expect(res.body.error).to.be.equal('only admin that can use this feature');
          done();
        })
    })
  })
})

describe('READ ITEM', () => {
  describe('success test:', () => {
    it('Should read all products when request to /items with GET request', function(done){
      chai
        .request(app)
        .get('/items')
        .set('token', customerLoginToken)
        .end(function(err, res){
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          done()
        })
    })
  })
})

describe('UPDATE ITEM', () => {
  describe('success test:', () => {
    it('Should update all products when request to /items/:id with PUT request', function(done){
      chai
        .request(app)
        .post('/items/uploadPhoto')
        .set('token', adminLoginToken)
        .attach('image', './test/picture/indomie2.jpg')
        .end(function(err, res){
          expect(err).to.be.null;
          expect(res).to.have.status(201);
          const product = {
            name: 'mie sedap',
            amount: 12,
            price: 2000,
            picture: res.body.pictureUrl
          }
          chai
            .request(app)
            .put(`/items/${itemId}`)
            .set('token', adminLoginToken)
            .send(product)
            .end(function(err, res){
              expect(err).to.be.null;
              expect(res).to.have.status(200);
              expect(res.body.message).to.be.equal(`${product.name} has been updated. The current stock are ${product.amount}`)
              done();
            })
        })
    }).timeout(10000)
  })

  describe('fail test:', () => {
    it('should not update a product when no login token when request to /items/:id with POST request', function(done){
      const product = {
        name: 'mie sedap',
        amount: 30,
        price: 2000
      }
      chai
        .request(app)
        .put(`/items/${itemId}`)
        .send(product)
        .end(function(err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(400);
          expect(res.body.error).to.be.equal('please login first');
          done();
        })
    })
    it('should not update a product when user login role isn\'t admin when request to /items/:id with POST request', function(done){
      const product = {
        name: 'mie sedap',
        amount: 30,
        price: 2000
      }
      chai
        .request(app)
        .post(`/items/${itemId}`)
        .set('token', customerLoginToken)
        .send(product)
        .end(function(err, res){
          expect(err).to.be.null;
          expect(res).to.have.status(400);
          expect(res.body.error).to.be.equal('only admin that can use this feature');
          done();
        })
    })
  })
})

describe('DELETE ITEM', () => {
  describe('success test:', () => {
    it('Should make sure that successfully erase a product when request to /remove with DELETE request', function (done){
    chai
      .request(app)
      .delete(`/items/${itemId}`)
      .set('token', adminLoginToken)
      .end(function(err, res){
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body.message).to.be.equal(`${res.body.data.name} has been successfully deleted`)
        done();
      })
    })
  })


  describe('fail test:', () => {
    it('Should make sure that failed to erase a product when not authenticated that request to /remove with DELETE request', function (done){
      chai
        .request(app)
        .delete(`/items/${itemId}`)
        .end(function(err, res){
          expect(err).to.be.null;
          expect(res).to.have.status(400);
          expect(res.body.error).to.be.equal('please login first');
          done();
        })
    })

    it('Should make sure that failed to erase a product when not admin that request to /remove with DELETE request', function (done){
      chai
        .request(app)
        .delete(`/items/${itemId}`)
        .set('token', customerLoginToken)
        .end(function(err, res){
          expect(err).to.be.null;
          expect(res).to.have.status(400);
          expect(res.body.error).to.be.equal('only admin that can use this feature');
          done();
        })
    })
  })
})

describe('ADD ITEM TO THEIR CART', () => {
  describe('success test:', () => {
    it('should add item to products /items with POST request', function(done){
      chai
        .request(app)
        .post('/items/uploadPhoto')
        .set('token', adminLoginToken)
        .attach('image', './test/picture/indomie.jpeg')
        .end(function(err, res){
          expect(err).to.be.null;
          expect(res).to.have.status(201);
          const product = {
            name: 'mie sedap',
            amount: 10,
            price: 1500,
            picture: res.body.pictureUrl
          }
          chai
            .request(app)
            .post('/items')
            .set('token', adminLoginToken)
            .send(product)
            .end(function(err, res){
              expect(err).to.be.null;
              expect(res).to.have.status(201);
              expect(res.body.message).to.be.equal(`${product.name} has been added by ${product.amount}. The current stock are ${product.amount}`)
              itemId = res.body.data._id;
              done();
            })
        })
    }).timeout(10000)

    it('Should make sure that only the person that have been login who can add into their own /carts with POST request', function(done) {
      const buyProduct = {
        item: {
            itemId: itemId,
            qty: 4
        }
      }
      chai
        .request(app)
        .post('/carts')
        .send(buyProduct)
        .set('token', customerLoginToken)
        .end(function(err, res){
          expect(err).to.be.null;
          expect(res).to.have.status(201);
          expect(res.body.message).to.be.equal(`${res.body.itemName} has been added into your cart`);
          cartId = res.body.data._id;
          done();
        })
    })
  })

  describe('fail test:', () => {
    it('Should make sure cannot buy item if the qty higher than amount /carts with POST request', function(done) {
      const buyProduct = {
        item: {
            itemId: itemId,
            qty: 8
        }
      }
      chai
        .request(app)
        .post('/carts')
        .send(buyProduct)
        .set('token', customerLoginToken)
        .end(function(err, res){
          expect(err).to.be.null;
          expect(res).to.have.status(400);
          expect(res.body.error).to.be.equal(`Stock amount of ${res.body.itemName} is less then item that customer want to buy`)
          done();
        })
    })

    it('Should make sure unlogin person cannot buy item into /carts with POST request', function(done) {
      const buyProduct = {
        item: {
            itemId: itemId,
            qty: 4
        }
      }
      chai
        .request(app)
        .post('/carts')
        .send(buyProduct)
        .end(function(err, res){
          expect(err).to.be.null;
          expect(res).to.have.status(400);
          expect(res.body.error).to.be.equal(`please login first`)
          done();
        })
    })
  })
})

describe('READ CART ITEM', () => {
  describe('success test:', () => {
    describe('success test:', () => {
      it('Should read their carts when request to /carts with GET request', function(done){
        chai
          .request(app)
          .get('/carts')
          .set('token', customerLoginToken)
          .end(function(err, res){
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            done();
          })
      })
    })
  })

  describe('fail test:', () => {
    it('Should make sure unlogin person cannot see cart when access /carts with GET request', function(done) {
      chai
        .request(app)
        .get('/carts')
        .end(function(err, res){
          expect(err).to.be.null;
          expect(res).to.have.status(400);
          expect(res.body.error).to.be.equal(`please login first`)
          done();
        })
    })
  })
})

describe('UPDATE ITEM IN CART', () => {
  describe('success test:', () => {
    it('Should make sure that only the person that have been login who can add into their own /carts/:id/:itemId with PUT request', function(done) {
      const updateProduct = {
        item: {
            itemId: itemId,
            qty: 6
        }
      }
      chai
        .request(app)
        .put(`/carts/${cartId}/${itemId}`)
        .send(updateProduct)
        .set('token', customerLoginToken)
        .end(function(err, res){
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body.message).to.be.equal(`Item ${res.body.itemName} has been updated from your cart`);
          done();
        })
    })
  })

  describe('fail test:', () => {
    it('Should make sure can\'t be update if the qty is more than stock /carts/:id/:itemId with PUT request', function(done) {
      const updateProduct = {
        item: {
          itemId: itemId,
          qty: 20
        }
      }
      chai
        .request(app)
        .put(`/carts/${cartId}/${itemId}`)
        .send(updateProduct)
        .set('token', customerLoginToken)
        .end(function(err, res){
          expect(err).to.be.null;
          expect(res).to.have.status(400);
          expect(res.body.error).to.be.equal(`Stock amount of ${res.body.itemName} is less then item that customer want to update`);
          done();
        })
    })

    it('Should make sure can\'t be update no login token /carts/:id/:itemId with PUT request', function(done) {
      const updateProduct = {
        item: {
          itemId: itemId,
          qty: 8
        }
      }
      chai
        .request(app)
        .put(`/carts/${cartId}/${itemId}`)
        .send(updateProduct)
        .end(function(err, res){
          expect(err).to.be.null;
          expect(res).to.have.status(400);
          expect(res.body.error).to.be.equal(`please login first`);
          done();
        })
    })

    it('Should make sure can\'t be update the user token wrong or different from the owner id /carts/:id/:itemId with PUT request', function(done) {
      const updateProduct = {
        item: {
          itemId: itemId,
          qty: 8
        }
      }
      chai
        .request(app)
        .put(`/carts/${cartId}/${itemId}`)
        .send(updateProduct)
        .set('token', adminLoginToken)
        .end(function(err, res){
          expect(err).to.be.null;
          expect(res).to.have.status(400);
          expect(res.body.error).to.be.equal(`not authorizated to use this feature`);
          done();
        })
    })
  })
})

describe('DELETE ITEM FROM CART', () => {
  describe('success test:', () => {
    it('Should make sure that only the person that have been login who can remove item from their own /carts/:id/:itemId with DELETE request', function(done) {
      chai
        .request(app)
        .delete(`/carts/${cartId}/${itemId}`)
        .set('token', customerLoginToken)
        .end(function(err, res){
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body.message).to.be.equal(`Item ${res.body.itemName} has been removed from your cart`);
          done();
        })
    })
  })

  describe('fail test:', () => {
    it('Should make sure that only the person that have been login who can add into their own /carts with POST request', function(done) {
      const buyProduct = {
        item: {
            itemId: itemId,
            qty: 4
        }
      }
      chai
        .request(app)
        .post('/carts')
        .send(buyProduct)
        .set('token', customerLoginToken)
        .end(function(err, res){
          expect(err).to.be.null;
          expect(res).to.have.status(201);
          expect(res.body.message).to.be.equal(`${res.body.itemName} has been added into your cart`);
          cartId = res.body.data._id;
          done();
        })
    })

    it('Should make sure un-login cant delete the other customer cart /carts/:id/:itemId with DELETE request', function(done) {
      chai
        .request(app)
        .delete(`/carts/${cartId}/${itemId}`)
        .end(function(err, res){
          expect(err).to.be.null;
          expect(res).to.have.status(400);
          expect(res.body.error).to.be.equal(`please login first`);
          done();
        })
    })

    it('Should make sure other user cant delete the other customer cart /carts/:id/:itemId with DELETE request', function(done) {
      chai
        .request(app)
        .delete(`/carts/${cartId}/${itemId}`)
        .set('token', adminLoginToken)
        .end(function(err, res){
          expect(err).to.be.null;
          expect(res).to.have.status(400);
          expect(res.body.error).to.be.equal(`not authorizated to use this feature`);
          done();
        })
    })
  })
})

describe('CREATE TRANSACTION', () => {
  describe('success test:', () => {
    
  })

  describe('fail test:', () => {
    
  })
})

describe('READ TRANSACTION', () => {
  describe('success test:', () => {

  })

  describe('fail test:', () => {
    
  })
})

describe('CONFIRM TRANSACTION', () => {
  describe('success test:', () => {

  })

  describe('fail test:', () => {
    
  })
})

describe('UPDATE TRANSACTION', () => {
  describe('success test:', () => {

  })

  describe('fail test:', () => {
    
  })
})

describe('DELETE TRANSACTION', () => {
  describe('success test:', () => {

  })

  describe('fail test:', () => {
    
  })
})

// it('Should make sure that somebody has login when request to /costumers/status with GET request', function(done){
//   chai
//     .request(app)
//     .get('/customers/checkOnline')
//     .end(function(err, res){
//       expect(err).to.be.null;
//       expect(res).to.have.status(200);
//       done();
//     })
// })

afterEach(function (done) {
  mongoose.disconnect();
  done();
});