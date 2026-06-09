function formatCurrency(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2
  }).format(Number.isFinite(value) ? value : 0);
}

function formatPercent(value) {
  return `${(Number.isFinite(value) ? value : 0).toFixed(2)}%`;
}

function numberFrom(input) {
  return Number.parseFloat(input?.value) || 0;
}

document.querySelectorAll("[data-fee-calculator]").forEach((calculator) => {
  const volumeInput = calculator.querySelector("[data-volume]");
  const feeInput = calculator.querySelector("[data-fee-rate]");
  const rebateInput = calculator.querySelector("[data-rebate]");
  const monthlyOutput = calculator.querySelector("[data-monthly-fee]");
  const savingsOutput = calculator.querySelector("[data-monthly-savings]");
  const annualOutput = calculator.querySelector("[data-annual-savings]");

  function updateCalculator() {
    const volume = numberFrom(volumeInput);
    const feeRate = numberFrom(feeInput);
    const rebate = numberFrom(rebateInput);
    const monthlyFee = volume * (feeRate / 100);
    const monthlySavings = monthlyFee * (rebate / 100);
    const annualSavings = monthlySavings * 12;

    monthlyOutput.textContent = formatCurrency(monthlyFee);
    savingsOutput.textContent = formatCurrency(monthlySavings);
    annualOutput.textContent = formatCurrency(annualSavings);
  }

  [volumeInput, feeInput, rebateInput].forEach((input) => {
    input?.addEventListener("input", updateCalculator);
  });

  updateCalculator();
});

document.querySelectorAll("[data-compound-calculator]").forEach((calculator) => {
  const principalInput = calculator.querySelector("[data-principal]");
  const contributionInput = calculator.querySelector("[data-contribution]");
  const returnInput = calculator.querySelector("[data-return]");
  const yearsInput = calculator.querySelector("[data-years]");
  const futureOutput = calculator.querySelector("[data-future-value]");
  const contributionOutput = calculator.querySelector("[data-total-contributions]");

  function updateCalculator() {
    const principal = numberFrom(principalInput);
    const contribution = numberFrom(contributionInput);
    const annualReturn = numberFrom(returnInput) / 100;
    const years = Math.max(0, numberFrom(yearsInput));
    const months = Math.round(years * 12);
    const monthlyReturn = annualReturn / 12;
    let futureValue = principal;

    for (let month = 0; month < months; month += 1) {
      futureValue = futureValue * (1 + monthlyReturn) + contribution;
    }

    const totalContributions = principal + contribution * months;
    futureOutput.textContent = formatCurrency(futureValue);
    contributionOutput.textContent = formatCurrency(totalContributions);
  }

  [principalInput, contributionInput, returnInput, yearsInput].forEach((input) => {
    input?.addEventListener("input", updateCalculator);
  });

  updateCalculator();
});

document.querySelectorAll("[data-gain-calculator]").forEach((calculator) => {
  const buyInput = calculator.querySelector("[data-buy-price]");
  const sellInput = calculator.querySelector("[data-sell-price]");
  const quantityInput = calculator.querySelector("[data-quantity]");
  const costsInput = calculator.querySelector("[data-extra-costs]");
  const profitOutput = calculator.querySelector("[data-profit-loss]");
  const percentOutput = calculator.querySelector("[data-gain-percent]");

  function updateCalculator() {
    const buyPrice = numberFrom(buyInput);
    const sellPrice = numberFrom(sellInput);
    const quantity = numberFrom(quantityInput);
    const extraCosts = numberFrom(costsInput);
    const costBasis = buyPrice * quantity + extraCosts;
    const proceeds = sellPrice * quantity;
    const profit = proceeds - costBasis;
    const gainPercent = costBasis > 0 ? (profit / costBasis) * 100 : 0;

    profitOutput.textContent = formatCurrency(profit);
    percentOutput.textContent = formatPercent(gainPercent);
  }

  [buyInput, sellInput, quantityInput, costsInput].forEach((input) => {
    input?.addEventListener("input", updateCalculator);
  });

  updateCalculator();
});
