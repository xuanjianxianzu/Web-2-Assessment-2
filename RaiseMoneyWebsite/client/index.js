fetch("http://localhost:3060/api/raisemoney") //通过api获取数据库数据
    .then(response=>response.json())   //转化json格式
    .then(data=>{    //获取data元素
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
        dataDiv.textContent = "No fundraiser"
    }
    })

    .catch(error =>{
        console.error("Error here",error);
        document.getElementById('data').textContent = "Load failure";
    });