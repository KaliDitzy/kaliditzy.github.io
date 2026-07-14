const imageWidth = 8192;
const imageHeight = 4096;

const bounds = [
    [0, 0],
    [imageHeight, imageWidth]
];

const map = L.map("map", {
    crs: L.CRS.Simple,
    minZoom: -3,
    maxZoom: 2
});

L.imageOverlay("assets/political.png", bounds).addTo(map);

map.fitBounds(bounds);
map.on("click", function(e) {
    console.log(e.latlng);
});

//L.marker([1200, 3500])
//    .addTo(map)
//    .bindPopup("Castle Aster");