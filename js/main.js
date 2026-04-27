function renderProductCards() {
    let productList = document.querySelector(".product-items");
    productList.innerHTML = "";

    if (!productList) {
        const productBlock = document.querySelector('#product')
        productList = createElement("div", "product-items")
        productBlock.appendChild(productList)
    }

    order_information.forEach((item) => productList.append(createProductCars(item)))
}

function createProductCars(item) {
    const card = createElement("article","product-item",null,{id: `card_order_${item.id}`});
    const imgEl = createElement('img', 'product-item--img', null,
        {src: item.img, width: 200, height: 200, alt: item.name})
    const textEl = createElement('p', 'product-item--name', item.name)
    const buttonBlock = createElement('div','product-item--button', null,{ id: `buttonBlock_order_${item.id}`})
    renderButtonBlock(item.id,buttonBlock)

    card.append(imgEl, textEl, buttonBlock)
    return card
}

function renderButtonBlock(id,div){
    div.innerHTML = ''
    let productArray = getOrdersArray()
    const productOrder= productArray.find(item => item?.id === id)

    if(productOrder?.count){
        const plusBtn = createElement('button', 'header-menu-item--btn', "+", {type: "button"})
        plusBtn.addEventListener('click', () => handleOrderButton(id,"plus"))
        const minusBtn = createElement('button', 'header-menu-item--btn', "-", {type: "button"})
        minusBtn.addEventListener('click', () => handleOrderButton(id,"minus"))
        const inputEl = createElement('input', 'product-item--name', null,{type: "number", id: `input_count_${id}`, value:productOrder.count})
        inputEl.addEventListener('change', () => handleOrderButton(id))
        div.append(plusBtn,inputEl,minusBtn)
    }else{
        const buttonEl = createElement('a', 'header-menu-item', "Оставить заявку", {href: "#form", id: `button_order_${id}`})
        buttonEl.addEventListener('click', () => handleOrderButton(id,"plus"))
        div.append(buttonEl)
    }
}

function handleOrderButton(id,val=null) {
    const product = order_information.find(item => item.id === id)
    let productArray = getOrdersArray()
    const productOrder= productArray.find(item => item?.id === id)
    if (productOrder) {
        if(val==="plus"){
            product.count=Number(productOrder.count) + 1
        }else if(val==="minus"){
            product.count=Number(productOrder.count) - 1
        } else {
            const countOrder = document.querySelector(`#input_count_${id}`).value
            productOrder.count = Number(countOrder)
        }
    } else {
        product.count=1
        productArray.push(product)
    }
    localStorage.setItem('order', JSON.stringify(productArray))
    const textareaEl = document.querySelector('#comment')
    let textName=''
    productArray.forEach((item,index) => {
        let text= item?.name+':'+item?.count
        if(index!==productArray.length-1) text= text + ','+'\n'
        textName = textName + ' ' + text
    })
    textareaEl.value = `Здравствуйте! Хочу заказать \n ${textName}.\n Одну банку каждого, пожалуйста.`
}

function getOrdersArray(){
    const orders=localStorage.getItem('order')
    let productArray=[]
    if(orders && orders !== "undefined" && orders !== "null") productArray = JSON.parse(orders)
    return productArray
}

renderProductCards()