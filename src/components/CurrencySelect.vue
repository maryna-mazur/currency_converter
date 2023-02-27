<script>
export default {
  props: {
    currencies: {
      type: Array,
      required: false,
      default: null,
    },
    value: {
      type: String,
      required: true,
    },
    isLeftBorder: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      selectedCurrency: this.value,
    };
  },
  watch: {
    selectedCurrency(value) {
      this.$emit("input", value);
    },
  },
};
</script>

<template>
  <select
    v-model="selectedCurrency"
    :class="{
      'currency-select': true,
      'currency-select--without-border': !isLeftBorder,
    }"
  >
    <option v-for="currency in currencies" :value="currency" :key="currency">
      {{ currency }}
    </option>
  </select>
</template>

<style scoped lang="scss">
.currency-select {
  height: 32px;
  width: 55px;
  background: transparent;
  outline: none;
  border: none;
  border-left: 1px solid #8f9dce;
  font-family: "Mulish";
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 13px;
  color: #0d1c52;

  &--without-border {
    border: none;
  }
}
</style>