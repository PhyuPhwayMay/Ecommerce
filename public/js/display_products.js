function loadBothProductCat(){       //function to display the details of the products
    var request= new XMLHttpRequest();
    request.open("GET", '/category', true);
    request.onload=function(){
        categoryArray=JSON.parse(request.responseText)
        console.log(categoryArray)
        loadProductData(categoryArray) //take in category Array to combine with product details
    };
    request.send()
}

function loadProductData(categoryArray)
{
    var request = new XMLHttpRequest();

    var productArray=[];

    request.open('GET', 'http://localhost:8080/product', true);

    request.onload = function () {
        productArray=JSON.parse(request.responseText)
        insertDynamicProducts(productArray,categoryArray) //inserting the items on the product array
    };

    request.send();
}


function insertDynamicProducts(productArray,categoryArray){
    var dynamicProductList = document.getElementById("dynamicProductDataList")
        let newContent="<table><tr>";
        
        for(let i=0; i < productArray.length; i++){
            
            newContent += //adding new Content to the table
                "<td><h3>" + productArray[i].name+"<h3>"+
                "<a href='/updateproducts.html?id="+productArray[i].id+"'>"+
                "<img src='" + productArray[i].picture+ "' alt='" + productArray[i].name + "' width='400' height='400'><br></a>"+
                "<p>ID : " + productArray[i].id +"<br>"+
                "Desciption : " + productArray[i].description +"<br>"+
                "Price : " + productArray[i].price +"<br>";
                
                for(let j=0; j<categoryArray.length; j++){ //to print out the category name instead of category ID
                    if (productArray[i].category_id===categoryArray[j].id){
                        newContent+="Category : " + categoryArray[j].name +"</p></td><br><td width=5%></td>";
                    }
                }
                if ((i+1) % 3 === 0 && i<productArray.length - 1){ //adding a new row after every 3 items
                    newContent += "</tr><tr>"
                }
        }


            newContent += "</tr></table>";
            
            dynamicProductList.innerHTML = newContent;
}

function goInsert(){ //go to insert page
    var target="/insertproducts.html";
    location.href=target;
}

function goEdit(){
    var target="/editproducts.html";
    location.href=target;
}

function showCategoryDetails(){ //go to category page
    location.href='/category.html';
}
