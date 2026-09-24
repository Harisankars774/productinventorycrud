let products = [];
const productform = document.getElementById("productform");
const pid = document.getElementById("pid");
const pname = document.getElementById("pname");
const category = document.getElementById("category");
const price = document.getElementById("price");
const quantity = document.getElementById("quantity");
const editstatus = document.getElementById("editstatus");
const tablebody = document.getElementById("tablebody");
const search = document.getElementById("search");
const filterCategory = document.getElementById("filterCategory");

if (sessionStorage.getItem("products")) {
    products = JSON.parse(sessionStorage.getItem("products"));
    displayProductList();
}

productform.addEventListener("submit", function(event) {
    event.preventDefault();

    const productidinput = pid.value.trim();
    const productnameinput = pname.value.trim();
    const categoryinput = category.value;
    const priceinput = price.value;
    const quantityinput = quantity.value;

    if (productidinput && productnameinput && categoryinput && priceinput && quantityinput) {
        const editindex = editstatus.value;

        if (editindex === "") {
            products.push({
                productid: productidinput,
                productname: productnameinput,
                category: categoryinput,
                price: priceinput,
                quantity: quantityinput
            });
        } else {
            products[editindex] = {
                productid: productidinput,
                productname: productnameinput,
                category: categoryinput,
                price: priceinput,
                quantity: quantityinput
            };
           
        }

        sessionStorage.setItem("products", JSON.stringify(products));
        productform.reset();
        displayProductList();
    } else {
        alert("Please fill the form completely");
    }
});

function displayProductList() {
    tablebody.innerHTML = "";

    const searchvalue = search.value.toLowerCase();
    const filtervalue = filterCategory.value;

    products.forEach((item, index) => {
        const matchesSearch = item.productname.toLowerCase().includes(searchvalue);
        const matchesCategory = filtervalue === "All Categories" || item.category === filtervalue;

        if (matchesSearch && matchesCategory) {
            tablebody.innerHTML += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${item.productid}</td>
                    <td>${item.productname}</td>
                    <td>${item.category}</td>
                    <td>${item.price}</td>
                    <td>${item.quantity}</td>
                    <td>
                        <button class="btn btn-warning" onclick="editProduct(${index})">
                            Edit
                        </button>
                        <button class="btn btn-danger" onclick="deleteProduct(${index})">
                            Delete
                        </button>
                    </td>
                </tr>
            `;
        }
    });
}

function editProduct(productindex) {
    const productdetails = products[productindex];

    pid.value = productdetails.productid;
    pname.value = productdetails.productname;
    category.value = productdetails.category;
    price.value = productdetails.price;
    quantity.value = productdetails.quantity;

    editstatus.value = productindex;
}

function deleteProduct(productindex) {
    if (confirm("Are you sure you want to delete this product?")) {
        products.splice(productindex, 1);
        sessionStorage.setItem("products", JSON.stringify(products));
        displayProductList();
    }
}

search.addEventListener("input", function() {
    displayProductList();
});

filterCategory.addEventListener("change", function() {
    displayProductList();
});