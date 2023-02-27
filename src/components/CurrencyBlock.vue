<script>
import { getRates, calculateResult } from "../assets/api/dataApi.js";
import CurrencySelect from "./CurrencySelect.vue";
import AmountInput from "./AmountInput.vue";

export default {
  props: {
    updateErrorMessages: {
      type: Function,
      required: true,
    }
  },
  components: {
    CurrencySelect,
    AmountInput,
  },

  data() {
    return {
      amount: null,
      fromCurrency: "USD",
      toCurrency: "BTC",
      currencies: ["USD", "EUR", "UAH", "GBP", "BTC", "ETH", "BNB", "XRP"],
      rates: null,
    };
  },

  computed: {
    result() {
      if (
        this.toCurrency === "USD" &&
        calculateResult(this.amount, this.rates, this.toCurrency) > 10000
      ) {
        return "Не більше 10000";
      } else {
        return calculateResult(this.amount, this.rates, this.toCurrency);
      }
    },
  },

  watch: {
    async fromCurrency(newVal, oldVal) {
      await this.getRates();
    },
  },

  methods: {
    async getRates() {
      this.rates = await getRates(this.fromCurrency, 'latest');
    },
  },

  async mounted() {
    try {
      await this.getRates();
    } catch {
      this.updateErrorMessages('Помилка завантаження даних з сервера')
    }
  },
};
</script>

<template>
  <div class="box">
    <label for="fromCurrency" class="box__title">З валюти:</label>
    <p class="field">
      <AmountInput
        v-model="amount"
        :placeholderValue="'Введіть суму'"
        :id="fromCurrency"
        :amount="parseFloat(amount)"
        :readOnly="false"
      />
      <button
        v-if="amount || result"
        class="field__button"
        @click="
          () => {
            this.amount = null;
          }
        "
      ></button>
      <CurrencySelect
        v-model="fromCurrency"
        :currencies="currencies"
        :value="'USD'"
        :isLeftBorder="true"
      />
    </p>
  </div>
  <div class="box">
    <label for="toCurrency" class="box__title">У валюту:</label>
    <p class="field">
      <input
        class="field__input"
        id="toCurrency"
        max="10000"
        placeholder="Результат"
        v-model="result"
        readonly
      />
      <CurrencySelect
        v-model="toCurrency"
        :currencies="currencies"
        :value="'BTC'"
        :isLeftBorder="true"
      />
    </p>
  </div>
</template>

<style scoped lang="scss">
@import "../assets/style/utils/mixins";
@import "../assets/style/utils/extends";

.box {
  &__title {
    display: block;
    margin-bottom: 7px;
    margin-left: 10px;
    font-weight: 700;
    font-size: 14px;
    line-height: 18px;
    color: #0d1c52;
  }
}

.field {
  display: flex;
  justify-content: space-between;
  margin: 0;
  width: 200px;
  align-items: center;
  @extend %border-style;

  &:focus-within {
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }

  &__input {
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

  &__button {
    all: initial;
    position: relative;
    display: inline-block;
    box-sizing: border-box;
    margin-right: 5px;
    width: 10px;
    height: 15px;
    border-radius: 50%;
    background: #cfdded27;
    cursor: pointer;

    &::after {
      content: url(../assets/img/close.svg);
      position: absolute;
      display: block;
      top: 50%;
      left: 50%;
      transform: translateX(-50%) translateY(-50%);
    }
  }
}
</style>