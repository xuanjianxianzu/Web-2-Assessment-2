
document.addEventListener('DOMContentLoaded', function () {
    const dropDown = document.getElementById('dropDownBox');
    const select = document.createElement('select');
    select.name = 'category';

    const prime = document.createElement('option');
    prime.value = 'Click here to select';
    prime.textContent = 'Click here to select';
    select.appendChild(prime);

    fetch('http://localhost:3060/api/raisemoney/use/search/CATEGORY')
  .then(response => response.json())
  .then(data => {
            data.forEach(category => {
                if (category && category['NAME']) {

                        const option = document.createElement('option');
                        option.value = category['NAME'];
                        option.textContent = category['NAME'];
                        select.appendChild(option);
                    } else {
                        console.log('Need more data');
                    }
                });
                dropDown.appendChild(select);
            })
      .catch(error => console.error('Error:', error));
    });

function startSearch(){
    const organizer = document.getElementById('organizerInput').value;
    const city = document.getElementById('cityInput').value;
    const dropDownBox = document.getElementById('dropDownBox');
    const categorySelect = dropDownBox.querySelector('select');
    let category = categorySelect.options[categorySelect.selectedIndex].value;
    if(category==='Click here to select') {
        category='';
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
            const tableBodyDiv = document.getElementById('tableBody');
            tableBodyDiv.innerHTML = "";
            console.log(data);
            if(data.length > 0){             
                data.forEach(fundraiser => {

                    const newRow = document.createElement("tr"); 

                    newRow.addEventListener("click", function () {
                        localStorage.setItem("ORGANIZER", fundraiser.ORGANIZER);
                        location.href = '/fundraiser';
                    });

                    const captionCell = document.createElement("td");  
                    captionCell.textContent = fundraiser.CAPTION;  
                    newRow.appendChild(captionCell); 

                    const organizerCell = document.createElement("td");  
                    organizerCell.textContent = fundraiser.ORGANIZER;  
                    newRow.appendChild(organizerCell);  

                    const categoryNameCell = document.createElement("td");  
                    categoryNameCell.textContent = fundraiser.CATEGORY_NAME;
                    newRow.appendChild(categoryNameCell);  

                    tableBodyDiv.appendChild(newRow);  

                    
                });
            }else{
                const noDataMessage = document.createElement("tr");
                const noDataCell = document.createElement("td");
                noDataCell.colSpan = 3;
                noDataCell.textContent = "No fundraisers found.";
                noDataCell.style.fontWeight = "bold";
                noDataCell.style.color = "red";
                noDataCell.style.textAlign = "center";
                noDataMessage.appendChild(noDataCell);
                tableBodyDiv.appendChild(noDataMessage);
            }
        })

        .catch(error =>{
            console.error("Error here",error);
            document.getElementById('data').textContent = "Load failure";
        });
        
    }else{
        alert('At least one piece of data needs to be provided for lookup!');
        const tableBodyDiv = document.getElementById('tableBody');
        tableBodyDiv.textContent = "";
    }
}

function claerChechboxes(){
    document.getElementById('organizerInput').value = '';
    document.getElementById('cityInput').value = '';
    const categorySelect = document.getElementsByName('category')[0];
    categorySelect.selectedIndex = 0;
    const tableBodyDiv = document.getElementById('tableBody');
    tableBodyDiv.textContent = "";
}