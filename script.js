
// Shopping Cart functions

var shoppingCart = (function () {
    // Private methods and properties
    var cart = [];

    function Item(name, price, discount,count,type) {
        this.name = name
        this.price = price
        this.discount=discount
        console.log(this.discount)
        this.count = count
        this.type=type
    }

    function saveCart() {
        localStorage.setItem("shoppingCart", JSON.stringify(cart));
    }


    function loadCart() {
      
        cart = JSON.parse(localStorage.getItem("shoppingCart"));
        if (cart === null) {

          cart=[]
                

           
          
        }
    }

    loadCart();



    // Public methods and properties
    var obj = {};

    obj.addItemToCart = function (name, price, discount,count,type) {
        for (var i in cart) {
            if (cart[i].name === name) {
                cart[i].count += count;
                saveCart();
                return;
            }
        }

        console.log("addItemToCart:", name, price,discount, count,type);

        var item = new Item(name, price, discount,count,type);
        cart.push(item);
        saveCart();
    };

    obj.setCountForItem = function (name, count) {
        for (var i in cart) {
            if (cart[i].name === name) {
                cart[i].count = count;
                break;
            }
        }
        saveCart();
    };


    obj.removeItemFromCart = function (name) { // Removes one item
        for (var i in cart) {
              if (cart[i].name === name) { // "3" === 3 false
                cart[i].count--; // cart[i].count --
                if (cart[i].count === 0) {
                    // showing popup when user removes the only item 
                   $('#exampleModalLong').modal('show');
                    cart.splice(i, 1);
                }
                break;
            }
        }
        saveCart();
    };


    obj.removeItemFromCartAll = function (name) { // removes all item name
        for (var i in cart) {
            if (cart[i].name === name) {
                cart.splice(i, 1);
                break;
            }
        }
        saveCart();
    };


    obj.clearCart = function () {
        cart = [];
        saveCart();
    }


    obj.countCart = function () { // -> return total count
        var totalCount = 0;
        for (var i in cart) {
            totalCount += cart[i].count;
        }

        return totalCount;
    };
    obj.totalMrpCost = function () { // -> return total cost
        var totalMrp = 0;
        for (var i in cart) {
            totalMrp += cart[i].price *cart[i].count;
        }
        return totalMrp.toFixed(2);
    };

    obj.totalCart = function () { // -> return total cost
        var totalCost = 0;
        var discountCost = 0;
        var typeDiscount=0;
        for (var i in cart) {
            if (cart[i].type==='fiction')
            {
                typeDiscount += cart[i].price *cart[i].count*0.15;
            }
            totalCost += cart[i].price * cart[i].count;
            discountCost += cart[i].price *cart[i].count*(cart[i].discount)/100;
        }
        totalCost-=(discountCost+typeDiscount)
        return totalCost.toFixed(2);
    };
     obj.discountCart = function () { // -> return total cost
        var discountCost = 0;
        for (var i in cart) {

            discountCost += cart[i].price *cart[i].count*(cart[i].discount)/100;
        }
        return discountCost.toFixed(2);
    };
    obj.typeDiscount = function () { // -> return total cost
        var typeDiscount = 0;
        for (var i in cart) {
            if (cart[i].type==='fiction')
            {
                typeDiscount += cart[i].price *cart[i].count*0.15;
            }
            
            
        }
        return typeDiscount.toFixed(2);
    };

    obj.listCart = function () { // -> array of Items
        var cartCopy = [];
        console.log("Listing cart");
        console.log(cart);

        for (var i in cart) {
            console.log(i);
            var item = cart[i];
            var itemCopy = {};
            for (var p in item) {
                itemCopy[p] = item[p];
            }
            itemCopy.total = (item.price * item.count).toFixed(2);
            cartCopy.push(itemCopy);
        }
        return cartCopy;
    };

    // ----------------------------
    return obj;
})();




