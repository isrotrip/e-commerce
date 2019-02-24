<template>
  <div v-if="isLogin && role === 'Admin'">
    <br>
    <b-form @submit="onSubmit" @reset="onReset" style="width:60vh" class="mx-auto">
      <b-form-group
        id="remove-products"
        label="Are You Sure Want To Remove This Food?"
        label-for="remove-products"
      >
      <img :src="food.picture"
        :alt="food.name"
        style="height:15vh"/>
      <b-form-input
        id="products-name"
        type="text"
        v-model="food.name"
        readonly/>
        <b-form-input
        id="products-price"
        type="number"
        v-model="food.price"
        readonly/>
        <b-form-input
        id="products-amount"
        type="number"
        v-model="food.amount"
        readonly/>
      </b-form-group>
      <b-button type="submit" variant="primary">Remove</b-button>
      <b-button type="reset" variant="danger">Cancel</b-button>
    </b-form>
  </div>
</template>

<script>

import Swal from 'sweetalert2'
import eCommerceApi from '@/api/e-commerce.js'

export default {
  props: ['isLogin', 'role', 'token', 'foods'],
  data () {
    return {
      food: this.foods
        .filter(food =>
          food._id.toString() === this.$route.params.id.toString())[0]
    }
  },
  created () {
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      Swal.fire({
        title: 'Remove the Foods'
      })
      Swal.showLoading()
      eCommerceApi
        .delete(`/items/${this.$route.params.id}`, {
          headers: {
            token: this.token
          }
        })
        .then(({ data }) => {
          Swal.hideLoading()
          this.$emit('remove-foods', data.data)
          Swal.fire({
            position: 'bottom-end',
            type: 'success',
            title: `${data.message}`,
            showConfirmButton: false,
            timer: 1000
          })
          this.$router.go(-1)
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
    onReset (evt) {
      evt.preventDefault()
      /* Reset our form values */
      this.$router.go(-1)
    }
  }
}

</script>
