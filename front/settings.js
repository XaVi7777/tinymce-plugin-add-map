export const settings = {
    API_URL: '/api/users',
    MAPBOX_API_TOKEN: 'pk.eyJ1IjoieGF2aTc3NyIsImEiOiJja2VlM3ZqY3AwYzlmMnlveWVpcXZ5cmRyIn0.-NW-vPH9v5Cgl977p4bG3A',
    GEOCODER_HTML: `
    <!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8" />
    <title>Set a point after Geocoder result</title>
    <meta name="viewport" content="initial-scale=1,maximum-scale=1,user-scalable=no" />
    <script src="https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.js"></script>
    <script src="https://html2canvas.hertzen.com/dist/html2canvas.min.js"></script>
    <link href="https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css" rel="stylesheet" />
    <script src='https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-language/v0.10.1/mapbox-gl-language.js'></script>
    <style>
        body {
            margin: 0;
            padding: 0;
        }

        #map {
            position: absolute;
            top: 0;
            bottom: 0;
            width: 100%;
        }
    </style>
</head>

<body>
    <script
        src="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.5.1/mapbox-gl-geocoder.min.js"></script>
    <link rel="stylesheet"
        href="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.5.1/mapbox-gl-geocoder.css"
        type="text/css" />
    <!-- Promise polyfill script required to use Mapbox GL Geocoder in IE 11 -->
    <script src="https://cdn.jsdelivr.net/npm/es6-promise@4/dist/es6-promise.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/es6-promise@4/dist/es6-promise.auto.min.js"></script>
    <style>
        #geocoder-container>div {
            min-width: 50%;
            margin-left: 25%;
        }
    </style>

    <div id="map"></div>
    <script>
        mapboxgl.accessToken = 'pk.eyJ1IjoieGF2aTc3NyIsImEiOiJja2VlM3ZqY3AwYzlmMnlveWVpcXZ5cmRyIn0.-NW-vPH9v5Cgl977p4bG3A';
        const map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [37.6155, 55.7522],
            preserveDrawingBuffer: true,
            zoom: 13
        });

        const geocoder = new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            marker: {
                color: 'orange'
            },
            mapboxgl: mapboxgl,
            language: 'ru-RU',
        });


        map.addControl(geocoder);

        geocoder.on('result', function (e) {
            document.getElementsByClassName('mapboxgl-ctrl-geocoder--input')[0].remove();
        });
    </script>
</body>

</html>
    `
}