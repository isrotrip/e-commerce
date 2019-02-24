<template>
  <div id="app">
    <navbar
    :isLogin="isLogin"
    :role="role"
    @logout="logout" />
    <router-view
      :isLogin="isLogin"
      :token="token"
      :role="role"
      :foods="foods"
      :carts="carts"
      @login="login"
      @fetch-foods="foods = $event"
      @create-foods="foods.push($event)"
      @remove-foods="foods.splice(foods.indexOf($event), 1)"
      @edit-foods="update($event)"
      @add-tocart="addToCart($event)"
      @edit-carts="editCarts($event)"
      @remove-carts="removeCarts($event)"
    />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import eCommerceApi from '@/api/e-commerce.js'
import Swal from 'sweetalert2'

export default {
  components: {
    Navbar
  },
  data () {
    return {
      isLogin: false,
      user: {},
      token: '',
      role: '',
      foods: [],
      carts: []
    }
  },
  watch: {
    role (val) {
      if (val === 'Customer') {
        eCommerceApi
          .get('/carts', {
            headers: {
              token: this.token
            }
          })
          .then(({ data }) => {
            this.carts = data.data
          })
          .catch(error => {
            console.log(error)
          })
      } else {
        this.carts = []
      }
    }
  },
  methods: {
    login (role) {
      this.isLogin = true
      this.token = localStorage.getItem('token')
      this.$router.push('/')
      this.role = role
      this.fetchFood()
    },
    logout () {
      this.isLogin = false
      this.role = ''
      this.token = localStorage.removeItem('token')
      this.$router.push('/')
    },
    update (updateFood) {
      for (let i = 0; i < this.foods.length; i++) {
        if (this.foods[i]._id === updateFood._id) {
          this.foods.splice(i, 1, updateFood)
        }
      }
    },
    fetchFood () {
      eCommerceApi
        .get('/items', {
          headers: {
            token: this.token
          }
        })
        .then(({ data }) => {
          this.foods = data.message
        })
        .catch(error => {
          Swal.fire({
            position: 'bottom-end',
            type: 'error',
            title: `${error.response.data.error}`,
            showConfirmButton: false,
            timer: 1000
          })
        })
    },
    addToCart (cart) {
      this.carts.push(cart)
      this.foods
        .filter(food => food._id.toString() === cart.item.itemId.toString())[0]
        .amount -= cart.item.qty
    },
    editCarts (cart) {
      let changeFoodAmount = 0
      for (let i = 0; i < this.carts.length; i++) {
        if (this.carts[i]._id.toString() === cart._id.toString()) {
          changeFoodAmount = this.carts[i].item.qty - cart.qty
          let newCart = this.carts[i]
          newCart.item.qty = cart.qty
          this.carts.splice(i, 1, newCart)
          this.foods
            .filter(food => food._id.toString() === cart.itemId.toString())[0]
            .amount += changeFoodAmount
        }
      }
    },
    removeCarts (cart) {
      for (let i = 0; i < this.carts.length; i++) {
        if (this.carts[i]._id.toString() === cart._id.toString()) {
          this.carts.splice(i, 1)
        }
      }
      this.foods
        .filter(food => food._id.toString() === cart.item.itemId.toString())[0]
        .amount += cart.item.qty
    }
  }
}

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
