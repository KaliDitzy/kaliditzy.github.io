//i put this here cuz i dont wanna forget how to add markers
//L.marker([1200, 3500])
//    .addTo(map)
//    .bindPopup("Castle Aster");

//Frontlines for Ivrian Revolutionaries
/*const lines = [
  [
    [3488, 4291],
    [3490.75, 4298],
    [3481.5, 4305.5],
    [3473.25, 4305.75],
    [3465.75, 4300.75],
    [3466.75, 4312.25],
    [3447.75, 4326.75],
    [3436.5, 4334.5],
    [3432.25, 4325.75],
    [3436, 4318.5],
    [3428.5, 4325.5],
    [3427.25, 4336.5],
    [3423.5, 4343.75],
    [3427.75, 4346.25],
    [3399.25, 4384],
    [3393.5, 4385.25],
    [3391, 4386.25],
    [3386, 4394.25],
    [3389.75, 4405],
    [3396, 4416.25],
    [3400.25, 4419.75],
    [3397, 4436.5],
    [3390.25, 4456.25],
    [3393.75, 4465.75],
    [3388.5, 4467],
    [3396.75, 4489.25],
    [3387.25, 4500.25]
  ]
];

lines.forEach(points => {
  L.polyline(points, {
    color: "red",
    weight: 2
  }).addTo(map);
});*/

// Custom icons
const battleIcon = L.icon({
  iconUrl:  "assets/icons/battle.png",
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor:  [0, -16]
});
const cwpiIcon = L.icon({
  iconUrl:  "assets/flags/cwpi.png",
  iconSize: [32, 21],
  iconAnchor: [32, 11],
  popupAnchor:  [0, -11]
});

// Markers
const activeBattleWest = L.marker([3490.5, 4348.5], {
  icon: battleIcon
});
activeBattleWest.bindTooltip("Battles between the Councillors and the Colony of Ivria");

const activeBattleMain = L.marker([3477.75, 4416], {
  icon: battleIcon
});
activeBattleMain.bindTooltip("Battle of the Convention");

// Behavior
function UpdateMarkerVisibility() {
  if (map.getZoom() >= 1) {
    if (!map.hasLayer(activeBattleWest)) {
      activeBattleWest.addTo(map);
    }
  } else {
    if (map.hasLayer(activeBattleWest)) {
      map.removeLayer(activeBattleWest);
    }
  }
}

map.on("zoomend", UpdateMarkerVisibility);

// Add everything to the map
UpdateMarkerVisibility();
activeBattleMain.addTo(map);