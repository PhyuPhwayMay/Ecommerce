
var categoryArray=[]; //setting an empty array to load categories
function finalSetOfProduct(){       //function to display the details of the products
    var request= new XMLHttpRequest();
    request.open("GET", '/category', true);
    request.onload=function(){
        categoryArray=JSON.parse(request.responseText)
        console.log(categoryArray)
        loadProductDetail(categoryArray) //putting the category array into the loadProductDetail to get both category array and product arrays to be put into setProductDetail
    };
    request.send()
}


function loadProductDetail(){
    var request = new XMLHttpRequest();

    var params= new URLSearchParams(location.search);
    var id=params.get("id");

    console.log("id" + id);
    var product;
    var urlLink="/product/" + id;

    request.open("GET", urlLink, true);

    request.onload = function(){
        product=JSON.parse(request.responseText);
        console.log(product);
        setProductDetail(product[0],categoryArray);

    }
    request.send();
}


function setProductDetail(product){//setting the details according to the id
    
    document.getElementById('product_name').value = product.name;
    document.getElementById('description').value = product.description;
    document.getElementById('price').value = product.price;
    document.getElementById('product_image').value = product.picture;
    document.getElementById('id').value=product.id;
    document.getElementById('deleteButton').setAttribute("pId", product.id);
    var cat=document.getElementById('category')
    let newContent='<select class="fillform" name="category" id="category" required>';
    for (let i=0; i<categoryArray.length; i++){
        if (categoryArray[i].id==product.category_id){
            newContent += "<option value='"+ categoryArray[i].id +"'>"+ categoryArray[i].name+"</option><br>";
        }
    }
    for (let i=0; i<categoryArray.length; i++){
        if (categoryArray[i].id!=product.category_id){
            newContent += "<option value='"+ categoryArray[i].id +"'>"+ categoryArray[i].name+"</option><br>";
        }
    }
    newContent += '</select><br><br>';
    cat.innerHTML=newContent;

}

function updateProductData(){
    var product={
        name : document.getElementById("product_name").value,
        description : document.getElementById("description").value,
        category_id : document.getElementById("category").value,
        price : document.getElementById("price").value,
        picture : document.getElementById("product_image").value,
    }; 

    if(!product.name || !product.description || !product.price || !product.picture){
        alert("Name, description, price and picture are required fields.");
        return;
    };

    var id=document.getElementById('id').value;

    var request= new XMLHttpRequest();
    var urlLink = '/product/'+id;
    request.open("PUT", urlLink , true);
    request.setRequestHeader("Content-Type", "application/json");

    request.onload= function(){
        if(request.status >= 200 && request.status < 300){
            alert("Product updated successfully.");
            location.href='homepage.html';
        }else{
            alert("Error: "+request.statusText);
        }
    };
    request.onerror=function(){
        alert("Network Error");
    }
    request.send(JSON.stringify(product));
}

function deleteProductData(item){
    var id = item.getAttribute("pId");
    console.log("delete_id"+id)

    var request = new XMLHttpRequest();

    request.open("delete", "/product/" + id, true);

    request.onload = function(){
        alert("Product deleted successfully.")
        location.href= "/homepage.html"
    }
    request.send();
}

function home(){ //going back to home
    location.href='/homepage.html'
}