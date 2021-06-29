let subtotalPrice = 0;
fetch('/data.json')
    .then(res => res.json())
    .then(data => displayProduct(data))
    .catch(err => console.log(err))

const displayProduct = products => {

    const productsDiv = document.getElementById('products');
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.id = `${product.product_id}`;
        productDiv.className = 'card products-card col-sm-2';
        const productInfo = `
            <img class="img-fluid pImage" src="${product.product_image}" alt="...">
            <p class="body-text">${product.product_name}</p>
        `;
        productDiv.innerHTML = productInfo;
        productsDiv.appendChild(productDiv);

        productDiv.onclick = () => {
            handleClick(product.product_id, product);
        };
    });
}

const handleClick = (id, product) => {

    const productsCard = document.getElementById(id);
    const cardBody = document.getElementById('cart-body');
    const productCard = document.createElement('div');
    productCard.className = `shopping-cart ${id}`;

    // Add Sub Total Price
    subtotalPrice += product.product_price;

    let subTotalElement = document.getElementById('subTotal');
    subTotalElement.innerText = subtotalPrice;
    let payNowElement = document.getElementById('payNow');
    payNowElement.innerText = subtotalPrice;

    const productCardInfo = `
            <div class="row cart-items">
                <div class="col-3">
                    <img class="img-fluid cart-image" src="${product.product_image}" alt="...">
                </div>
                <div class="col-2 quantity-input">
                    <input class="quantity" type="number" value="1"></input>
                </div>
                <div class="col-3">
                    <p class="body-text">${product.product_name}</p>
                </div>
                <div class="col-2">
                    <p>BDT <span class="product-price">${product.product_price}</span></p>
                </div>
                <div class="col-2">
                    <i class="fas fa-trash-alt btnDelete"></i>
                </div>
            </div>
        `;

    productCard.innerHTML = productCardInfo;
    cardBody.appendChild(productCard);

    const removeItems = document.getElementsByClassName('btnDelete');
    for (let i = 0; i < removeItems.length; i++) {
        const button = removeItems[i];
        button.addEventListener('click', function (event) {
            if (product.product_price === parseFloat(event.target.parentElement.parentElement.childNodes[7].childNodes[1].childNodes[1].childNodes[0].data)) {
                updateTotal(parseFloat(event.target.parentElement.parentElement.childNodes[7].childNodes[1].childNodes[1].childNodes[0].data));
                console.log(parseFloat(event.target.parentElement.parentElement.childNodes[7].childNodes[1].childNodes[1].childNodes[0].data));
            }
            
            let deleteBtn = event.target;
            deleteBtn.parentElement.parentElement.parentElement.remove();
        })
    }

    // Tried to follow yt tutorial here, but didn't workout!

    let quantityInputs = document.getElementsByClassName('quantity')
    for (let i = 0; i < quantityInputs.length; i++) {
        let input = quantityInputs[i];
        input.addEventListener('change', quantityChanged());
    }
}

// Tried to follow yt tutorial here, but didn't workout!
const quantityChanged = (event) => {
    let input = event.target;

    if(input.value <= 0){
        input.value = 1;
    }
    updateTotal();
}

const updateTotal = (price) => {
    subtotalPrice -= price;

    let subTotalElement = document.getElementById('subTotal');
    subTotalElement.innerText = subtotalPrice;
    let payNowElement = document.getElementById('payNow');
    payNowElement.innerText = subtotalPrice;

}
