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
  sellBtn.disabled = true;

  document.body.addEventListener("click", () => {
    /* if (amountProduct.value * value >= total) {
      amountProduct.value = Math.trunc(total / value);
    }*/
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
    // console.log(buyBtns);
  });
  buyBtn.addEventListener("click", () => {
    console.log("buy");
    // EnableButton();
    amountProduct.value++;
    total -= value;
    totalMoney.textContent = numberWithCommas(total);
    sellBtn.disabled = false;
    sellBtn.style.backgroundColor = "rgb(214, 48, 49)";
    info();
  });
  sellBtn.addEventListener("click", () => {
    console.log("sell");
    //  EnableButton();
    amountProduct.value--;
    total += Number(value);
    totalMoney.textContent = numberWithCommas(total);
    if (amountProduct.value == 0) {
      sellBtn.disabled = true;
      sellBtn.style.backgroundColor = "rgb(220, 220, 220)";
    }
    info();
  });
  // let eventList = ["change", "keyup"];
  // for (event of eventList) {
  //   amountProduct.addEventListener(event, () => {
  //     // EnableButton();
  //     // let total = Number(totalMoney.textContent.split(",").join(""));
  //     if (amountProduct.value > 0) {
  //       sellBtn.disabled = false;
  //       sellBtn.style.backgroundColor = "rgb(214, 48, 49)";
  //     } else {
  //       sellBtn.disabled = true;
  //       sellBtn.style.backgroundColor = "rgb(220, 220, 220)";
  //     }
  //     if (amountProduct.value < 0) {
  //       amountProduct.value = 0;
  //     }
  //     if (total < value) {
  //       buyBtns.forEach((button) => {
  //         button.disabled = true;
  //         button.style.backgroundColor = "rgb(220, 220, 220)";
  //         amountProduct.value = Math.trunc(totalMoneyC / value);
  //       });
  //     }
  //     // totalMoney.textContent = "187,000,000,000";
  //     //total = Number(totalMoney.textContent.split(",").join(""));
  //     const totalProductMoney = amountProduct.value * value;
  //     if (amountProduct.value * value > total) {
  //       amountProduct.value = Math.trunc(total / value);
  //     }
  //     total = Number(total) - Number(totalProductMoney);
  //     totalMoney.textContent = numberWithCommas(total);
  //     info();
  //   });
  //   return;
  // }
  amountProduct.addEventListener("change", () => {
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
    // total += amountProduct.value * value;
    const totalProductMoney = amountProduct.value * value;
    deyer = totalProductMoney;
    //total += totalProductMoney;
    if (amountProduct.value * value > total) {
      amountProduct.value = Math.trunc(total / value);
      total -= amountProduct.value * value;
      totalMoney.textContent = numberWithCommas(total);
      return;
    }
    total -= Number(totalProductMoney);
    totalMoney.textContent = numberWithCommas(total);
    console.log(deyer);
    info();
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
// function formatAmount() {
//   totalMoney.textContent = "187,000,000,000";
//   total = Number(totalMoney.textContent.split(",").join(""));
// }
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
