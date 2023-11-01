form.addEventListener('submit',addProduct)
form = document.getElementById('form');
getProduct()
async function getCurrentTotalCartValue() {
  try {
    const response = await axios.get(
      "https://crudcrud.com/api/c680c2ec467648ccb8cc7fd3712330b4/product-data"
    );
    let totalCartValue = 0;
    let totalCartItems = 0;

    if (response.data.length !== 0) {
        totalCartItems = response.data.length;
        totalCartValue = response.data.reduce(
        (accumulator, currentValue) => accumulator + parseInt(currentValue.selling_price),
        0
      );
    }
    let totalCartValueElement = document.createElement("span");
    totalCartValueElement.id = "total-cart-value";
    totalCartValueElement.textContent = `-${totalCartValue}`;

    let cartElement = document.getElementById("cart-value");
    cartElement.appendChild(totalCartValueElement);

    let totalCartItemElement = document.createElement("span");
    totalCartItemElement.id = "total-cart-item";
    totalCartItemElement.textContent = `-${totalCartItems}`;
    let cartItemElement = document.getElementById("cart")
    cartItemElement.appendChild(totalCartItemElement);



  } catch (error) {
    console.log("Error fetching current totalCartValue:", error);
  }
}
function updateCurrentTotalCartValueOnPage() {
  let totalCartValueElement = document.getElementById("total-cart-value");
  totalCartValueElement.remove();

  let totalCartItemElement = document.getElementById("total-cart-item");
  totalCartItemElement.remove();


  getCurrentTotalCartValue();
}

function showAllProductsOnPage(response){
    
    for(let i = 0;i<response.data.length;i++){
        let li = document.createElement('li');
    let detail = document.createElement('div');
        detail.id = response.data[i]._id
        let div = document.createElement('div')
        detail.appendChild(div);
        
        for(key in response.data[i]){
            div.innerHTML = `<table style="width: 90%; padding: 6px; margin: 30px;">
                      <tr class="border-1">
                        <th class="border-1">Product Name</th>
                        <th class="border-1">Selling Price</th>
                        <th class="border-1">Product Category</th>
                        <th class="border-1">Delete</th>
                        <th class="border-1">Update</th>
                      </tr>
                      <tr class="border-1">
                        <td class="border-1">${response.data[i].product_name}</td>
                        <td class="border-1">${response.data[i].selling_price}</td>
                        <td class="border-1">${response.data[i].product_category}</td>
                        <td class="border-1">
                            <button class="btn btn-danger btn-sm input-group-text m-1" onclick="deleteProduct('${response.data[i]._id}')">
                                Delete
                            </button>
                        </td>
                        <td class="border-1">
                            <button class="btn btn-warning btn-sm input-group-text m-1" onclick="updateProduct('${response.data[i]._id}')">
                                Edit
                            </button>
                        </td>
                      </tr>
                   </table>`;
                   
    }
    
    
    li.appendChild(detail)
    ul = document.querySelector(`#${response.data[i].product_category}`)
    ul.appendChild(detail)
}
}

function emptyAllInputBox(){
    document.querySelector("#product-name").value = '';
    document.querySelector("#selling-price").value = '';
    document.querySelector("#product-category").value = '';

    if(document.querySelector("#update-button")){
        document.querySelector("#update-button").remove();
    }

}

function showAddedProduct(response){
    
    let detail = document.createElement('div');
    detail.id = response.data._id;
    let div = document.createElement('div');
    for(key in response.data){
          div.innerHTML = `<table style="width: 90%; padding: 6px; margin: 30px;">
                      <tr class="border-1">
                        <th class="border-1">Product Name</th>
                        <th class="border-1">Selling Price</th>
                        <th class="border-1">Product Category</th>
                        <th class="border-1">Delete</th>
                        <th class="border-1">Update</th>
                      </tr>
                      <tr class="border-1">
                        <td class="border-1">${response.data.product_name}</td>
                        <td class="border-1">${response.data.selling_price}</td>
                        <td class="border-1">${response.data.product_category}</td>
                        <td class="border-1">
                            <button class="btn btn-danger btn-sm input-group-text m-1" onclick="deleteProduct('${response.data._id}')">
                                Delete
                            </button>
                        </td>
                        <td class="border-1">
                            <button class="btn btn-warning btn-sm input-group-text m-1" onclick="updateProduct('${response.data._id}')">
                                Edit
                            </button>
                        </td>
                      </tr>
                   </table>`;
    }
    detail.appendChild(div)
    ul = document.querySelector(`#${response.data.product_category}`);
    ul.appendChild(detail);
    
}

function showEditedProduct(response){
    document.getElementById(`${response.data._id}`).remove();
    showAddedProduct(response);
}

function showInputDataOnEditpage(data) {
  document.querySelector("#product-name").value = data.product_name;
  document.querySelector("#selling-price").value = data.selling_price;
  document.querySelector("#product-category").value = data.product_category;
}


//-----------------------------------API Calling Starts Here--------------------------------//


function getProduct(){
    axios
      .get(
        "https://crudcrud.com/api/c680c2ec467648ccb8cc7fd3712330b4/product-data"
      )
      .then((response) => {
        showAllProductsOnPage(response);
        getCurrentTotalCartValue();
      })
      .catch((err) => {
        console.log(err);
      });
}

async function addProduct(event){
    event.preventDefault();

    const product_name = event.target.querySelector('#product-name').value;
    const selling_price = event.target.querySelector('#selling-price').value;
    const product_category = event.target.querySelector('#product-category').value;
    const obj = {
        product_name,
        selling_price,
        product_category
    }
    try{
        const response = await axios.post('https://crudcrud.com/api/c680c2ec467648ccb8cc7fd3712330b4/product-data',obj)
        updateCurrentTotalCartValueOnPage();
        showAddedProduct(response);
        emptyAllInputBox();
    }
    catch(error){
        console.log("Error Occured:",error)
    }
    
    // axios
    //   .post("https://crudcrud.com/api/c680c2ec467648ccb8cc7fd3712330b4/product-data", obj)
    //   .then((response) => {
    //     location.reload();
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
}


function deleteOnPage(id){
    let del_elem = document.getElementById(id)
    del_elem.remove();
}
function deleteProduct(id){
    
    axios.delete(`https://crudcrud.com/api/c680c2ec467648ccb8cc7fd3712330b4/product-data/${id}`)
    .then((response)=>{
        deleteOnPage(id);
        updateCurrentTotalCartValueOnPage();
    }).catch((err)=>{
        console.log(err)
    })
}


function updateProduct(id){
    axios(`https://crudcrud.com/api/c680c2ec467648ccb8cc7fd3712330b4/product-data/${id}`)
    .then((response)=>{
        showInputDataOnEditpage(response.data)
    }).catch((err)=>{
        console.log(err)
    })
    let updateBtn = document.createElement('button')
    updateBtn.textContent="update"
    updateBtn.id = "update-button"
    document.querySelector('#form-div').appendChild(updateBtn)
    
    updateBtn.addEventListener('click',putData)

    async function putData(event){
        event.preventDefault()
        const product_name = document.querySelector('#product-name').value;
        const selling_price = document.querySelector('#selling-price').value;
        const product_category = document.querySelector('#product-category').value;

        const obj ={
            product_name,
            selling_price,
            product_category
        }

        try{
            await axios.put(`https://crudcrud.com/api/c680c2ec467648ccb8cc7fd3712330b4/product-data/${id}`,obj)
            const response = await axios.get(`https://crudcrud.com/api/c680c2ec467648ccb8cc7fd3712330b4/product-data/${id}`);
            showEditedProduct(response);
            updateCurrentTotalCartValueOnPage();
            emptyAllInputBox();
        }
        catch(error){
            console.log(error)
        }
    }

}