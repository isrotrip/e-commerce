<template>
  <div v-if="isLogin === true">
    <b-container>
      <b-row>
        <b-col>
          <b-row>
            <div v-if="role === 'Admin'">
              <b-col>
                <router-link to="/products/create">Create A Product</router-link>
                <router-view
                  :isLogin="isLogin"
                  :role="role"
                  :token="token"
                  :foods="foods"
                  @create-foods="$emit('create-foods', $event)"
                  @remove-foods="$emit('remove-foods', $event)"
                  @edit-foods="$emit('edit-foods', $event)"
                />
              </b-col>
            </div>
            <div v-else-if="role === 'Customer'">
              <router-view
                :isLogin="isLogin"
                :role="role"
                :token="token"
                :foods="foods"
                :carts="carts"
                @add-tocart="$emit('add-tocart', $event)"
              />
              <br>
            </div>
            <b-card-group flex>
              <list
                v-for="food in foods"
                :food="food"
                :key="food.id"
                :role="role"
              />
            </b-card-group>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>

import List from '@/components/products/List.vue'

export default {
  props: ['token', 'isLogin', 'role', 'foods', 'carts'],
  name: 'products',
  components: {
    List
  }
}

</script>
