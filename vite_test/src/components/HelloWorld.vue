<template>
  <h1>{{ msg }}</h1>
  <button @click="count++">count is: {{ count }}</button>
  <p class="test-p">Edit <code>components/HelloWorld.vue</code> to test hot module replacement.</p>
</template>

<script>
import './test.css';

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      count: 0
    }
  }
}
</script>
