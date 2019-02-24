<template>
  <div id="nav">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div id="padding-navbar">
        <div v-if="isLogin == false">
          <router-link to="/">Home</router-link>
          <router-link to="/login">Login</router-link>
          <router-link to="/register">Register</router-link>
        </div>
        <div v-else>
          <div v-if="role === 'Admin'">
            <router-link to="/">Home</router-link>
            <router-link to="/products">Products</router-link>
            <!-- <router-link to="/transaction">Transaction</router-link> -->
            <a @click="logout">Logout</a>
          </div>
          <div v-else>
            <router-link to="/">Home</router-link>
            <router-link to="/products">Products</router-link>
            <router-link to="/cart">Cart</router-link>
            <!-- <router-link to="/transaction">Transaction</router-link> -->
            <a @click="logout">Logout</a>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>

export default {
  name: 'navbar',
  props: ['isLogin', 'role'],
  methods: {
    logout () {
      this.$emit('logout')
    }
  }
}

</script>

<style>
#nav {
  padding: 40px;
}

#padding-navbar {
  padding: 10px;
}

#nav a {
  font-weight: bold;
  color: white;
  margin: 10px;
  position: center;
  cursor: pointer;
  text-decoration: none;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

</style>
