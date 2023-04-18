
mapboxgl.accessToken = ''


var map = new mapboxgl.Map({
    container: 'map',
    style:'mapbox://styles/mapbox/streets-v11',
    center: [-71.104081, 42.365554],
    zoom: 10
});

var marker = new mapboxgl.Marker()
    .setLngLat([-71.104081, 42.365554])
    .addTo(map);

var counter = 0;
function move(){
    setTimeout(() =>{
    if(counter >= busStops.length) return;
    marker.setLngLat(busStops[counter]);
    counter++;
    move();
    }, 1000);
}
function create_markers(locs){
}

async function run(){
    const locations = await getBusLocations();
    console.log(new Date());
    console.log(locations);
    counter = 0;
    locations.forEach(element => {
        let lat = element.counter.attributes.latitude
        let lng = element.counter.attributes.longitude
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