
mapboxgl.accessToken = ''

var markers = [];

var map = new mapboxgl.Map({
    container: 'map',
    style:'mapbox://styles/mapbox/streets-v11',
    center: [-71.104081, 42.365554],
    zoom: 10
});

function create_marker(id, lat, lng){
    var marker = new mapboxgl.Marker()
    .setLngLat([lng, lat])
    .addTo(map);
    markers[id] = marker;
}

function change_marker(marker, lat, lng) {
    marker.setLngLat([lng, lat]).addTo(map);
}

async function run(){
    const locations = await getBusLocations();
    console.log(new Date());
    console.log(locations);
    counter = 0;
    locations.forEach(element => {
        let lat = element.attributes.latitude;
        let lng = element.attributes.longitude;
        let marker = markers[counter]
        if (marker) {
            change_marker(marker, lat, lng)
        }
        else {
            create_marker(counter, lat, lng)
        }
        counter++;
    });

    //timer
    setTimeout(run, 15000);
}

async function getBusLocations(){
    const url = 'https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip'
    const response = await fetch(url);
    const json = await response.json();
    return json.data;
}

run()