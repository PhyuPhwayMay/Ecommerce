//functions for display of category for category.html
function loadCategoryData() //to load the categories present into an array
{
    var request = new XMLHttpRequest();

    var categoryArray=[];

    request.open('GET', 'http://localhost:8080/category', true);

    request.onload = function () {
        categoryArray=JSON.parse(request.responseText)
        insertDynamicCategory(categoryArray) //for displaying
    };

    request.send();
}


function insertDynamicCategory(categoryArray){ //for the display of categories according to database
    var dynamicCategory = document.getElementById("dynamicCategoryDataList")
        let newContent=
            "<table><tr>";
        
        for(let i=0; i < categoryArray.length; i++){
            
            newContent += 
                "<td><h2>" + categoryArray[i].id +"</h2>"+
                "<a href='/updatecategory.html?id="+categoryArray[i].id+"'>"+
                "<p class='container'>"+categoryArray[i].name +"</p></a></td><td width=5%></td>";
                
            if ((i+1) % 3 === 0 && i<categoryArray.length - 1){ //adding a new row after every 3 items
                newContent += "</tr><tr>"
            }
        }


            newContent += "</tr></table><br>";
            
            dynamicCategory.innerHTML = newContent;
}

function goInsert(){ //redirecting to insert page
    var target="/insertcategory.html";
    location.href=target;
}

//functions for insertcategory.html
function insertCategory(){ //taking in the filled up items and sending over to the backend server
    var category={
        name: document.getElementById('category_name').value
    };

    if(!category.name){
        alert("Name is a required field.");
        return;
    }
    var request= new XMLHttpRequest();
    request.open("POST", "http://localhost:8080/category", true);
    request.setRequestHeader("Content-Type", "application/json");

    request.onload= function(){
        if(request.status >= 200 && request.status < 300){
            alert("Category added successfully.");
            location.href='category.html';
        }else{
            alert("Error: "+request.statusText);
        }
    };
    request.onerror=function(){
        alert("Network Error");
    }
    request.send(JSON.stringify(category));
}

//functions for updatecategory.html
function categoriesAvailable()
{
    var request = new XMLHttpRequest();

    var categoryArray=[];

    request.open('GET', 'http://localhost:8080/category', true);

    request.onload = function () {
        categoryArray=JSON.parse(request.responseText)
        showId(categoryArray);
    };

    request.send();
}

function showId(categoryArray){
    var availableId=document.getElementById("chosen_id")
    let newContent='<option>--Select id to edit--</option><br>';
    for (let i=0; i<categoryArray.length; i++){
        newContent+=
            "<option value='"+categoryArray[i].id +"'>"+ categoryArray[i].id+ categoryArray[i].name+"</option><br>";
    }
    availableId.innerHTML=newContent;
}

function modifyCat(){
    var idToModify=document.getElementById("chosen_id").value;
    var target="/updatecategory.html?id="+idToModify;
    console.log(target)
    location.href=target;
}

function loadingCatDataForUpdate(){
    var request = new XMLHttpRequest();

    var params= new URLSearchParams(location.search);
    var id=params.get("id");

    console.log("id" + id);
    var category;
    var urlLink="/category/" + id;

    request.open("GET", urlLink, true);

    request.onload = function(){
        category=JSON.parse(request.responseText);
        console.log(category);
        setCategoryDetail(category[0]);

    }
    request.send();
}

function setCategoryDetail(category){

    document.getElementById('category_name').value = category.name;
    document.getElementById('id').value = category.id;
    document.getElementById('deleteButton').setAttribute("catId", category.id);

}

function updateCategoryData(){
    var category={
        name: document.getElementById('category_name').value
    };

    if(!category.name){
        alert("Name is a required field.");
        return;
    }
    var id = document.getElementById('id').value;

    var request = new XMLHttpRequest();
    var urlLink = '/category/' + id;
    request.open("PUT", urlLink, true);
    request.setRequestHeader("Content-Type", "application/json");

    request.onload= function(){
        if(request.status >= 200 && request.status < 300){
            alert("Category updated successfully.");
            location.href='category.html';
        }else{
            alert("Error: "+request.statusText);
        }
    };
    request.onerror=function(){
        alert("Network Error");
    }
}

function deleteCategoryData(item){
    var id = item.getAttribute("catId");
    console.log("delete_id"+id)

    var request = new XMLHttpRequest();

    request.open("delete", "/category/" + id, true);

    request.onload = function(){
        alert("Category deleted successfully.")
        location.href= "/category.html"
    }
    request.send();
}

function goHome(){
    location.href="/homepage.html";
}