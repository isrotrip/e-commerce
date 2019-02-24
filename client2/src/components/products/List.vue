<template>
  <b-card>
    <b-card-text>
      <img
        :src="food.picture"
        :alt="food.name"
        style="height:15vh"/>
      <br>
      name: {{food.name}}
      <br>
      price: {{food.price}}
      <br>
      quantity: {{food.amount}}
    </b-card-text>
    <div v-if="role==='Admin'" >
      <div>
        <router-link
          :to="{ name: 'edit-products', params: {id: food._id} }"
        >Edit A Product</router-link>
      </div>
      <div>
        <router-link
          :to="{ name: 'remove-products', params: {id: food._id} }"
        >Remove A Product</router-link>
      </div>
    </div>
    <div v-else-if="role==='Customer'">
      <router-link
        :to="{ name: 'detail-products', params: {id: food._id} }"
      >View Details</router-link>
    </div>
  </b-card>
</template>

<script>

export default {
  props: ['food', 'role'],
  name: 'foodList',
  data () {
    return {
      showDetail: false
    }
  }
}

</script>
