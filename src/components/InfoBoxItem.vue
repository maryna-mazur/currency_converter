<script>
export default {
  props: {
    currency: {
      type: String,
      required: true,
    },
    rate: {
      type: String,
      required: true,
    }
  },
};
</script>

<template>
  <th class="item">{{ currency }}</th>
  <th class="item">{{ rate }}</th>
</template>

<style scoped lang="scss">
@import "../assets/style/utils/extends";

.item {
  text-align: center;
  font-weight: 400;
}
</style>
