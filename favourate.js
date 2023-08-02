var favData = JSON.parse(window.localStorage.getItem("fav"))
var heroCardBody = document.getElementById("hero-card-body");

function showHeros(heroList){
    heroCardBody.innerHTML = ""
    for (var hero in heroList){
        console.log(hero,"i")
    heroCardBody.innerHTML +=`
    <div class="card" style="width: 18rem;margin:20px;">
         <img src="${heroList[hero].thumbnail.path+'/portrait_medium.' + heroList[hero].thumbnail.extension}"  class="card-img-top" alt="${heroList[hero].name}">
         <div class="card-body">
           <h5 class="card-title">${heroList[hero].name}</h5>
            <div  style="display:flex;justify-content:space-between">
                ${
                    
                    `<i id=${hero}  class="fa fa-heart" style="font-size:32px;color:red" ></i>`
                }
                <a id="${hero}-moreDetail" href="more-details.html" class="btn btn-primary showMore"> Show More ...</a>
            </div>

           </div>
           </div>
           `
    }

var favourateIcons = document.querySelectorAll(".fa-heart");
favourateIcons.forEach(icon=>{
    icon.addEventListener("click",e=>{
        var index = e.target.id
        var element = document.getElementById(index)
        element.classList.remove('fa-heart');
        element.classList.add('fa-heart-o');
        var removingFromFav = heroList[index]
        favData = window.localStorage.getItem("fav")
        if (favData){
            
            favData = JSON.parse(favData)
        }else{
            favData = []
        }
        favData = favData.filter(e=>e.id!=removingFromFav.id)
        window.localStorage.setItem("fav",JSON.stringify(favData))
        showHeros(favData)
    })
})

var showMoreButtons = document.querySelectorAll(".showMore");
showMoreButtons.forEach(button=>{
    button.addEventListener("click",(e)=>{
        var index = e.target.id.split("-")[0]
        console.log()
        window.localStorage.setItem("moreDetails",JSON.stringify(favData[index]))
    })
})
}
showHeros(favData)