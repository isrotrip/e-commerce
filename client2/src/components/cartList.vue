<template>
  <div>
    <b-form style="width:60vh" class="mx-auto">
      <b-form-group
        :id="cart.id"
        label="Cart List"
        label-for="cart-list"
      >
      <b-form-input
        id="products-name"
        type="text"
        v-model="cart.itemName"
        readonly/>
        <b-form-input
        v-if="!editConfirm"
        id="products-price"
        type="number"
        v-model="cart.quantity"
        readonly/>
        <b-form-input
        v-else
        id="products-price"
        type="number"
        v-model="cart.quantity"/>
        <b-form-input
        id="products-amount"
        type="number"
        v-model="cart.pricePerUnit"
        readonly/>
      </b-form-group>
      <div v-if="!editConfirm && !deleteConfirm">
        <b-button @click="editConfirm = true" variant="success">Edit</b-button>
        <b-button @click="deleteConfirm = true" variant="danger">Remove</b-button>
      </div>
      <div v-else-if="!deleteConfirm">
        <div>
          Are You Sure Want To Edit?
        </div>
        <b-button @click="edit" variant="success">Edit</b-button>
        <b-button @click="editConfirm = false" variant="danger">Cancel</b-button>
      </div>
      <div v-else>
        <div>
          Are You Sure Want To Remove?
        </div>
        <b-button @click="remove" variant="success">Remove</b-button>
        <b-button @click="deleteConfirm = false" variant="danger">Cancel</b-button>
      </div>
    </b-form>
  </div>
</template>

<script>

import Swal from 'sweetalert2'
import eCommerceApi from '@/api/e-commerce.js'

export default {
  props: ['role', 'isLogin', 'token', 'cart', 'foods'],
  data () {
    return {
      editConfirm: false,
      deleteConfirm: false
    }
  },
  methods: {
    edit () {
      eCommerceApi
        .put(`/carts/${this.cart._id}/${this.cart.itemId}`, {
          item: {
            qty: this.cart.quantity
          }
        }, {
          headers: {
            token: this.token
          }
        })
        .then(({ data }) => {
          data.data.item._id = this.cart._id
          this.$emit('edit-carts', data.data.item)
          Swal.hideLoading()
          this.editConfirm = false
          Swal.fire({
            position: 'bottom-end',
            type: 'success',
            title: `${data.message}`,
            showConfirmButton: false,
            timer: 1000
          })
        })
        .catch((error) => {
          Swal.fire({
            position: 'bottom-end',
            type: 'error',
            title: `${error.response.data.error}`,
            showConfirmButton: false,
            timer: 1000
          })
        })
    },
    remove () {
      eCommerceApi
        .delete(`/carts/${this.cart._id}/${this.cart.itemId}`, {
          headers: {
            token: this.token
          }
        })
        .then(({ data }) => {
          this.$emit('remove-carts', data.data)
          Swal.hideLoading()
          this.deleteConfirm = false
          Swal.fire({
            position: 'bottom-end',
            type: 'success',
            title: `${data.message}`,
            showConfirmButton: false,
            timer: 1000
          })
        })
        .catch((error) => {
          Swal.fire({
            position: 'bottom-end',
            type: 'error',
            title: `${error.response.data.error}`,
            showConfirmButton: false,
            timer: 1000
          })
        })
    }
  }
}

</script>
