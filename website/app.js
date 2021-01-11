/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();

//API credentials
const baseURL = 'http://api.openweathermap.org/data/2.5/weather';
const apiKey = '122c523e85397b207287af660d8e87db';

const generateButton = document.getElementById("generate");

//event for button
generateButton.addEventListener("click", performAction);

//executing function
function performAction(e) {

    const zip = document.getElementById("zip").value;
    const content = document.getElementById("feelings").value;


    //get function
    const getData = async () => {
        const req = await fetch (baseURL+'?zip='+zip+'&appid='+apiKey+'&units=metric');
        try {
        const res = await req.json();
        return res;
        }  catch(error) {
        console.log("error", error);
        // appropriately handle the error
        }
    }

    //post function
    const postData = async (url = '', data = {})=> {
        const request = await fetch (url, {
            method:'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        
        try {
            return;
        } catch(error) {
            console.log("error", error);
        }
    }

    //update function
    const updateUI = async () => {
        const request = await fetch('/allData');
        try{
        const response = await request.json();
        document.getElementById('date').innerHTML = '<i class="fa fa-calendar" style="font-size:32px;"></i>' + " <b>Date:</b> " + response.date;
        document.getElementById('temp').innerHTML = "<i class='fas fa-cloud-meatball' style='font-size:32px;'></i>" + " <b>Temp:</b> " + response.temp + "℃";
        document.getElementById('content').innerHTML = "<i class='far fa-grin-beam-sweat' style='font-size:32px;'></i>" + " <b>Feeling:</b> " + response.content;
    
        }catch(error){
        console.log("error", error);
        }
    }


    //access zip value
    if (zip === "") {
        alert("Please enter a zip code!")
    } else {
        getData()
        // New Syntax!
        .then((data) => {
        // Add data
            postData('/addInfo', {date:newDate, temp:data.main.temp, content:content} )
        })
        .then(
            () => updateUI()
        )
    }


}