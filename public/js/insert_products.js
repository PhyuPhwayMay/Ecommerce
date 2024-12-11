function insertProduct(){   //inserting the new product data and sending back to database
    var product={
        name : document.getElementById("product_name").value,
        description : document.getElementById("description").value,
        category_id : document.getElementById("category").value,
        price : document.getElementById("price").value,
        picture : document.getElementById("product_image").value,
    }; 

    if(!product.name || !product.description || !product.price || !product.picture){ //checking if the fields are filled in
        alert("Name, description, price and picture are required fields.");
        return;
    }

    var request= new XMLHttpRequest();
    request.open("POST", "http://localhost:8080/product", true);
    request.setRequestHeader("Content-Type", "application/json");

    request.onload= function(){
        if(request.status >= 200 && request.status < 300){
            alert("Product added successfully.");
            location.href='homepage.html';
        }else{
            alert("Error: "+request.statusText);
        }
    };
    request.onerror=function(){ //input is not correct for the database
        alert("Network Error");
    }
    request.send(JSON.stringify(product));
}

function displayCategory(){ //function for making a dropdown of categories
    var request= new XMLHttpRequest();
    var categoryArray=[];
    request.open("GET", '/category', true);
    request.onload=function(){
        categoryArray=JSON.parse(request.responseText)
        console.log(categoryArray)
        showCat(categoryArray)

    };
    request.send()
}

function showCat(categoryArray){ //formatting the category in order by taking in the data from displayCategory function
    var categoryData=document.getElementById("category")
    let newContent='<option>--Select a Category--</option><br>';
    for (let i=0; i<categoryArray.length; i++){
        newContent+=
            "<option value='"+ categoryArray[i].id +"'>"+ categoryArray[i].name+"</option><br>";
    }
    categoryData.innerHTML=newContent;
}

function home(){ //going back to home
    location.href='/homepage.html'
}