<template>
  <div v-if="!isLogin">
    <img src="../assets/login.svg" class="mx-auto" style="height: 250px">
    <br>
    <b-form @submit="onSubmit" @reset="onReset" style="width:60vh" class="mx-auto">
      <b-form-group
        id="login-email"
        label="Email address:"
        label-for="login-email"
        description="We'll never share your email with anyone else."
      >
        <b-form-input
          id="login-email"
          type="email"
          v-model="form.email"
          required
          placeholder="Enter email..." />
      </b-form-group>

      <b-form-group id="login-password" label="Your Password:" label-for="login-password">
        <b-form-input
          id="login-password"
          type="password"
          v-model="form.password"
          required
          placeholder="Enter password..." />
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
  props: ['isLogin'],
  data () {
    return {
      form: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      eCommerceApi
        .post('/user/login', this.form)
        .then(({ data }) => {
          localStorage.setItem('token', data.token)
          this.$emit('login', data.message.split(' ')[1])
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
    onReset (evt) {
      evt.preventDefault()
      /* Reset our form values */
      this.form.email = ''
      this.form.password = ''
    }
  }
}

</script>
