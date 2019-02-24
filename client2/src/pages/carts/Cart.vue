<template>
  <div v-if="role === 'Customer'">
    <div v-for="cart in tableCart" :key="cart.id">
      <cartList
        :cart="cart"
        :role="role"
        :isLogin="isLogin"
        :token="token"
        :foods="foods"
        @edit-carts="$emit('edit-carts', $event)"
        @remove-carts="removeTableCart($event)"/>
    </div>
  </div>
</template>

<script>

import cartList from '@/components/cartList'

export default {
  props: ['role', 'isLogin', 'token', 'carts', 'foods'],
  components: {
    cartList
  },
  data () {
    return {
      tableCart: [],
      editConfirm: false,
      deleteConfirm: false
    }
  },
  created () {
    this.carts.forEach(cart => {
      this.tableCart.push({
        _id: cart._id,
        itemId: this.foods
          .filter(food => food._id.toString() === cart.item.itemId.toString())[0]
          ._id,
        itemName: this.foods
          .filter(food => food._id.toString() === cart.item.itemId.toString())[0]
          .name,
        quantity: cart.item.qty,
        pricePerUnit: this.foods
          .filter(food => food._id.toString() === cart.item.itemId.toString())[0]
          .price
      })
    })
  },
  methods: {
    removeTableCart (cart) {
      for (let i = 0; i < this.tableCart.length; i++) {
        if (this.tableCart[i]._id.toString() === cart._id.toString()) {
          this.tableCart.splice(i, 1)
        }
      }
      this.$emit('remove-carts', cart)
    }
  }
}

</script>
