
document.addEventListener("DOMContentLoaded", function () {

    // 1. PRODUCT SEARCH
    const searchInput = document.getElementById("productSearch");
    const products = document.querySelectorAll(".product-card");

    if (searchInput) {
        searchInput.addEventListener("input", function () {

            const searchValue = searchInput.value.toLowerCase();

            products.forEach(function (product) {
                const productName = product.textContent.toLowerCase();

                product.style.display =
                    productName.includes(searchValue) ? "" : "none";
            });
        });
    }

    // 2. SHOPPING CART
    let cart = JSON.parse(localStorage.getItem("bairgsCart")) || [];

    // ADD PRODUCTS TO CART
    products.forEach(function (product) {

        const button = product.querySelector("button");

        if (!button) return;

        button.addEventListener("click", function () {

            const name = product.querySelector("b").textContent.trim();
            const priceText = product.querySelector("small").textContent;
            const price = Number(priceText.replace(/[^\d]/g, ""));
            const image = product.querySelector("img").getAttribute("src");

            const existingProduct = cart.find(function (item) {
                return item.name === name;
            });

            if (existingProduct) {
                existingProduct.quantity++;
            } else {
                cart.push({
                    name: name,
                    price: price,
                    image: image,
                    quantity: 1
                });
            }

            localStorage.setItem("bairgsCart", JSON.stringify(cart));

            alert(name + " added to your cart!");
        });
    });

    // 3. DISPLAY CART ITEMS
    const cartBody = document.getElementById("cartItemsBody");

    if (cartBody) {

        cartBody.innerHTML = "";

        let subtotal = 0;

        if (cart.length === 0) {
            cartBody.innerHTML =
                "<tr><td colspan='3'>Your cart is empty.</td></tr>";
        }

        cart.forEach(function (item, index) {

            subtotal += item.price * item.quantity;

            const row = document.createElement("tr");

            const imageCell = document.createElement("td");
            const img = document.createElement("img");

            img.src = item.image;
            img.alt = item.name;
            img.width = 45;

            imageCell.appendChild(img);

            const detailsCell = document.createElement("td");

            detailsCell.textContent =
                item.name + " | Quantity: " + item.quantity +
                " | R" + (item.price * item.quantity);

            const actionCell = document.createElement("td");
            const removeButton = document.createElement("button");

            removeButton.textContent = "REMOVE";

            removeButton.addEventListener("click", function () {
                cart.splice(index, 1);
                localStorage.setItem("bairgsCart", JSON.stringify(cart));
                location.reload();
            });

            actionCell.appendChild(removeButton);

            row.appendChild(imageCell);
            row.appendChild(detailsCell);
            row.appendChild(actionCell);

            cartBody.appendChild(row);
        });

        // 4. CALCULATE ORDER TOTALS
        const delivery = cart.length > 0 ? 100 : 0;

        document.getElementById("cartSubtotal").textContent = subtotal;
        document.getElementById("deliveryFee").textContent = delivery;
        document.getElementById("cartTotal").textContent =
            subtotal + delivery;
    }

});

    // 5. PRODUCT IMAGE LIGHTBOX
    const productImages = document.querySelectorAll(".product-card img");

    productImages.forEach(function (img) {

        img.style.cursor = "zoom-in";

        img.addEventListener("click", function () {

            const lightbox = document.createElement("div");

            lightbox.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.9);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 9999;
                cursor: zoom-out;
            `;

            const enlargedImage = document.createElement("img");

            enlargedImage.src = img.src;
            enlargedImage.alt = img.alt;
            enlargedImage.style.cssText = `
                max-width: 85%;
                max-height: 85%;
                object-fit: contain;
            `;

            lightbox.appendChild(enlargedImage);
            document.body.appendChild(lightbox);

            lightbox.addEventListener("click", function () {
                lightbox.remove();
            });

        });

    });