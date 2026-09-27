let products = [];


// GET DATA FROM SESSION STORAGE

if (sessionStorage.getItem("products"))
{
    products = JSON.parse(sessionStorage.getItem("products"));

    displayproducts();
}


// ADD / EDIT PRODUCT

formid.addEventListener("submit", function(event)
{
    event.preventDefault();

    const productid = pid.value;
    const productname = pname.value;
    const categoryinput = category.value;
    const priceinput = price.value;
    const quantityinput = quantity.value;

    if (productid && productname && categoryinput && priceinput && quantityinput)
    {
        const editindex = editstatus.value;

        // ADD PRODUCT

        if (editindex == "")
        {
            products.push({
                prid: productid,
                prname: productname,
                caip: categoryinput,
                prip: priceinput,
                quip: quantityinput
            });
        }

        // EDIT PRODUCT

        else
        {
            products[editindex] = {
                prid: productid,
                prname: productname,
                caip: categoryinput,
                prip: priceinput,
                quip: quantityinput
            };
        }

        sessionStorage.setItem("products", JSON.stringify(products));

        formid.reset();

        editstatus.value = "";

        displayproducts();
    }

    else
    {
        alert("Please enter valid values");
    }
});


// DISPLAY PRODUCTS

function displayproducts()
{
    tablebody.innerHTML = "";

    products.forEach(function(item, index)
    {
        tablebody.innerHTML +=
        `
            <tr>

                <td>${index + 1}</td>

                <td>${item.prid}</td>

                <td>${item.prname}</td>

                <td>${item.caip}</td>

                <td>${item.prip}</td>

                <td>${item.quip}</td>

                <td>

                    <button
                        class="btn btn-warning"
                        onclick="editproduct(${index})">
                        Edit
                    </button>

                    <button
                        class="btn btn-danger"
                        onclick="deleteproduct(${index})">
                        Delete
                    </button>

                </td>

            </tr>
        `;
    });
}


// EDIT PRODUCT

function editproduct(editindex)
{
    const productdetails = products[editindex];

    pid.value = productdetails.prid;

    pname.value = productdetails.prname;

    category.value = productdetails.caip;

    price.value = productdetails.prip;

    quantity.value = productdetails.quip;

    editstatus.value = editindex;
}


// DELETE PRODUCT

function deleteproduct(deleteindex)
{
    if (confirm("Are you sure?"))
    {
        products.splice(deleteindex, 1);

        sessionStorage.setItem(
            "products",
            JSON.stringify(products)
        );

        displayproducts();
    }
}


// FILTER PRODUCTS

function filterproducts()
{
    let name = search.value.toLowerCase();

    let cat = categoryfilter.value;

    let filteredproducts = products.filter(function(item)
    {
        return item.prname.toLowerCase().includes(name)
               &&
               (cat == "" || item.caip == cat);
    });


    tablebody.innerHTML = "";


    filteredproducts.forEach(function(item, index)
    {
        tablebody.innerHTML +=
        `
            <tr>

                <td>${index + 1}</td>

                <td>${item.prid}</td>

                <td>${item.prname}</td>

                <td>${item.caip}</td>

                <td>${item.prip}</td>

                <td>${item.quip}</td>

                <td>

                    <button class="btn btn-warning" onclick="editproduct(${index})">
                        Edit
                    </button>

                    <button class="btn btn-danger" onclick="deleteproduct(${index})">
                        Delete
                    </button>

                </td>

            </tr>
        `;
    });
}


// SEARCH EVENT

search.addEventListener("input", filterproducts);


// CATEGORY FILTER EVENT

categoryfilter.addEventListener("change", filterproducts);