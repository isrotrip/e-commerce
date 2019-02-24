<template>
  <div>
    <b-button v-b-modal.modalPrevent variant="primary">Add To Carts</b-button>

    <!-- Modal Component -->
    <b-modal
      id="modalPrevent"
      ref="modal"
      title="Add To Cart"
      @ok="add"
      @shown="clear"
    >
      <form @submit.stop.prevent="handleSubmit">
        Enter amount:
        <b-form-input type="text" placeholder="Enter your name" v-model="amount" />
      </form>
    </b-modal>
  </div>
</template>

<script>

import eCommerceApi from '@/api/e-commerce.js'
import Swal from 'sweetalert2'

export default {
  props: ['token', 'food'],
  data () {
    return {
      amount: 0
    }
  },
  methods: {
    clear () {
      this.amount = 0
    },
    add () {
      eCommerceApi
        .post('/carts', {
          item: {
            itemId: this.food._id,
            qty: this.amount
          }
        }, {
          headers: {
            token: this.token
          }
        }
        )
        .then(({ data }) => {
          this.$emit('add-tocart', data.data)
          Swal.fire({
            position: 'bottom-end',
            type: 'success',
            title: `${data.message}`,
            showConfirmButton: false,
            timer: 1000
          })
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
    handleSubmit () {
      this.add()
      this.clear()
      this.$nextTick(() => {
        this.$refs.modal.hide()
      })
    }
  }
}
</script>
