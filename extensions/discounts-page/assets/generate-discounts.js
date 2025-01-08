document.addEventListener("DOMContentLoaded", function () {
  const productList = document.querySelector("#product-list");
  const orderValueElement = document.querySelector("#order-value");
  const amountToMinimumElement = document.querySelector("#amount-to-minimum");
  const orderValueAfterElement = document.querySelector("#order-value-after");
  const savingsElement = document.querySelector("#savings");

  // Fetch minimum spend from the data attribute
  const discountDataElement = document.querySelector("#discount-data");
  const minimumSpend = parseFloat(discountDataElement.dataset.minimum);

  console.log("Minimum Spend (Parsed):", minimumSpend);

  productList.addEventListener("input", function () {
    let orderValue = 0;

    document.querySelectorAll(".product-quantity").forEach((input) => {
      const quantity = parseFloat(input.value) || 0;
      const priceCents =
        parseFloat(input.closest("li").dataset.productPrice) || 0;
      const priceDollars = priceCents / 100;
      orderValue += quantity * priceDollars;
    });

    orderValueElement.textContent = orderValue.toFixed(2);

    const minCalc = minimumSpend - orderValue;
    console.log("Order Value:", orderValue, "Min Calc:", minCalc);

    amountToMinimumElement.textContent =
      minCalc > 0 ? minCalc.toFixed(2) : "Minimum Hit";

    orderValueAfterElement.textContent =
      orderValue > minimumSpend
        ? (orderValue * 0.9).toFixed(2)
        : orderValue.toFixed(2);
    savingsElement.textContent =
      orderValue > minimumSpend
        ? (orderValue * 0.1).toFixed(2)
        : "Hit minimum to unlock savings";
  });
});
