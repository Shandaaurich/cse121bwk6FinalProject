
//get launch data from API URL and request it in JSON format

// const launchURL = 'https://lldev.thespacedevs.com/2.2.0/launch/upcoming?format=json';
const launchURL = 'https://ll.thespacedevs.com/2.2.0/launch/upcoming/?format=json';


async function getLaunches() {

    const response = await fetch(launchURL);

    if (response.ok) {
        data = await response.json();

        output(data.results)
    }
}
getLaunches()

//output the data into HTML components on the page created dynamically

const launchesOutput = document.querySelector('#rockets');

function output(rockets) {

    rockets.slice(0, 12).forEach(async rocket => {
        let article = document.createElement('article');
        let div1 = document.createElement('div');
        let div2 = document.createElement('div');
        let div3 = document.createElement('div');
        let h3 = document.createElement('h3');
        let date = document.createElement('h3');
        let h4 = document.createElement('p');
        let h4_1 = document.createElement('p');
        let h4_2 = document.createElement('p');
        let h4_3 = document.createElement('p');
        let img = document.createElement('img');
        let counterh3 = document.createElement('h3');

        let localDate = new Date(rocket.window_start);
        let localDateFormated = localDate.toLocaleString();
        let latitude = rocket.pad.latitude;
        let longitude = rocket.pad.longitude;
        let now = new Date().getTime();
        let t = localDate.getTime() - now;
        let days = Math.floor(t / (1000 * 60 * 60 * 24));
        let hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        counterh3.innerHTML =
            `Countdown to liftoff: 
        ${days} days and ${hours} hours. 
        Launch status: ${rocket.status.name}`


        div1.setAttribute('class', 'rocketInfo')
        div2.setAttribute('class', 'rocketImg')
        div3.setAttribute('id', 'rocketCountdown')
        h3.innerHTML = `Mission: ${rocket.mission.name}`;
        date.innerHTML = `Expected Launch Date: 
        ${localDateFormated} UTC`
        h4.innerHTML = `Agency: ${rocket.launch_service_provider.name} `;
        h4_1.innerHTML = `Rocket: ${rocket.name} `;
        h4_2.innerHTML = `Location: ${rocket.pad.location.name} `
        h4_3.innerHTML = `Launch status: ${rocket.status.name} `
        img.src = rocket.image;
        img.setAttribute('alt', `${rocket.name} `);


        article.appendChild(div1);
        div1.appendChild(h3);
        div1.appendChild(h4);
        div1.appendChild(h4_1);
        div1.appendChild(h4_2);
        article.appendChild(div2);
        article.appendChild(div3);

        launchesOutput.appendChild(article)

        //use the location information for each launch to format the API URL to pull in weather data for each location and add it to HTMl elements on the page. 
        weatherURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=946ee3e55995e79e2d6f02d00a3dce79&units=imperial`

        const response = await fetch(weatherURL);

        if (response.ok) {
            data = await response.json();

            const temp = data.current.temp.toFixed(0);
            const description = data.current.weather[0].description;

            let h4_4 = document.createElement('h4');
            h4_4.innerHTML = `Current weather: ${temp}&#176; F, ${description}`
            div3.appendChild(h4_4);
        }

        div2.appendChild(img);
        div3.appendChild(date);
        div3.appendChild(counterh3);
    })

};

//reset function for sort and filter functions
function reset() {
    document.getElementById('rockets').innerHTML = ''
}

//Filter launches by agency Name
async function filterBy() {

    reset();
    selectedValue = document.querySelector('#filterBy').value;

    const response = await fetch(launchURL);

    if (response.ok) {
        data = await response.json();

        switch (selectedValue) {
            case "a-f":
                output(data.results.filter((agency) => {
                    if ((agency.launch_service_provider.name.startsWith('A')) || (agency.launch_service_provider.name.startsWith('B')) || (agency.launch_service_provider.name.startsWith('C')) || (agency.launch_service_provider.name.startsWith('D')) || (agency.launch_service_provider.name.startsWith('E')) || (agency.launch_service_provider.name.startsWith('F'))) {
                        return agency
                        //                 }
                        // if ((launchInfo.hours <= 24) && (launchInfo.days <= 0)) {
                        //     return launchInfo
                        // }
                    }
                }));
                break;
            case "g-l":
                output(data.results.filter((agency) => {
                    if ((agency.launch_service_provider.name.startsWith('G')) || (agency.launch_service_provider.name.startsWith('H')) || (agency.launch_service_provider.name.startsWith('I')) || (agency.launch_service_provider.name.startsWith('J')) || (agency.launch_service_provider.name.startsWith('K')) || (agency.launch_service_provider.name.startsWith('L'))) {
                        return agency
                    }
                }));
                break;
            case "m-r":
                output(data.results.filter((agency) => {
                    if ((agency.launch_service_provider.name.startsWith('M')) || (agency.launch_service_provider.name.startsWith('N')) || (agency.launch_service_provider.name.startsWith('O')) || (agency.launch_service_provider.name.startsWith('P')) || (agency.launch_service_provider.name.startsWith('Q')) || (agency.launch_service_provider.name.startsWith('R'))) {
                        return agency
                    }
                }));
                break;
            case "s-z":
                output(data.results.filter((agency) => {
                    if ((agency.launch_service_provider.name.startsWith('S')) || (agency.launch_service_provider.name.startsWith('T')) || (agency.launch_service_provider.name.startsWith('U')) || (agency.launch_service_provider.name.startsWith('V')) || (agency.launch_service_provider.name.startsWith('W')) || (agency.launch_service_provider.name.startsWith('X'))) {
                        return agency
                    }
                }));
                break;
        }
    }

}

document.querySelector('#filterBy').addEventListener('change', filterBy);