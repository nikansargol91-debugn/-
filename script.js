let products = [];
let cart = [];
let orders = [];

// نمایش بخش‌ها
function openSection(id) {
  document.querySelectorAll("section").forEach(sec => sec.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
  if (id === "cart") displayCart();
  if (id === "orders") displayOrders();
}

function login() {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;

  if (user === "niloo" && pass === "Nilooya") {
    alert("ورود ادمین مجاز نیست!");
    return;
  }

  alert("ورود موفق!");
  openSection("admin"); // همه کاربران وارد پنل مدیریت می‌شوند به جز ادمین
}

function addProduct() {
  const code = document.getElementById("pCode").value;
  const name = document.getElementById("pName").value;
  const price = document.getElementById("pPrice").value;
  const image = document.getElementById("pImage").value;
  const category = document.getElementById("pCategory").value;

  const product = { code, name, price, image, category };
  products.push(product);
  displayProducts();
}

function displayProducts() {
  const container = document.getElementById("products");
  container.innerHTML = "";
  products.forEach(p => {
    const div = document.createElement("div");
    div.innerHTML = `
      <h3>${p.name}</h3>
      <img src="${p.image}" width="100">
      <p>قیمت: ${p.price} تومان</p>
      <p>مد: ${p.category}</p>
      <button onclick="addToCart('${p.code}')">افزودن به سبد خرید</button>
    `;
    container.appendChild(div);
  });
}

function addToCart(code) {
  const product = products.find(p => p.code === code);
  cart.push(product);
  alert("محصول به سبد خرید اضافه شد");
}

function displayCart() {
  const list = document.getElementById("cartItems");
  list.innerHTML = "";
  let total = 0;
  cart.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - ${item.price} تومان`;
    list.appendChild(li);
    total += parseInt(item.price);
  });
  const totalLi = document.createElement("li");
  totalLi.textContent = `جمع کل: ${total} تومان`;
  list.appendChild(totalLi);
}

function submitOrder() {
  let name = prompt("نام خود را وارد کنید:");
  let phone = prompt("شماره تماس خود را وارد کنید:");
  const order = { name, phone, items: [...cart] };
  orders.push(order);
  cart = [];
  alert("درخواست شما ثبت شد.");
}

function displayOrders() {
  const list = document.getElementById("ordersList");
  list.innerHTML = "";
  orders.forEach((o, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      سفارش ${index + 1}: ${o.name} - ${o.phone}
      <ul>
        ${o.items.map(i => `<li>${i.name} (${i.price} تومان)</li>`).join("")}
      </ul>
    `;
    list.appendChild(li);
  });
}
