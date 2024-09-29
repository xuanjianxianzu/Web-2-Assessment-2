fetch("http://localhost:3060/api/raisemoney") //通过api获取数据库数据
    .then(response=>response.json())   //转化json格式
    .then(data=>{    //获取data元素
    const dataDiv = document.getElementById('data');
    dataDiv.innerHTML = "";
    console.log(data);
    if(data.length > 0){         
        data.forEach(fundraiser => {
                const homePageCard = document.createElement('div');
                homePageCard.classList.add('home_card');
                const logoContainer = document.createElement('div');
                logoContainer.classList.add('logo_Container');
                const img = document.createElement('img');
                if(fundraiser.CATEGORY_ID === 1){
                    img.src = '../image/3.jpg';
                }else if(fundraiser.CATEGORY_ID === 2){
                    img.src = '../image/3.jpg';
                }else if(fundraiser.CATEGORY_ID === 3){
                    img.src = '../image/3.jpg';
                }else if(fundraiser.CATEGORY_ID === 4){
                    img.src = '../image/3.jpg';
                }else if(fundraiser.CATEGORY_ID === 5){
                    img.src = '../image/3.jpg';
                }
                img.classList.add('logo');
                logoContainer.appendChild(img);
                const caption = document.createElement('h3');
                caption.textContent = fundraiser.CAPTION;
                logoContainer.appendChild(caption);
                homePageCard.appendChild(logoContainer);

                const organizer = document.createElement('p');
                organizer.textContent = `Organizer: ${fundraiser.ORGANIZER}`;
                homePageCard.appendChild(organizer);

                const city = document.createElement('p');
                city.textContent = `City: ${fundraiser.CITY}`;
                homePageCard.appendChild(city);

                const funding = document.createElement('p');
                city.textContent = `$${fundraiser.CURRENT_FUNDING} raised`;
                homePageCard.appendChild(funding);

                const progressBar = document.createElement('meter');
                progressBar.min = 0;
                progressBar.max = parseFloat(fundraiser.TARGET_FUNDING);
                progressBar.value = parseFloat(fundraiser.CURRENT_FUNDING);
                homePageCard.appendChild(progressBar);
                dataDiv.appendChild(homePageCard);

                homePageCard.addEventListener("click",function(){
                    localStorage.setItem("ORGANIZER",fundraiser.ORGANIZER);
                    location.href = '/fundraiser';
                });

        });
    }else{
        dataDiv.textContent = "No fundraiser"
    }
    })

    .catch(error =>{
        console.error("Error here",error);
        document.getElementById('data').textContent = "Load failure";
    });