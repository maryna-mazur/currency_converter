<script>
export default {
  props: {
    content: {
      type: String,
      required: true,
    },
  },
};
</script>

<template>
  <button class="button">{{ content }}</button>
</template>

<style scoped lang="scss">
@import "../assets/style/utils/extends";

.button {
  color: #fff;
  padding: 10px 20px;
  border-radius: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  @extend %border-style;
  border-color: transparent;
  @extend %typography;
  color: #0d1c52;

  &:hover {
    background-color: #1cbbdb17;
    color: #037c92;
  }

  &:active {
    border-radius: 50px;
    background: #e0e0e0;
    box-shadow: inset 20px 20px 60px #53b5c2, inset -20px -20px 60px #ffffff;
  }
}
</style>