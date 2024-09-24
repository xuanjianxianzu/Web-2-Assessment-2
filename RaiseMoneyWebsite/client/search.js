function startSearch(){
    const organizer = document.getElementById('organizerInput').value;
    const city = document.getElementById('cityInput').value;
    const category = document.getElementById('categoryInput').value;

    let url = 'http://localhost:3060/api/raisemoney/Search/';

    if(organizer){
        url += organizer+'&';
    }else{
        url +='&';
    }

    if(city){
        url += city+'&';
    }else{
        url +='&';
    }

    if(category){
        url += category;
    }
   console.log(url);
    fetch(url)
        .then(response => response.json())
        .then(data =>{
            const dataDiv = document.getElementById('data');
            dataDiv.innerHTML = "";
            console.log(data);
            if(data.length > 0){               //从module4学习的展示获取的表的方法,为了美观后续也许会更改.
                data.forEach(fundraiser => {
                    const newP = document.createElement("p");
                    newP.textContent = `Findraiser ID:${fundraiser.FUNDRAISER_ID},ORGANIZER:${fundraiser.ORGANIZER}`;
                    dataDiv.appendChild(newP);
                    
                });
            }else{
                dataDiv.textContent = "No fundraiser";
            }
        })

        .catch(error =>{
            console.error("Error here",error);
            document.getElementById('data').textContent = "Load failure";
        });
}

function claerChechboxes(){
    document.getElementById('organizerInput').value = '';
    document.getElementById('cityInput').value = '';
    document.getElementById('categoryInput').value = '';
    const dataDiv = document.getElementById('data');
    dataDiv.textContent = "";
}