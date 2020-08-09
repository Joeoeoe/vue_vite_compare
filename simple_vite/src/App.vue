<template>
  <div>
    <p>count is {{count}}</p>
    <button v-on:click="count += 1">click me</button>
  </div>
</template>

<script>
export default {
  name: "App",
  data: function(){
    return {
      count: 0
    }
  },
  methods: {
    add: function () {
      this.count++;
    },
  },
};
</script>
