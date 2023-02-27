const API_KEY = "MqYPRT0FMYv4I0cgiPRsRXBih7qnvIwL";

async function getRates(baseCurrency, params) {
  const cachedRates = JSON.parse(localStorage.getItem(baseCurrency));

  if (cachedRates) {
    return cachedRates.rates;
  }

  const url = (params === 'latest') ? (
    `https://api.apilayer.com/exchangerates_data/latest?&base=${baseCurrency}`
  ) : (
    'https://api.apilayer.com/exchangerates_data/symbols'
  );

  const myHeaders = new Headers();
  myHeaders.append("apikey", API_KEY);

  const requestOptions = {
    method: "GET",
    redirect: "follow",
    headers: myHeaders,
  };

  const response = await fetch(url, requestOptions);
  const data = await response.json();
  
  if (params === 'latest') {
    localStorage.setItem(`${baseCurrency}`, JSON.stringify(data));
  } else {
    localStorage.setItem("currensiesDataList", JSON.stringify(data));
  }

  return data.rates;
}

function calculateResult(amount, rates, toCurrency) {
  if (rates) {
    return rates[toCurrency] * amount || null;
  }
  return null;
}

export { getRates, calculateResult };