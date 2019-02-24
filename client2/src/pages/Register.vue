<template>
  <div v-if="!isLogin">
    <img src="../assets/register.svg" class="mx-auto" style="height:250px">
    <br>
    <b-form @submit="onSubmit" @reset="onReset" style="width:60vh" class="mx-auto">
      <b-form-group
        id="register-name"
        label="Your Name:"
        label-for="register-name"
      >
        <b-form-input
          id="register-name"
          type="text"
          v-model="form.name"
          required
          placeholder="Enter name..." />
      </b-form-group>

      <b-form-group
        id="register-email"
        label="Email address:"
        label-for="register-email"
        description="We'll never share your email with anyone else."
      >
        <b-form-input
          id="exampleInput1"
          type="email"
          v-model="form.email"
          required
          placeholder="Enter email..." />
      </b-form-group>

      <b-form-group id="exampleInputGroup2" label="Your Password:" label-for="exampleInput2">
        <b-form-input
          id="register-password"
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
        name: '',
        email: '',
        password: ''
      }
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      eCommerceApi
        .post('/user/register', this.form)
        .then(({ data }) => {
          Swal.fire({
            position: 'bottom-end',
            type: 'success',
            title: `${data.message}`,
            showConfirmButton: false,
            timer: 1000
          })
          this.$router.push('/login')
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
      this.form.email = ''
      this.form.password = ''
    }
  }
}

</script>
