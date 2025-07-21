function getDataType () {
    const data_chosen =  document.querySelector('input[name = "datachoice"]:checked').value;
    switch (data_chosen) {
        case "chosendata1":
            getData(1)
        break;
        
        case "chosendata2":
            getData(2)
        break;

        case "chosendata3":
            getData(3)
        break;
    }
}

function getData (api_type) {
    require('dotenv').config();

    if (api_type == 1) {
        var apiData = {
            urlCors: 'https://cors-anywhere.herokuapp.com/',
            url: 'https://api.octranspo1.com/v2.0/GetRouteSummaryForStop',
            appID: "[SECRET_APP_ID]",
            apiKey: "[SECRET_API_KEY]",
            stopNo: document.getElementById("stopNo").value
        }

        const {urlCors, url, appID, apiKey, stopNo} = apiData
        const apiUrl = `${urlCors}${apiData.url}?appID=${apiData.appID}&apiKey=${apiData.apiKey}&stopNo=${apiData.stopNo}&format=`
        
        fetch(apiUrl)
            .then( res => res.json())
            .then ( data => {
                const data_display = document.getElementById("data")
                const stop_summary_display = "";

                const stop_no_data = data.GetRouteSummaryForStopResult.StopNo
                const stop_desc_data = data.GetRouteSummaryForStopResult.StopDescription

                data_display.innerHTML = `<button class="accordion">Stop ${stop_no_data} at ${stop_desc_data} Bus Route Summary</button>
                <div class="panel">
                  <p>Bus Trip Cards Here</p>
                </div>`

                const stop_routes_data = data.GetRouteSummaryForStopResult.Routes.Route

                if (stop_routes_data.length == undefined) {
                    data_display.innerHTML += `<div class="container">
                            <div class="card">
                                <p id="cardtext"> <i class="fas fa-route"></i> Route Number</p>  
                            <p id="routenumber">${stop_routes_data.RouteNo}</p> 
                            <p id="cardtext"> <i class="fas fa-map-marker-alt"></i> Heading towards ${stop_routes_data[i].RouteHeading} </p>                             
                            </div>
                        </div>`
                }

                else {
                    for (let i = 0; i < stop_routes_data.length; i++) {
                        data_display.innerHTML +=
                        `<div class="container">
                            <div class="card">
                                <p id="cardtext"> <i class="fas fa-route"></i></i> Route Number</p>  
                            <p id="routenumber">${stop_routes_data[i].RouteNo}</p> 
                            <p id="cardtext"> <i class="fas fa-map-marker-alt"></i> Heading towards ${stop_routes_data[i].RouteHeading} </p>                             
                            </div>
                        </div>`
                    }
                }
            })
    }

    if (api_type == 2) {
        var apiData = {
            urlCors: 'https://cors-anywhere.herokuapp.com/',
            url: 'https://api.octranspo1.com/v2.0/GetNextTripsForStop',
            appID: "[SECRET_APP_ID]",
            apiKey: "[SECRET_API_KEY]",
            stopNo: document.getElementById("stopNo").value,
            routeNo: document.getElementById("routeNo").value
        }

        const {urlCors, url, appID, apiKey, stopNo, routeNo} = apiData
        const apiUrl = `${urlCors}${apiData.url}?appID=${apiData.appID}&apiKey=${apiData.apiKey}&stopNo=${apiData.stopNo}&routeNo=${routeNo}&format=`
        
        fetch(apiUrl)
            .then( res => res.json())
            .then ( data => {
                const data_display = document.getElementById("data")
                
                const stop_no_data = data.GetNextTripsForStopResult.StopNo
                const stop_label_data = data.GetNextTripsForStopResult.StopLabel
                const bus_no_data = data.GetNextTripsForStopResult.Route.RouteDirection.RouteNo
                const trips_data = data.GetNextTripsForStopResult.Route.RouteDirection.Trips.Trip
                
                data_display.innerHTML = `Stop #: ${stop_no_data}<br></br>`
                data_display.innerHTML += `Stop Street/Location #: ${stop_label_data}<br></br>`
                data_display.innerHTML += `Today's trips for bus number ${bus_no_data}:<br></br>`

                data_display.innerHTML = `<button class="accordion">Today's trips for bus/route number ${bus_no_data} at stop ${stop_no_data} (${stop_label_data})</button>
                <div class="panel">
                  <p>Bus Trip Cards Here</p>
                </div>`

                for (let i = 0; i < trips_data.length; i++) {
                    var timing_coverted = trips_data[i].TripStartTime;
                    timing_coverted = Number(trips_data[i].TripStartTime.replace(/:/, "."))
                    
                    if (timing_coverted > 12) {
                        timing_coverted -= 12;
                        timing_coverted = timing_coverted.toFixed(2);
                        timing_coverted = timing_coverted.toString()
                        timing_coverted = timing_coverted.replace(".", ":")
                        timing_coverted = timing_coverted.concat(" PM")
                        
                    } else {
                        timing_coverted = timing_coverted.toFixed(2);
                        timing_coverted = timing_coverted.toString()
                        timing_coverted = timing_coverted.replace(".", ":")
                        timing_coverted = timing_coverted.concat(" AM")
                    }

                    data_display.innerHTML += `<div class="container">
                        <div class="card">
                            <p id="cardtext"> <i class="fas fa-map-marker-alt"></i> Destination ${trips_data[i].TripDestination} <br></br> 
                           <i class="fas fa-clock"></i> Timing: ${timing_coverted} minutes <br></br>
                           <i class="fas fa-hourglass-end"></i> Approximate time until trip arrives at stop: ${trips_data[i].AdjustedScheduleTime} minutes </p>                             
                        </div>
                    </div>`
                }
            })     
    }

    if (api_type == 3) {
        var apiData = {
            urlCors: 'https://cors-anywhere.herokuapp.com/',
            url: 'https://api.octranspo1.com/v2.0/GetNextTripsForStopAllRoutes',
            appID: "[SECRET_APP_ID]",
            apiKey: "[SECRET_API_KEY]",
            stopNo: document.getElementById("stopNo").value
        }

        const {urlCors, url, appID, apiKey, stopNo} = apiData
        const apiUrl = `${urlCors}${apiData.url}?appID=${apiData.appID}&apiKey=${apiData.apiKey}&stopNo=${apiData.stopNo}&format=`
        console.log(apiUrl)
        
        fetch(apiUrl)
            .then( res => res.json())
            .then ( data => {
                const data_display = document.getElementById("data")
                data_display.innerHTML = ``;
                let data_inner_html = "";

                const stop_no_data = data.GetRouteSummaryForStopResult.StopNo
                const stop_label_data = data.GetRouteSummaryForStopResult.StopDescription
                const routes_data = data.GetRouteSummaryForStopResult.Routes.Route
                
                if (routes_data.length == undefined) {
                    routes_data.length = 1;
                }

                for (let i = 0; i < routes_data.length; i++) {
                    if (routes_data.length == 1) {        
                        var route_no_data = routes_data.RouteNo
                        var route_heading_data = routes_data.RouteHeading
                        var nooftripsforroute = routes_data.Trips.Trip.length
                        var trip_data = routes_data.Trips.Trip;
                    }

                    else {
                        var route_no_data = routes_data[i].RouteNo
                        var route_heading_data = routes_data[i].RouteHeading
                        var nooftripsforroute = routes_data[i].Trips.length
                        var trip_data = routes_data[i].Trips;
                    }

                    data_display.innerHTML += 
                    `<button class="accordion">Bus Number ${route_no_data}, heading toward ${route_heading_data}</button>
                    <div class="panel">
                    <p>Bus Trip Cards Here</p>
                    </div>
                    `
                    
                    if (nooftripsforroute == undefined) {
                        if (trip_data.Latitude == "" && trip_data.Latitude == "") { 
                            data_display.innerHTML += 
                            `
                            <div class="row" id="carddisplay">
                                <div class="column"  style="background-color:#aaa;">
                                    <div class="container">
                                        <div class="card">
                                            <p id="cardtext"><i class="fas fa-clock"></i> Arrives at ${trip_data.TripStartTime} <br></br> 
                                            <i class="fas fa-hourglass-end"></i> ETA ${trip_data.AdjustedScheduleTime} minutes <br></br>
                                            <i class="fas fa-map-marker-alt"></i> Destination ${trip_data.TripDestination} <br></br> <button id="cardbuttonred">Location not available</button> </p>                             
                                        </div>
                                    </div>
                                </div>
                            </div>
                            `
                        } else {
                            data_display.innerHTML += 
                            `
                            <div class="row" id="carddisplay">
                                <div class="column"  style="background-color:#aaa;">
                                    <div class="container">
                                        <div class="card">
                                            <p id="cardtext"><i class="fas fa-clock"></i> Arrives at ${trip_data.TripStartTime} <br></br> 
                                            <i class="fas fa-hourglass-end"></i> ETA ${trip_data.AdjustedScheduleTime} minutes <br></br>
                                            <i class="fas fa-map-marker-alt"></i> Destination ${trip_data.TripDestination} <!--Live Bus Location - Latitude:${trip_data.Latitude}, Longitude:${trip_data.Longitude}--></p>                             
                                            <button id="cardbutton" onclick="findDistance(${trip_data.Latitude}, ${trip_data.Longitude})">Find location</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            `
                        }
                    }

                    for (let i = 0; i < nooftripsforroute; i++) {
                        if (i == 0) {
                            data_inner_html = `<div class="row" id="carddisplay">`
                        }
                                        
                        if (trip_data[i].Latitude == "" && trip_data[i].Latitude == "") { 
                            data_inner_html += 
                            `
                            <div class="column"  style="background-color:#aaa;">
                                <div class="container">
                                    <div class="card">
                                        <p id="cardtext"><i class="fas fa-clock"></i> Arrives at ${trip_data[i].TripStartTime} <br></br> 
                                        <i class="fas fa-hourglass-end"></i> ETA ${trip_data[i].AdjustedScheduleTime} minutes <br></br>
                                        <i class="fas fa-map-marker-alt"></i> Destination ${trip_data[i].TripDestination} <br></br> <button id="cardbuttonred">Location not available</button> </p>                             
                                    </div>
                                </div>
                            </div>
                            `
                        } else {
                            data_inner_html += 
                            `
                            <div class="column"  style="background-color:#bbb;">
                                <div class="container">
                                    <div class="card">
                                        <p id="cardtext"><i class="fas fa-clock"></i> Arrives at ${trip_data[i].TripStartTime} <br></br> 
                                        <i class="fas fa-hourglass-end"></i> ETA ${trip_data[i].AdjustedScheduleTime} minutes <br></br>
                                        <i class="fas fa-map-marker-alt"></i> Destination ${trip_data[i].TripDestination} <br></br>                     
                                        <button id="cardbutton" onclick="findDistance(${trip_data[i].Latitude}, ${trip_data[i].Longitude})">Find location</button> </p>  

                                        <!--Live Bus Location - Latitude:${trip_data[i].Latitude}, Longitude:${trip_data[i].Longitude}-->
                                    </div>
                                </div>
                            </div>
                            `
                        }

                        if (i == nooftripsforroute - 1) {
                            data_inner_html += `</div>`
                            data_display.innerHTML += data_inner_html;
                        }
                    }
                }
            })
    }
}

function findDistance(lat, long) {
    var userlocation = document.getElementById("userlocation").value
    const distanceData = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/directions/json?origin=${userlocation}&destination=${lat},${long}&key=[SECRET_KEY]`;

    fetch(distanceData)
        .then (res => res.json())
        .then (data => {
            console.log(data.routes[0].legs[0].distance.text)
            console.log(data.routes[0].legs[0].end_address)
            let distancebuttonval = document.getElementById("distanceinfo")

            distancebuttonval.innerHTML = `The buses current location is ${data.routes[0].legs[0].end_address}. It is ${data.routes[0].legs[0].distance.text} away from you`

            initMap(lat, long)
        })
}

function initMap (lat, long) {
    // The location of Uluru
    //Show google maps with your location and bus location
    const uluru = { lat: lat, lng: long };
    // The map, centered at Uluru
    const map = new google.maps.Map(document.getElementById("maps"), {
    zoom: 10,
    center: uluru,
    });

    // The marker, positioned at Uluru
    const buslocationmarker = new google.maps.Marker({
        position: uluru,
        map: map,
    });

    var userlocation = document.getElementById("userlocation").value
    const distanceData = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/directions/json?origin=${userlocation}&destination=${lat},${long}&key=[SECRET_KEY]`;
    fetch(distanceData)
        .then (res => res.json())
        .then (data => {
            console.log(data.routes[0].legs[0].start_location)
            const uluru1 = { lat: data.routes[0].legs[0].start_location.lat, lng: data.routes[0].legs[0].start_location.lng };

            const locationmarker = new google.maps.Marker({
                position: uluru1,
                map: map,
            });
        })
}
