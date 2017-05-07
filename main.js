import mapboxgl from 'mapbox-gl';
import _ from 'lodash';

mapboxgl.accessToken = 'pk.eyJ1Ijoiay1udXQiLCJhIjoiVXFlT25oYyJ9.Ypdndw8OoWcK4dAug_2xSg';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v9',
    center: [13.4280, 52.5244],
    zoom: 10
});

map.on('load', function () {
    const dataPath = require('./combined.json');

    window.fetch(dataPath).then(function(response) {
        return response.json();
    }).then(function(geojsonData) {
        const byYear = _.groupBy(geojsonData.features, "properties.year");
        const toggleableLayerIds = [];

        _.forEach(byYear, (value, key) => {
            const data = {
                "id": `trees-${key}`,
                "type": "symbol",
                "source": {
                    type: "geojson",
                    data: {type: "FeatureCollection", features: value},
                },
                "layout": {
                    "icon-image": "park-15",
                    "icon-allow-overlap": true,
                    "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
                    "text-offset": [0, 0.6],
                    "text-anchor": "top",
                    visibility: "none"
                }
            };
            map.addLayer(data);
            toggleableLayerIds.push(`trees-${key}`)
        });

        let currentIndex = 1;
        const currentYearDiv = document.getElementById("currentYear");
        window.setInterval(() => {
            const lastLayer = toggleableLayerIds[currentIndex - 1];
            const nextLayer = toggleableLayerIds[currentIndex];
            map.setLayoutProperty(lastLayer, 'visibility', 'none');
            map.setLayoutProperty(nextLayer, 'visibility', 'visible');
            currentIndex = (currentIndex + 1 ) % toggleableLayerIds.length;
            currentYearDiv.textContent = nextLayer.slice(6, 10);
        }, 500)

    });
});