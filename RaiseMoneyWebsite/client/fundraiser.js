document.addEventListener('DOMContentLoaded',function(){
    const organizer = localStorage.getItem('ORGANIZER');
    if(organizer){
        const url = 'http://localhost:3060/api/raisemoney/'+organizer;
        fetch(url)
        .then(response => response.json())
        .then(data =>{
            const dataDiv = document.getElementById('data');
            dataDiv.innerHTML = "";
            console.log(data);
            if(data.length > 0){             
                data.forEach(fundraiser => {
                    const newP = document.createElement("p");
                    newP.textContent = `Findraiser ID:${fundraiser.FUNDRAISER_ID},ORGANIZER:${fundraiser.ORGANIZER}`;
    
                    dataDiv.appendChild(newP);
                    
                });
            }else{
                dataDiv.textContent = "No fundraiser";
            }
        })
    }


});



function toDonate(){
    alert('This feature is under contruction');
}