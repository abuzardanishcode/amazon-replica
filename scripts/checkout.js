import { cart, removeCartItem, updateCartQuantity } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";


let checkoutHtml = '';
cart.forEach((cartItem) => {

    const productId = cartItem.productId;
    let matchingItem;

    products.forEach((product) => {
        if (product.id === productId) {
            matchingItem = product;
        }

    });

    console.log(matchingItem);

    checkoutHtml += `<div class="cart-item-container cart-item-container-${matchingItem.id}">
            <div class="delivery-date">
              Delivery date: Tuesday, June 21
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingItem.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingItem.name}
                </div>
                <div class="product-price">
                  $${formatCurrency(matchingItem.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary update-quantity-link-js" data-update-id="${matchingItem.id}">
                    Update
                  </span>
                  <input class="quantity-input js-quantity-input-${matchingItem.id}"><span class="save-quantity-link  link-primary" data-save-id=${matchingItem.id}>Save</span>
                  <span class="delete-quantity-link link-primary delete-quantity-link-js" data-product-id="${matchingItem.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                <div class="delivery-option">
                  <input type="radio" checked
                    class="delivery-option-input"
                    name="delivery-option-${matchingItem.id}">
                  <div>
                    <div class="delivery-option-date">
                      Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                      FREE Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingItem.id}">
                  <div>
                    <div class="delivery-option-date">
                      Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                      $4.99 - Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingItem.id}">
                  <div>
                    <div class="delivery-option-date">
                      Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                      $9.99 - Shipping
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>`;

});
document.querySelector('.order-summary-js').innerHTML = checkoutHtml;

document.querySelectorAll('.delete-quantity-link-js')
    .forEach((link) => {
        link.addEventListener('click', () => {
            const deleteditem = link.dataset.productId;

            removeCartItem(deleteditem);
            console.log("This id should deleted" + deleteditem);

            const removeContainer = document.querySelector(`.cart-item-container-${deleteditem}`);
            removeContainer.remove();
            updateCartQuantity();
        });
    });


/*function updateCartQuantity() {

    let cartQuantity = 0;
    cart.forEach((checkoutItem) => {
        cartQuantity += checkoutItem.quantity;
    });

    document.querySelector('.js-checkout-item-quantity').innerHTML = `${cartQuantity} items`;
}

updateCartQuantity();*/


document.querySelectorAll('.update-quantity-link-js').forEach((updatelink) => {

    updatelink.addEventListener('click', () => {
        const updateId = updatelink.dataset.updateId;
        console.log("successfully clicked on update button", updateId);

        const updateContainer = document.querySelector(`.cart-item-container-${updateId}`);

        console.log(updateContainer);
        updateContainer.classList.add('is-editing-container');

    })
});


document.querySelectorAll('.save-quantity-link').forEach((savelink) => {

    savelink.addEventListener('click', () => {

        const saveID = savelink.dataset.saveId;

        console.log(saveID);
        const saveValue = document.querySelector(`.js-quantity-input-${saveID}`);
        const saveContainer = document.querySelector(`.cart-item-container-${saveID}`);
        saveContainer.classList.remove('is-editing-container');

        let updatedQuantity = saveValue.value;
        console.log(updatedQuantity);

    })
});


