const totalMoney = document.querySelector(".totalMoney >h1 >span");
const products = document.querySelectorAll(".product");
const receipt = document.querySelector(".receipt");
let total = Number(totalMoney.textContent.split(",").join(""));

const totalMoneyC = 187000000000;
let buyBtns = [];

products.forEach((product) => {
  const buyBtn = product.querySelector(".buySell >button:last-child");
  const sellBtn = product.querySelector(".buySell >button:first-child");
  const value = product.querySelector("span").textContent.split(",").join("");
  const amountProduct = product.querySelector(".buySell >input");
  let deyer = 0;
  let say = 0;
  sellBtn.disabled = true;

  const events = ["keyup", "click"];
  events.forEach((event) => {
    document.body.addEventListener(event, () => {
      EnableButton();

      if (total <= value) {
        buyBtns.push(buyBtn);
        buyBtns.forEach((button) => {
          button.disabled = true;
          button.style.backgroundColor = "rgb(220, 220, 220)";
        });
      } else {
        buyBtns = [];
      }
    });
  });
  buyBtn.addEventListener("click", () => {
    say++;
    amountProduct.value++;
    total -= value;
    totalMoney.textContent = numberWithCommas(total);
    sellBtn.disabled = false;
    sellBtn.style.backgroundColor = "rgb(214, 48, 49)";
    info();
  });
  sellBtn.addEventListener("click", () => {
    say--;
    amountProduct.value--;
    total += Number(value);
    totalMoney.textContent = numberWithCommas(total);
    if (amountProduct.value == 0) {
      sellBtn.disabled = true;
      sellBtn.style.backgroundColor = "rgb(220, 220, 220)";
    }
    info();
  });

  amountProduct.addEventListener("keyup", () => {
    console.log("say" + say);
    total += say * value;
    if (amountProduct.value > 0) {
      sellBtn.disabled = false;
      sellBtn.style.backgroundColor = "rgb(214, 48, 49)";
    } else {
      sellBtn.disabled = true;
      sellBtn.style.backgroundColor = "rgb(220, 220, 220)";
    }
    if (amountProduct.value < 0) {
      amountProduct.value = 0;
    }
    total += deyer;
    let totalProductMoney = amountProduct.value * value;
    if (amountProduct.value * value > total) {
      amountProduct.value = Math.trunc(total / value);
      totalProductMoney = amountProduct.value * value;
    }
    deyer = Number(totalProductMoney);
    if (amountProduct.value == 0) {
      sellBtn.disabled = true;
      sellBtn.style.backgroundColor = "rgb(220, 220, 220)";
      deyer = 0;
    }
    total -= Number(totalProductMoney);
    totalMoney.textContent = numberWithCommas(total);
    info();
    total -= say * value;
  });
  amountProduct.addEventListener("keydown", (e) => {
    if (e.which === 38 || e.which === 40) {
      e.preventDefault();
    }
  });
});

function numberWithCommas(data) {
  return data.toLocaleString();
}

function info() {
  const receiptProduct = document.querySelectorAll(".receipt_product");
  const totalAmountReceipt = document.querySelector(".totalAmount");
  receiptProduct.forEach((product) => {
    product.remove();
  });
  let total = 0;
  products.forEach((product) => {
    const amountProduct = product.querySelector(".buySell >input");
    if (amountProduct.value > 0) {
      const receiptDiv = document.createElement("div");
      receiptDiv.classList.add("receipt_product");
      const value = product
        .querySelector("span")
        .textContent.split(",")
        .join("");
      const totalProductMoney = amountProduct.value * value;
      total += totalProductMoney;
      receiptDiv.innerHTML = `<h3>${product.children[1].textContent}</h3><h3>${
        amountProduct.value
      }</h3><h3>${"$" + totalProductMoney}</h3>`;
      receipt.prepend(receiptDiv);
    }
  });
  receipt.children.length <= 2
    ? (receipt.parentElement.style.display = "none")
    : (receipt.parentElement.style.display = "block");
  totalAmountReceipt.textContent = "$" + numberWithCommas(total);
}

function EnableButton() {
  buyBtns.forEach((button) => {
    button.disabled = false;
    button.style.backgroundColor = "rgb(162, 155, 254)";
  });
}
