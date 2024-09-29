
document.addEventListener('DOMContentLoaded', function () {
    const container = document.getElementById('checkbox');
    fetch('http://localhost:3060/api/raisemoney/use/search/CATEGORY')
  .then(response => response.json())
  .then(data => {
            data.forEach(category => {
                if (category && category['NAME']) {
                    const checkbox = document.createElement('input');
                    checkbox.type = 'radio';
                    checkbox.value = category['NAME'];
                    checkbox.id = 'checkbox_' + category['NAME'];
                    checkbox.name = 'category';
                    const label = document.createElement('label');
                    label.textContent = category['NAME'];
                    label.htmlFor = 'checkbox_' + category['NAME'];
                    container.appendChild(checkbox);
                    container.appendChild(label);
                    container.appendChild(document.createElement('br'));
                } else {
                    console.log('Need more data');
                }
            });
        })
  .catch(error => console.error('Error:', error));
});

function startSearch(){
    const organizer = document.getElementById('organizerInput').value;
    const city = document.getElementById('cityInput').value;
    let category = document.querySelector('input[name="category"]:checked')?.value;  
    if (category === undefined) {  
        category = '';  
    }
    let url = 'http://localhost:3060/api/raisemoney/Search/';   
    if(organizer||city||category){
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
                    newP.addEventListener("click",function(){
                        localStorage.setItem("ORGANIZER",fundraiser.ORGANIZER);
                        location.href = '/fundraiser';
                    });
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
        
    }else{
        alert('At least one piece of data needs to be provided for lookup!');
        const dataDiv = document.getElementById('data');
        dataDiv.textContent = "";
    }
}

function claerChechboxes(){
    document.getElementById('organizerInput').value = '';
    document.getElementById('cityInput').value = '';
    const radioButtons = document.querySelectorAll('input[id^="checkbox_"]');
    radioButtons.forEach(function (radioButton) {
        radioButton.checked = false;
    });
    const dataDiv = document.getElementById('data');
    dataDiv.textContent = "";
}