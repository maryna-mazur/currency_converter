<script>
export default {
  props: {
    placeholderValue: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      default: null,
      required: false,
    },
  },
  data() {
    return {
      currentAmount: this.amount,
    };
  },
  watch: {
    amount(value) {
      this.currentAmount = value;
    },
  },
};
</script>

<template>
  <input
    v-model="currentAmount"
    class="field__input"
    type="number"
    :id="id"
    :amount="currentAmount"
    min="0"
    max="10000"
    :placeholder="placeholderValue"
    @input="$emit('input', $event.target.value)"
    inputmode="decimal"
  />
</template>

<style scoped lang="scss">
.field__input {
  box-sizing: border-box;
  height: 20px;
  padding: 5px 8px;
  min-width: 65%;
  background: transparent;
  outline: none;
  border: none;
  font-family: "Mulish";
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 13px;
  color: #0d1c52;

  &::placeholder {
    font-family: "Mulish";
    font-style: normal;
    font-weight: 700;
    font-size: 12px;
    line-height: 13px;
    color: #0d1c5269;
  }
}
</style>