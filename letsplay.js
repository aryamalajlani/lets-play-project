// هنا تعريف الدالة updateCartCount قبل كل شيء
let cartItemCount = 0; // عدد المنتجات في السلة
const updateCartCount = change => { 
  const cartItemCountBadge = document.querySelector(".cart-item-count");
  cartItemCount += change;
  if (cartItemCount > 0) {
    cartItemCountBadge.style.visibility = "visible"; // إظهار العدد
    cartItemCountBadge.textContent = cartItemCount;
  } else {
    cartItemCountBadge.style.visibility = "hidden"; // إخفاء العدد
    cartItemCountBadge.textContent = "";
  }
};

// باقي الكود كما هو
const cartIcon = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const cartClose = document.querySelector("#cart-close");

cartIcon.addEventListener("click", () => cart.classList.add("active"));
cartClose.addEventListener("click", () => cart.classList.remove("active"));

const addCartButtons = document.querySelectorAll(".add-cart");
addCartButtons.forEach(button => {
  button.addEventListener("click", event => {
    const productBox = event.target.closest(".product-box");
    if (cartContent.children.length < 5) { // السماح بإضافة 5 منتجات فقط
      addToCart(productBox);
    } else {
      alert("You can only add up to 5 products to the cart.");
    }
  });
});

const cartContent = document.querySelector(".cart-content");
const addToCart = productBox => {
  const productImgSrc = productBox.querySelector("img").src;
  const productTitle = productBox.querySelector(".product-title").textContent;
  const productPrice = productBox.querySelector(".price").textContent;

  const cartItems = cartContent.querySelectorAll(".cart-product-title");
  for (let item of cartItems) {
    if (item.textContent === productTitle) {
      alert("This item is already in the cart.");
      return;
    }
  }

  const cartBox = document.createElement("div");
  cartBox.classList.add("cart-box");
  cartBox.innerHTML = `
    <img src="${productImgSrc}" class="cart-img" height="100px" width="40px">
    <div class="cart-detail">
      <h2 class="cart-product-title">${productTitle}</h2>
      <span class="cart-price">${productPrice}</span>
      <div class="cart-quantity">
        <button id="decrement">-</button>  
        <span class="number">1</span> 
        <button id="increment">+</button>
      </div>
    </div>
    <i class="ri-delete-bin-line cart-remove"></i>
  `;
  cartContent.appendChild(cartBox);

  // حذف المنتج
  cartBox.querySelector(".cart-remove").addEventListener("click", () => {
    cartBox.remove();
    updateTotalPrice();
    updateCartCount(-1); // تقليل العدد عند الحذف
  });

  // تحديث الكمية
  cartBox.querySelector(".cart-quantity").addEventListener("click", event => {
    const numberElement = cartBox.querySelector(".number");
    let quantity = parseInt(numberElement.textContent); // تحويل النص إلى رقم

    if (event.target.id === "decrement" && quantity > 1) {
      quantity--;
      if (quantity === 1) {
        event.target.style.color = "#999"; // اللون عند الحد الأدنى
      }
    } else if (event.target.id === "increment" && quantity < 5) {
      quantity++;
      cartBox.querySelector("#decrement").style.color = "#333"; // إعادة اللون
    }

    numberElement.textContent = quantity; // تحديث الكمية
    updateTotalPrice();
  });

  updateCartCount(1); // زيادة العدد عند الإضافة
  updateTotalPrice();
};

const updateTotalPrice = () => {
  const totalPriceElement = document.querySelector(".total-price");
  const cartBoxes = document.querySelectorAll(".cart-box");
  let total = 0;
  cartBoxes.forEach(cartBox => {
    const priceElement = cartBox.querySelector(".cart-price");
    const quantityElement = cartBox.querySelector(".number");
    const price = parseFloat(priceElement.textContent.replace("$", ""));
    const quantity = parseInt(quantityElement.textContent);
    total += price * quantity;
  });
  totalPriceElement.textContent = `$${total.toFixed(2)}`;
};


const buyNowButton = document.querySelector(".btn-buy"); // استدعاء الزر

buyNowButton.addEventListener("click", (event) => {
    const cartContent = document.querySelector(".cart-content"); // تحديد محتوى السلة
    const cartBoxes = cartContent ? cartContent.querySelectorAll(".cart-box") : [];

    if (cartBoxes.length === 0) {
        alert("Your cart is empty. Please add items to your cart before buying.");
        event.preventDefault(); // منع الانتقال إذا السلة فارغة
        return;
    }

 cartBoxes.forEach(cartBox => cartBox.remove());
  
  
  const removedItems = cartItemCount; 
  cartItemCount = 0; 
  updateCartCount(-removedItems); 
  
  
  updateTotalPrice();

    // هنا يمكن تخصيص الصفحة المطلوبة
    window.location.href = "checkout.html"; // الانتقال إلى صفحة الدفع
});
const checkoutForm = document.getElementById("checkout-form");

checkoutForm.addEventListener("submit", (event) => {
    event.preventDefault(); // منع الإرسال الافتراضي

    // جمع البيانات المدخلة
    const fullName = document.getElementById("full-name").value;
    const address = document.getElementById("address").value;
    const city = document.getElementById("city").value;
    const zipCode = document.getElementById("zip-code").value;
    const paymentMethod = document.getElementById("payment-method").value;
    const shippingCompany = document.getElementById("shipping-company").value;

    if (!fullName || !address || !city || !zipCode) {
        alert("Please fill out all required fields.");
        return;
    }

    alert(`
Thank you for your order, ${fullName}!
Your order will be shipped to:
${address}, ${city}, ${zipCode}.
Payment Method: ${paymentMethod}.
Shipping Company: ${shippingCompany}.
    `);

    // يمكن إعادة التوجيه إلى صفحة شكر بعد التأكيد
    window.location.href = "thank-you.html";
});


