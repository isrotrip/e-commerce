<template>
  <div v-if="isLogin && role === 'Admin'">
    <br>
    <b-form @submit="onSubmit" @reset="onReset" style="width:60vh" class="mx-auto">
      <b-form-group
        id="edit-products"
        label="Edit Products:"
        label-for="edit-products"
      >
        <b-form-input
          id="products-name"
          type="text"
          v-model="form.name"
          required
          placeholder="Enter Product Name..."/>
          <b-form-input
          id="products-price"
          type="number"
          v-model="form.price"
          required
          placeholder="Enter Product Price..."/>
          <b-form-input
          id="products-amount"
          type="number"
          v-model="form.amount"
          required
          placeholder="Enter Product Amount..."/>
          <b-form-file
          id="products-picture"
          v-model="file"
          required
          placeholder="Enter Product Picture..."
          />
      </b-form-group>
      <b-button type="submit" variant="primary">Submit</b-button>
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
      form: {
        name: '',
        amount: '',
        price: '',
        picture: ''
      },
      food: this.foods
        .filter(food =>
          food._id.toString() === this.$route.params.id.toString())[0],
      file: ''
    }
  },
  created () {
    this.form.name = this.food.name
    this.form.amount = this.food.amount
    this.form.price = this.food.price
    this.form.picture = this.food.picture
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      Swal.fire({
        title: 'Updating the Foods'
      })
      Swal.showLoading()
      const formData = new FormData()
      formData.append('image', this.file)
      eCommerceApi
        .post('/items/uploadPhoto', formData, {
          headers: {
            token: this.token
          }
        })
        .then(({ data }) => {
          this.form.picture = data.pictureUrl
          return eCommerceApi
            .put(`/items/${this.$route.params.id}`,
              {
                name: this.form.name,
                amount: this.form.amount,
                price: this.form.price,
                picture: this.form.picture
              }, {
                headers: {
                  token: this.token
                }
              })
        })
        .then(({ data }) => {
          this.$emit('edit-foods', data.newData)
          Swal.hideLoading()
          Swal.fire({
            position: 'bottom-end',
            type: 'success',
            title: `${data.message}`,
            showConfirmButton: false,
            timer: 1000
          })
          this.form.name = ''
          this.form.price = ''
          this.form.amount = ''
          this.form.picture = ''
          this.file = ''
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
      this.form.name = ''
      this.form.price = ''
      this.form.amount = ''
      this.form.picture = ''
      this.file = ''
      this.$router.go(-1)
    }
  }
}

</script>
