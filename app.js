const totalMoney = document.querySelector(".totalMoney >h1 >span");
const products = document.querySelectorAll(".product");

products.forEach((product) => {
  const buyBtn = product.querySelector(".buySell >button:last-child");
  const sellBtn = product.querySelector(".buySell >button:first-child");
  const value = product.querySelector("span").textContent.split(",").join("");
  const amountProduct = product.querySelector(".buySell >input");
  let total = Number(totalMoney.textContent.split(",").join(""));
  buyBtn.addEventListener("click", () => {
    amountProduct.value++;
    //let totalProductMoney = amountProduct.value * value;
    total = total - value;
    totalMoney.textContent = numberWithCommas(total);
  });
  sellBtn.addEventListener("click", () => {
    amountProduct.value--;
    //let totalProductMoney = amountProduct.value * value;
    total = Number(total) + Number(value);
    totalMoney.textContent = numberWithCommas(total);
  });
});

function numberWithCommas(data) {
  return data.toLocaleString();
}
