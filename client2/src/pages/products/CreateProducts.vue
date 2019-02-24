<template>
  <div v-if="isLogin && role === 'Admin'">
    <br>
    <b-form @submit="onSubmit" @reset="onReset" style="width:60vh" class="mx-auto">
      <b-form-group
        id="create-products"
        label="Create Products:"
        label-for="create-products"
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
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
  </div>
</template>

<script>

import Swal from 'sweetalert2'
import eCommerceApi from '@/api/e-commerce.js'

export default {
  props: ['isLogin', 'role', 'token'],
  data () {
    return {
      form: {
        name: '',
        amount: '',
        price: '',
        picture: ''
      },
      file: ''
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      Swal.fire({
        title: 'Adding the Foods'
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
            .post('/items', this.form, {
              headers: {
                token: this.token
              }
            })
        })
        .then(({ data }) => {
          Swal.hideLoading()
          this.$emit('create-foods', data.data)
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
    }
  }
}

</script>
