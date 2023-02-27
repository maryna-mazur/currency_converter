<script>
import { getRates } from "../assets/api/dataApi.js";

export default {
  props: {
    currencies: {
      type: Array,
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
  data() {
    return {
      selectedCurrency: "",
      currenciesList: [],
    };
  },
  methods: {
    async getCurrenciesList() {
      const cachedData = JSON.parse(localStorage.getItem("currenciesDataList"));
      if (cachedData) {
        this.currenciesList = Object.keys(cachedData).filter(
          (el) => !this.currencies.includes(el)
        );
      } else {
        const data = await getRates("USD", "symbol");
        this.currenciesList = Object.keys(data).filter(
          (el) => !this.currencies.includes(el)
        );
        localStorage.setItem("currenciesDataList", JSON.stringify(data));
      }
    },
    addCurrency() {
      if (this.selectedCurrency) {
        this.$emit("add-currency", this.selectedCurrency);
        this.selectedCurrency = "";
      }
    },
  },
  mounted() {
    this.getCurrenciesList();
  },
};
</script>

<template>
  <div class="pop-up">
    <form @submit.prevent="addCurrency" class="pop-up__content">
      <h3 class="pop-up__title">Оберіть валюту зі списку:</h3>
      <input
        type="text"
        v-model="selectedCurrency"
        placeholder="Пошук валюти"
        list="currencies"
        class="pop-up__input"
      />
      <datalist id="currencies">
        <option v-for="cur in currenciesList" :value="cur" :key="cur">
          {{ cur }}
        </option>
      </datalist>

      <button
        type="submit"
        class="pop-up__button"
        @click="this.hideAddCurrency"
      >
        Додати
      </button>
    </form>
    <button class="pop-up__close" @click="this.hideAddCurrency">
      <img src="../assets/img/close.svg" alt="close" />
    </button>
  </div>
</template>

<style scoped lang="scss">
@import "../assets/style/utils/mixins";

$pop-up-background: rgba(0, 0, 0, 0.656);
$pop-up-border-radius: 10px;
$pop-up-box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
$pop-up-padding: 20px;
$pop-up-max-width: 100wh;

.pop-up {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: $pop-up-background;

  &__content {
    max-width: $pop-up-max-width;
    background-color: #fff;
    border-radius: $pop-up-border-radius;
    box-shadow: $pop-up-box-shadow;
    padding: $pop-up-padding;

    position: absolute;
    height: 140px;
    padding: 20px;
    color: #333;

    &:after {
      position: absolute;
      content: "";
      right: -10px;
      bottom: 18px;
      width: 0;
      height: 0;
      border-left: 0px solid transparent;
      border-right: 10px solid transparent;
      border-bottom: 10px solid #007991;
    }
  }

  &__input {
    position: absolute;
    bottom: 30px;
    border: none;
    border-bottom: 1px solid #d4d4d4;
    padding: 10px;
    width: 82%;
    background: transparent;
    transition: all 0.25s ease;
    outline: none;

    &:focus {
      border-bottom: 1px solid #007991;
      font-family: "Mulish", sans-serif;
    }

    &::placeholder {
      font-family: "Mulish", sans-serif;
    }
  }

  &__button {
    all: initial;

    position: absolute;
    border-radius: 30px;
    border-bottom-right-radius: 0;
    border-top-right-radius: 0;
    background-color: #007991;
    font-family: "Mulish", sans-serif;
    color: #fff;
    padding: 12px 25px;
    display: inline-block;
    font-size: 12px;
    font-weight: bold;
    right: -10px;
    bottom: -20px;
    cursor: pointer;
    transition: all 0.25s ease;
    box-shadow: -5px 6px 20px 0px #1a1a1a66;
  }

  &__close {
    width: 20px;
    height: 20px;
    padding: 0;
    position: absolute;
    top: $pop-up-padding;
    right: $pop-up-padding;
    cursor: pointer;
    border-radius: 50%;
    outline: none;
    border-color: transparent;
  }

  &img {
    width: 15px;
    height: 15px;
  }
}
</style>
