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

const baseLayers = {
    "Political": L.imageOverlay("assets/political.png", bounds),
    "Climate": L.imageOverlay("assets/climate.png", bounds)
};

baseLayers["Political"].addTo(map);

L.control.layers(baseLayers).addTo(map);

const imageUrl = "assets/political.png";

//L.imageOverlay(imageUrl, bounds).addTo(map);

map.fitBounds(bounds);
map.on("click", function(e) {
    console.log([e.latlng.lat, e.latlng.lng]);
});

const polities = {
    "#446882": "Ocean",
    "#ffffff": "???",
    "#ff0000": "Contested Territory",
    "#339643": "Ivrian Revolutionaries",
    "#ffb200": "Tyscandean Empire",
    "#a87300": "Tyscandean Frontier",
    "#ffc956": "Tyscandean Colonies",
    "#ffe2aa": "Tyscandean Occupied Territories",
    "#0239ff": "United States of Ciranaca",
    "#0125a8": "U.S. Frontier",
    "#55d5cd": "Imperial Federation of Ankai",
    "#3c9690": "Ankaian Frontiers",
    "#a8fff9": "Ankaian Colonies"
};

// image to sample from
const img = new Image();
img.src = imageUrl;

const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

img.onload = () => {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
};


// Hover label
const label = document.createElement("div");

Object.assign(label.style, {
    position: "absolute",
    zIndex: 1000,
    pointerEvents: "none",
    background: "white",
    padding: "4px 8px",
    border: "1px solid black",
    borderRadius: "4px",
    fontSize: "12px",
    display: "none"
});

document.body.appendChild(label);

const overlay = L.imageOverlay(imageUrl, bounds).addTo(map);

// Mouse tracking
map.on("mousemove", function(e) {
    if (!img.complete || !ctx) return;

    const overlayBounds = overlay.getBounds();

    const xPercent =
        (e.latlng.lng - overlayBounds.getWest()) /
        (overlayBounds.getEast() - overlayBounds.getWest());

    const yPercent =
        (e.latlng.lat - overlayBounds.getNorth()) /
        (overlayBounds.getSouth() - overlayBounds.getNorth());

    // Outside image
    if (
        xPercent < 0 ||
        xPercent > 1 ||
        yPercent < 0 ||
        yPercent > 1
    ) {
        label.style.display = "none";
        return;
    }

    // percentage to pixel
    const x = Math.floor(xPercent * img.width);
    const y = Math.floor(yPercent * img.height);


    const pixel = ctx.getImageData(x, y, 1, 1).data;

    const color = {
        r: pixel[0],
        g: pixel[1],
        b: pixel[2],
        a: pixel[3]
    };


    label.innerHTML = colorToLabel(color);

    label.style.left = `${e.originalEvent.pageX + 15}px`;
    label.style.top = `${e.originalEvent.pageY + 15}px`;
    label.style.display = "block";
});


map.on("mouseout", () => {
    label.style.display = "none";
});


function colorToLabel({ r, g, b }) {
    const hex = "#" + [r, g, b]
        .map(v => v.toString(16).padStart(2, "0"))
        .join("")
        .toLowerCase();

    return polities[hex] ?? `Undefined (${hex})`;
}