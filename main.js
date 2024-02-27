// http://localhost:3000/products
// http://localhost:3000/users

const productApi = "http://localhost:3000/products"
const userApi = "http://localhost:3000/users"

let content = document.querySelector(".content")
let tbody = document.querySelector("tbody")

fetch(productApi).then(res => res.json()).then(products => {
    products.forEach((product, index) => {
        let row = document.createElement("tr")
        row.innerHTML =
            `
        <td>${index + 1}</td>
        <td>${product.name}</td>
        <td>
        <img style="width: 200px;" src="${product.image}" alt="">
        </td>
        <td>${product.price}</td>
        <td>
        <button class="btn btn-warning" onclick="productDetail('${product.id}', '${product.name}', '${product.image}', '${product.price}')">Edit</button>
        <button class="btn btn-danger" onclick="deleteProduct('${product.id}')">Delete</button>
        </td>
        `;
        tbody.appendChild(row)
    });
})

let btnAdd = document.querySelector(".btnAdd")
btnAdd.addEventListener("click", () => {
    content.innerHTML =
        `
    <form style="width: 500px;" id="formAdd">
        <div class="m-3">
            <input type="text" class="form-control" id="name" placeholder="Enter product name">
        </div>
        <div class="m-3">
            <input type="text" class="form-control" id="image" placeholder="Enter product image">
        </div>
        <div class="m-3">
            <input type="text" class="form-control" id="price" placeholder="Enter product price">
        </div>
        <div class="m-3">
            <button class="btn btn-primary" onclick="addProduct()">ADD</button>
        </div>
    </form>
    `
    let formAdd = document.querySelector("#formAdd")
    formAdd.addEventListener("click", (e) => {
        e.preventDefault()
    })
})

function addProduct(){
    let name = document.querySelector("#name").value
    let image = document.querySelector("#image").value
    let price = document.querySelector("#price").value

    if(name == "" || image == "" || price == ""){
        alert("Ban can nhap du thong tin")
        return
    }else{
        if(isNaN(Number(price))){
            alert("Gia phai la so")
            return
        }
        if(Number(price) < 0){
            alert("Gia phai la so duong")
            return
        }
    }

    fetch(productApi, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            name: name,
            image: image,
            price: price
        })
    }).then(res => {
        if(res.ok){
            alert("Them thanh cong")
            return
        }else{
            alert("Them that bai")
            return
        }
    })
}

function productDetail(id, name, image, price){
    content.innerHTML =
        `
    <form style="width: 500px;" id="formUpdate">
        <div class="m-3">
            <input type="text" class="form-control" value="${name}" id="name" placeholder="Enter product name">
        </div>
        <div class="m-3">
        <input type="text" class="form-control" value="${image}" id="image" placeholder="Enter product image">
        </div>
        <div class="m-3">
        <img style="width: 200px;" src="${image}" alt="">
        </div>
        <div class="m-3">
            <input type="text" class="form-control" value="${price}" id="price" placeholder="Enter product price">
        </div>
        <div class="m-3">
            <button class="btn btn-primary" onclick="updateProduct('${id}')">Update</button>
        </div>
    </form>
    `
    let formUpdate = document.querySelector("#formUpdate")
    formUpdate.addEventListener("click", (e) => {
        e.preventDefault()
    })
}

function updateProduct(id){
    let name = document.querySelector("#name").value
    let image = document.querySelector("#image").value
    let price = document.querySelector("#price").value

    if(name == "" || image == "" || price == ""){
        alert("Ban can nhap du thong tin")
        return
    }else{
        if(isNaN(Number(price))){
            alert("Gia phai la so")
            return
        }
        if(Number(price) < 0){
            alert("Gia phai la so duong")
            return
        }
    }

    fetch(`${productApi}/${id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            name: name,
            image: image,
            price: price
        })
    }).then(res => {
        if(res.ok){
            alert("Sua thanh cong")
            return
        }else{
            alert("Sua that bai")
            return
        }
    })
}

function deleteProduct(id){
    let isConfirm = confirm("Xoa la mat luon")
    if(isConfirm){
        fetch(`${productApi}/${id}`, {
            method: "DELETE",
        }).then(res => {
            if(res.ok){
                alert("Xoa thanh cong")
                return
            }else{
                alert("Xoa that bai")
                return
            }
        })
    }else{
        alert("Da huy thao tac xoa")
    }
}