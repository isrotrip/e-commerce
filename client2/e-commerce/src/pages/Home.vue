<template>
  <div>
    <img v-if="!isLogin" src="../assets/home.svg" class="mx-auto" style="height: 500px">
    <div v-else>
    </div>
  </div>
</template>

<script>

export default {
  props: ['isLogin'],
  name: 'isLogin'
}

</script>
