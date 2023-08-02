
var heroCardBody = document.getElementById("hero-card-body");
var paginationNav = document.getElementById("navigation-pagination");
var searchBar = document.getElementById("search-bar");
var HeroData = []
var navPagination = {
     showable:[1,2,3],
     previousActive:false,
     nextActive:true,
     currentPage:1
}
var favData = JSON.parse(window.localStorage.getItem("fav"))
searchBar.addEventListener("input",e=>loadHerosBySearchQuery(e.target.value))
function loadHeros(){

    var url = `https://gateway.marvel.com/v1/public/characters?ts=1690710306795&apikey=25cf978d2ee28527719e8d52a5aee42e&hash=51d675aa851de5fb2cd635fdd56fd602&offset=${(navPagination.currentPage-1)*20}`
    getAllHeros(url)
    showPagination()
}

function loadHerosBySearchQuery(searchQuery){
    // console.log(searchQuery,"hi kirithiv")
    var url = `https://gateway.marvel.com/v1/public/characters?ts=1690710306795&apikey=25cf978d2ee28527719e8d52a5aee42e&hash=51d675aa851de5fb2cd635fdd56fd602&nameStartsWith=${searchQuery}`
    getAllHeros(url)
    showPagination()
}

function checkPresentInFav (id){
    console.log(favData)
    if (favData){
        let d = favData.filter(e=>e.id==id)
        return d.length==0
    }
    return true
}

function showHeros(heroList){
    heroCardBody.innerHTML = ""
    for (var hero in heroList){
    heroCardBody.innerHTML +=`
    <div class="card" style="width: 18rem;margin:20px;">
         <img src="${HeroData[hero].thumbnail.path+'/portrait_medium.' + HeroData[hero].thumbnail.extension}"  class="card-img-top" alt="${HeroData[hero].name}">
         <div class="card-body">
           <h5 class="card-title">${HeroData[hero].name}</h5>
            <div  style="display:flex;justify-content:space-between">
                ${
                    
                    checkPresentInFav(HeroData[hero].id)?`<i id=${hero}  class="fa fa-heart-o" style="font-size:32px;color:red" ></i>`:
                    `<i id=${hero}  class="fa fa-heart" style="font-size:32px;color:red" ></i>`

                }
                <a id="${hero}-moreDetail" href="more-details.html" class="btn btn-primary showMore"> Show More ...</a>
            </div>

           </div>
           </div>
           `
        //    <a href="#" class="btn btn-primary">Show more Details</a>
    //    <p class="card-text">No Description Available</p>
    //    <p>
    //         <b>Comics:</b><span>${hero.comics.available}</span>
    //    </p>
    //    <p>
    //         <b>Series:</b><span>${hero.series.available}</span>
    //    </p>
    //    <p>
    //         <b>Stories:</b><span>${hero.stories.available}</span>
    //    </p>
    }
var favourateIcons = document.querySelectorAll(".fa-heart-o");
favourateIcons.forEach(icon=>{
    icon.addEventListener("click",e=>{
        var index = e.target.id
        var element = document.getElementById(index)
        element.classList.remove('fa-heart-o');
        element.classList.add('fa-heart');
        var goingToFav = HeroData[index]
        favData = window.localStorage.getItem("fav")
        if (favData){
            
            favData = JSON.parse(favData)
        }else{
            favData = []
        }
        favData.push(goingToFav)
        window.localStorage.setItem("fav",JSON.stringify(favData))
    })
})

var favourateIcons = document.querySelectorAll(".fa-heart");
favourateIcons.forEach(icon=>{
    icon.addEventListener("click",e=>{
        var index = e.target.id
        var element = document.getElementById(index)
        element.classList.remove('fa-heart');
        element.classList.add('fa-heart-o');
        var removingFromFav = HeroData[index]
        favData = window.localStorage.getItem("fav")
        if (favData){
            
            favData = JSON.parse(favData)
        }else{
            favData = []
        }
        favData = favData.filter(e=>e.id!=removingFromFav.id)
        window.localStorage.setItem("fav",JSON.stringify(favData))
    })
})
var showMoreButtons = document.querySelectorAll(".showMore");
showMoreButtons.forEach(button=>{
    button.addEventListener("click",(e)=>{
        var index = e.target.id.split("-")[0]
        window.localStorage.setItem("moreDetails",JSON.stringify(HeroData[index]))
    })
})

}
async function getAllHeros(url){

    await fetch(url)
         .then(res => res.json()) //Converting the data into JSON format
         .then(data => {
            HeroData = data.data.results
            showHeros(HeroData)
        }) 
}

window.addEventListener("load", function () {
    // API call to get the data 
    loadHeros()
})
// Get all the page links
function showPagination(){
     paginationNav.innerHTML = ""
     paginationNav.innerHTML += `
     <ul class="pagination">
            <li class="page-item ${navPagination.previousActive?"":"disabled"}">
              <a class="page-link" href="#" tabindex="-1">Previous</a>
            </li>
            <li class="page-item ${navPagination.currentPage==navPagination.showable[0]?"active":""}"><a class="page-link" href="#">${navPagination.showable[0]}</a></li>
            <li class="page-item ${navPagination.currentPage==navPagination.showable[1]?"active":""}">
              <a class="page-link" href="#">${navPagination.showable[1]}</a>
            </li>
            <li class="page-item ${navPagination.currentPage==navPagination.showable[2]?"active":""}"><a class="page-link" href="#">${navPagination.showable[2]}</a></li>
            <li class="page-item  ${navPagination.nextActive?"":"disabled"}">
              <a class="page-link" href="#">Next</a>
            </li>
     </ul>
     `

// Add event listener to each page link
const pageLinks = document.querySelectorAll('.page-link');

pageLinks.forEach(link => {
link.addEventListener('click', function(event) {
     event.preventDefault();

     // Get the active page number
     const activePage = document.querySelector('.page-item.active');

     // Remove 'active' class from the current active page
     activePage.classList.remove('active');

     // Add 'active' class to the clicked page link
     this.parentElement.classList.add('active');
     currentPage = this.innerHTML-1

     if (navPagination.currentPage>1){
          navPagination.previousActive = true 
     }else{
          navPagination.previousActive = false
     }
     if (this.innerHTML=="Previous"){
          let l = []

          navPagination.currentPage -= 1
          for (let i=navPagination.currentPage-1;i<navPagination.currentPage+2;i++){
               l.push(i)
          }
          navPagination.showable = l
          loadHeros()
     }

     if (this.innerHTML=="Next"){
          let l = []

          navPagination.currentPage += 1
          for (let i=navPagination.currentPage-1;i<navPagination.currentPage+2;i++){
               l.push(i)
          }
          navPagination.showable = l
          loadHeros()
          
     }
     console.log(currentPage)
     if (currentPage|| currentPage == 0){
          navPagination.currentPage = currentPage+1
          loadHeros()
     } 

     if (navPagination.currentPage>1){
          navPagination.previousActive = true 
     }else{
          navPagination.previousActive = false
     }
});
});
}