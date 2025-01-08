document.addEventListener("DOMContentLoaded", function () {
  const addToCartButton = document.querySelector("#add-to-cart-button");

  addToCartButton.addEventListener("click", function () {
    let items = [];
    document.querySelectorAll(".product-quantity").forEach((input, index) => {
      let quantity = parseInt(input.value);
      if (quantity > 0) {
        // Add product to the items array with the preorder property
        items.push({
          id: document
            .querySelectorAll(".product-quantity")
            [index].closest("li").dataset.productId,
          quantity: quantity,
          properties: {
            preorder: "true",
          },
        });
      }
    });

    // Create the form data
    let formData = {
      items: items,
    };

    // Send the request to the cart
    fetch(window.Shopify.routes.root + "cart/add.js", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Cart updated:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
});
