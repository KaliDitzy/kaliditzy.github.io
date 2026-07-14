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

const imageUrl = "assets/political.png";

L.imageOverlay(imageUrl, bounds).addTo(map);

map.fitBounds(bounds);
map.on("click", function(e) {
    console.log(e.latlng);
});

//L.marker([1200, 3500])
//    .addTo(map)
//    .bindPopup("Castle Aster");

const polities = {
    "#446882": "Ocean",
    "#ffffff": "???",
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

// Image setup
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


// The image overlay (make sure you keep a reference to it)
const overlay = L.imageOverlay(imageUrl, bounds).addTo(map);


// Mouse tracking
map.on("mousemove", function(e) {
    if (!img.complete || !ctx) return;

    const overlayBounds = overlay.getBounds();

    /*
        Convert mouse position into a percentage of the image.

        xPercent:
            0 = left edge of image
            1 = right edge of image

        yPercent:
            0 = top edge of image
            1 = bottom edge of image
    */

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


    // Convert percentage into original image pixels
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