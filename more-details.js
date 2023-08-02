var favData = JSON.parse(window.localStorage.getItem("moreDetails"))
var heroCardBody = document.getElementById("hero-card-body");
var heroDetails = document.getElementById("hero-details");
function ListIntoTable(b){
    str = ""
    list =  b.map(e=>e.name).map(e=>str+=`<li class="list-group-item">${e}</li>`) 
        
    return str
}

function showHeros(hero){
    console.log(hero,"hero")
    //series 
        //name
    //comics
        //name
    //stories
        //name
        //type
    //events
        //name
    heroCardBody.innerHTML = ""
    heroCardBody.innerHTML +=`
    <div class="card" style="width: 18rem;margin:20px;">
         <img src="${hero.thumbnail.path+'/portrait_medium.' + hero.thumbnail.extension}"  class="card-img-top" alt="${hero.name}">
         <div class="card-body">
           <h5 class="card-title">${hero.name}</h5>
            <div  style="display:flex;justify-content:space-between">
                <p>${hero.description}</p>
            </div>

           </div>
           </div>
           `
    var table =  `<ul class="list-group" style="width:45%;height:200px;overflow:scroll;">
    <li class="list-group-item active" aria-disabled="true"><h4>Stories</h4></li>
    ${  
        ListIntoTable(hero.stories.items)
    }
    
  </ul>`
  heroDetails.innerHTML = table
  var table =  `<ul class="list-group" style="width:45%;height:200px;overflow:scroll;">
  <li class="list-group-item active" aria-disabled="true"><h4>Series</h4></li>
  ${  
      ListIntoTable(hero.series.items)
  }
  
</ul>`
heroDetails.innerHTML += table
var table =  `<ul class="list-group" style="width:45%;height:200px;overflow:scroll;">
<li class="list-group-item active" aria-disabled="true"><h4>Comics</h4></li>
${  
    ListIntoTable(hero.comics.items)
}

</ul>`
heroDetails.innerHTML += table
var table =  `<ul class="list-group" style="width:45%;height:200px;overflow:scroll;">
<li class="list-group-item active" aria-disabled="true"><h4>Events</h4></li>
${  
    ListIntoTable(hero.events.items)
}

</ul>`
heroDetails.innerHTML += table

}
showHeros(favData)