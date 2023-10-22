
form.addEventListener('submit',addProduct)
form = document.getElementById('form');
getProduct()

function showProductOnPage(response){
    
    for(let i = 0;i<response.data.length;i++){
        let li = document.createElement('li');
    let detail = document.createElement('div');
        detail.id = response.data[i]._id
        let p = document.createElement('p')
        for(key in response.data[i]){
            p.innerHTML = `<strong>Product Name</strong>:${response.data[i].prodcut_name}
            <strong>Selling Price:</strong>${response.data[i].selling_price}
            <strong>Product Category:</strong>${response.data[i].product_category}`
    }
    detail.appendChild(p)
    let delete_btn = document.createElement('button');
    delete_btn.value = response.data[i]._id
    delete_btn.textContent = "Delete"
    delete_btn.addEventListener('click',function(event) {
        event.preventDefault();
        deleteProduct(delete_btn.value);
    });
    let edit_btn = document.createElement('button')
    edit_btn.value = response.data[i]._id
    edit_btn.textContent = "Edit"
    edit_btn.addEventListener('click',function(event) {
        event.preventDefault();
        updateProduct(edit_btn.value);
    });
    
    detail.appendChild(delete_btn)
    detail.appendChild(edit_btn)
    li.appendChild(detail)
    ul = document.querySelector(`#${response.data[i].product_category}`)
    ul.appendChild(detail)
}
}
async function getProduct(){
    axios.get('https://crudcrud.com/api/ad61d9023c68461fbdde4983a1037277/product-data')
    .then((response)=>{
        showProductOnPage(response)
    }).catch((err)=>{
        console.log(err)
    })
}

async function addProduct(event){
    event.preventDefault();

    const prodcut_name = event.target.querySelector('#product-name').value;
    const selling_price = event.target.querySelector('#selling-price').value;
    const product_category = event.target.querySelector('#product-category').value;
    const obj = {
        prodcut_name,
        selling_price,
        product_category
    }
    axios.post('https://crudcrud.com/api/ad61d9023c68461fbdde4983a1037277/product-data',obj).
    then((response)=>{
        location.reload();
    }).catch((err)=>{
        console.log(err)
    })
}



function deleteOnPage(id){
    let del_elem = document.getElementById(id)
    del_elem.remove();
}
async function deleteProduct(id){
    
    axios.delete(`https://crudcrud.com/api/ad61d9023c68461fbdde4983a1037277/product-data/${id}`)
    .then((response)=>{
        deleteOnPage(id);
    }).catch((err)=>{
        console.log(err)
    })
}

function showEditpage(data){

        document.querySelector('#product-name').value = data.prodcut_name
        document.querySelector('#selling-price').value = data.selling_price
        document.querySelector('#product-category').value = data.product_category


    }

async function updateProduct(id){
    await axios(`https://crudcrud.com/api/ad61d9023c68461fbdde4983a1037277/product-data/${id}`)
    .then((response)=>{
        showEditpage(response.data)
    }).catch((err)=>{
        console.log(err)
    })
    let update = document.createElement('button')
    update.textContent="update"
    document.querySelector('#form-div').appendChild(update)


    
    update.addEventListener('click',putData)

    async function putData(event){
        event.preventDefault()
        const prodcut_name = document.querySelector('#product-name').value;
        const selling_price = document.querySelector('#selling-price').value;
        const product_category = document.querySelector('#product-category').value;

        const obj ={
            prodcut_name,
            selling_price,
            product_category
        }

        await axios.put(`https://crudcrud.com/api/ad61d9023c68461fbdde4983a1037277/product-data/${id}`,obj)
        .then((res)=>{
            location.reload();
        }).catch((err)=>{
            console.log(err)
        })
    }

}