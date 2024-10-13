
export let cart = JSON.parse(localStorage.getItem('cart'));

if (!cart) {
   cart =  [
        {
            productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            quantity: 2

        },
        {
            productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
            quantity: 1
        },
        {
            productId: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
            quantity: 5
        }
    ];
}

function saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}


export function addtocart(productId) {
    let matchingItem;
    const selecteditem = document.querySelector(`.quantity-selector-${productId} select`);
    const selectedvalueString = (selecteditem.value);
    const selectedValue = Number(selectedvalueString);

    cart.forEach((item) => {
        if (productId === item.productId) {
            matchingItem = item;
        }
    });

    if (matchingItem) {
        matchingItem.quantity += selectedValue;
    } else {
        cart.push(
            {
                productId: productId,
                quantity: selectedValue
            }
        );
    }

    saveToStorage();
}

export function removeCartItem(Id) {

    const newCart = [];

    cart.forEach((cartItem) => {

        if (cartItem.productId !== Id) {
            newCart.push(cartItem);
        }

    })

    cart = newCart;
    saveToStorage();

}

export function updateCartQuantity(){
    let cartQuantity = 0;

    cart.forEach((cartitem) => {
        cartQuantity += cartitem    .quantity;
    });


    console.log(cartQuantity);
    console.log(cart);
    document.querySelector('.js-cart-quantity')
        .innerHTML = cartQuantity;
} 