
mapboxgl.accessToken = 'pk.eyJ1IjoieGF2aTc3NyIsImEiOiJja2VlM3ZqY3AwYzlmMnlveWVpcXZ5cmRyIn0.-NW-vPH9v5Cgl977p4bG3A';


const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [37.6155, 55.7522],
    preserveDrawingBuffer: true,
    zoom: 13
});

map.on('dblclick', event => {
    const { lng, lat } = event.lngLat.wrap();

    const marker = new mapboxgl.Marker()
        .setLngLat([lng, lat])
        .addTo(map);
});

const geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    marker: false,
    mapboxgl: mapboxgl,
    language: 'ru-RU',
});

map.addControl(geocoder);

geocoder.on('result', () => {
    document.getElementsByClassName('mapboxgl-ctrl-geocoder--input')[0].remove();
});
