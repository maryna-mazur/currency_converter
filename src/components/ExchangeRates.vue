<script>
import { getRates } from "../assets/api/dataApi.js";

import InfoBoxItem from "./InfoBoxItem.vue";
import CurrencySelect from "./CurrencySelect.vue";
import AddCurrency from "./AddCurrency.vue";

export default {
  props: {
    isAddCurrencies: {
      type: Boolean,
    required: true,
    },
    hideAddCurrency: {
      type: Function,
      required: true,
    },
    updateErrorMessages: {
      type: Function,
      required: true,
    },
  },
  components: {
    InfoBoxItem,
    CurrencySelect,
    AddCurrency,
  },
  data() {
    return {
      currencies: ["USD", "EUR", "UAH", "BTC", "ETH"],
      exchangeRates: null,
      currentCurrency: "USD",
      currenciesForSElect: ["USD", "EUR", "UAH"],
    };
  },
  watch: {
    async currentCurrency() {
      await this.getRates();
    },
  },
  methods: {
    async getRates() {
      try {
        const ratesFromStorage = await getRates(this.currentCurrency, "latest");
      this.exchangeRates = [...this.currencies]
        .filter((cur) => cur !== this.currentCurrency)
        .map((curren) => ({
          currency: curren,
          rate: ratesFromStorage[curren]
            ? `${ratesFromStorage[curren]}`
            : "В розробці",
        }));
      } catch {
        this.updateErrorMessages('Помилка завантаження даних з сервера')
      }
    },

    addCurrency(currency) {
      if (!this.currencies.includes(currency)) {
        this.currencies.push(currency);
        localStorage.setItem("currencies", JSON.stringify(this.currencies));
        this.$emit("update-currencies", this.currencies);
        this.getRates();
      }
    },
  },
  mounted() {
    this.getRates();

    const storedCurrencies = localStorage.getItem("currencies");
    if (storedCurrencies) {
      this.currencies = JSON.parse(storedCurrencies);
    }
  },
};
</script>

<template>
  <h2 class="card__title">Курс валют</h2>
  <CurrencySelect
    v-model="currentCurrency"
    :currencies="currenciesForSElect"
    :value="currentCurrency"
    :isLeftBorder="false"
  />
  <table class="info-box">
    <thead>
      <tr>
        <th>Валюта</th>
        <th>Курс</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="element in exchangeRates">
        <InfoBoxItem :currency="element.currency" :rate="element.rate" />
      </tr>
    </tbody>
  </table>
  <AddCurrency
    @add-currency="addCurrency"
    v-show="isAddCurrencies"
    :currencies="currencies"
    @update-currencies="currencies = $event"
    :hideAddCurrency="hideAddCurrency"
    :updateErrorMessages="updateErrorMessages"
  />
</template>

<style scoped lang="scss">
@import "../assets/style/utils/extends";
@import "../assets/style/utils/mixins";
.info-box {
  box-sizing: border-box;
  padding: 5px;
  box-sizing: border-box;
  max-width: 260px;
  backdrop-filter: blur(6px);
  border-radius: 17px;
  transition: all 0.5s;
  @extend %border-style;
  box-shadow: -9px 9px 8px #bebebe, 9px -9px 18px #ffffff;
  color: #0d1c52;

  @include onTablet {
    min-width: 300px;
  }
}
</style>