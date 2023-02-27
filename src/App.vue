<script>
import { getRates } from "./assets/api/dataApi.js";
import CurrencyBlock from "./components/CurrencyBlock.vue";
import ExchangeRates from "./components/ExchangeRates.vue";
import Button from "./components/Button.vue";

export default {
  data() {
    return {
      fromCurrency: "USD",
      toCurrency: "BTC",
      currencies: ["USD", "EUR", "UAH", "GBP", "BTC", "ETH", "BNB", "XRP"],
      errorMessages: null,
      isAddCurrencies: false,
    };
  },

  components: {
    CurrencyBlock,
    ExchangeRates,
    Button,
  },
  methods: {
    updateValue() {
      const now = new Date().getTime();
      const lastUpdated = localStorage.getItem("lastUpdated");
      if (!lastUpdated || now - lastUpdated > 5000) {
        try {
          this.currencies.forEach((currency) =>
          localStorage.removeItem(currency)
        );
        getRates(this.fromCurrency, "latest");
        localStorage.setItem("lastUpdated", now);
        } catch {
          this.updateErrorMessages('Помилка завантаження даних з сервера');
        }
      } else {
        this.updateErrorMessages(
          "Оновлення доступне не частіше ніж 1 раз за 5 секунд."
        );

        setTimeout(() => {
          this.updateErrorMessages("");
        }, 3000);
      }
    },

    addCurrency() {
      this.isAddCurrencies = true;
    },

    hideAddCurrency() {
      this.isAddCurrencies = false;
    },

    updateErrorMessages(text) {
      this.errorMessages = text;
    },

    resetValues() {
      this.fromCurrency = "USD";
      this.toCurrency = "BTC";
      this.currencies = ["USD", "EUR", "UAH", "GBP", "BTC", "ETH", "BNB", "XRP"];
    },
  },
};
</script>

<template>
  <main class="main">
    <h1 class="main__title">Конвертер валют</h1>
    <section class="card">
      <h2 class="card__title">Оберіть валюту</h2>
      <div class="card__block">
        <CurrencyBlock :updateErrorMessages="this.updateErrorMessages" />
      </div>
      <ExchangeRates
        :isAddCurrencies="isAddCurrencies"
        :hideAddCurrency="hideAddCurrency"
        :updateErrorMessages="this.updateErrorMessages"
      />
      <div class="container">
        <Button @click="addCurrency" :content="'Додати валюту'" />
        <Button @click="updateValue" :content="'Оновити курс валют'" />
      </div>
      <p class="error-message" v-show="errorMessages">{{ errorMessages }}</p>
    </section>
  </main>
</template>

<style scoped lang="scss">
@import "./assets/style/utils/mixins";
.main {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 25px;

  @include onTablet {
    gap: 30px;
  }

  &__title {
    margin: 20px auto 0;
    animation: bounce 1s ease-in-out;

    @include onTablet {
      margin-top: 40px;
    }
  }

  @keyframes bounce {
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-20px);
    }
    100% {
      transform: translateY(0);
    }
  }
}

.card {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-basis: 350px;
  flex-grow: 1;
  flex-shrink: 1;
  min-width: 260px;
  padding: 10px;
  background: #fff;
  box-shadow: 0px 44px 64px rgba(69, 25, 160, 0.1);
  border-radius: 32px;
  margin-bottom: 20px;

  @include onTablet {
    min-width: 425px;
    flex-basis: 500px;
  }

  @include onLaptop1280 {
    min-width: 480px;
    flex-basis: 500px;
  }

  @media (max-width: 480px) {
    max-width: 260px;
    flex-basis: 100%;
  }

  &__block {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    justify-content: space-around;
    gap: 5px;

    @include onTablet {
      flex-direction: row;
    }
  }
}

.container {
  display: flex;
  gap: 10px;
  margin: 30px;
}

.error-message {
  margin: 0;
  font-size: 12px;
  text-align: center;
  color: rgb(200, 52, 52);
}
</style>