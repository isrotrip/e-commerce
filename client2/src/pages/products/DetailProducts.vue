<template>
  <div>
    <b-card>
      <b-card-text>
        <img
          :src="food.picture"
          :alt="food.name"
          style="height: 30vh"/>
        <br>
        name: {{food.name}}
        <br>
        price: {{food.price}}
        <br>
        quantity: {{food.amount}}
        <div v-if="totalInCart">
          total in cart: {{totalInCart}}
        </div>
      </b-card-text>
    </b-card>
      <ModalAddToCart
        :food="food"
        :token="token"
        @add-tocart="$emit('add-tocart', $event)"/>
    <router-link
      to="/cart"
      variant="success">
      View Carts
    </router-link>
    <br>
    <router-link
      to="/products"
      variant="success">
      Back
    </router-link>
  </div>
</template>

<script>

import ModalAddToCart from '@/components/products/ModalAddToCart'

export default {
  props: ['foods', 'role', 'carts', 'token'],
  name: 'foodList',
  components: {
    ModalAddToCart
  },
  data () {
    return {
      food: this.foods
        .filter(food =>
          food._id.toString() === this.$route.params.id.toString())[0],
      totalInCart: 0,
      inCarts: []
    }
  },
  created () {
    this.carts.forEach(cart => {
      if (cart.item.itemId.toString() === this.$route.params.id) {
        this.totalInCart += cart.item.qty
        this.inCarts.push({
          cartId: cart._id,
          qty: cart.item.qty,
          itemId: cart.itemId
        })
      }
    })
  }
}

</script>
