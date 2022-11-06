/**
 *  Einfache Integration von OpenStreetMap JSON Daten in JSON
 *  Erstellt für das Projekt GEO-Coding im PST 2022 an der Technischen Hochschule Brandenburg
 *  @author Micha Kodalle
 */

/*
 * Setup für Leaflet
 * Koordinaten sind auf Berlin-Mitte gelegt
 * Laden der Entwicklungsversion von OpenStreetMap
 */
const map = L.map('map').setView(['52.518611', '13.408333'], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Eigenes Icon für den Marker erstellen
var dogIcon = L.icon({
    iconUrl: 'images/dog_48_black.png',
    iconSize: [48, 48]
})

/*
 * Auslesen des JSON-Exports von Overpass Turbo
 * Verwenden der FetchAPI um das JSON lokal einzulesen
 */
fetch('./export.json')
    // Einlesen des JSONS
    .then(response => response.json())
    // Verarbeiten des JSONs und Hinzufügen zur Karte
    .then(data => add_locations(processLocations(data), map))
    .catch(error => console.log(error));

/**
 * Verarbeitet die JSON OSM Daten und erzeugt Array mit Leaflet Markern
 * @param data      Parsed JSON-Data
 * @returns {*[]}   Array mit Leaflet Markern
 */
function processLocations(data) {
    // Erzeuge den Marker-Array
    let locations = [];
    // Hole den Array mit den einzelnen Objekten
    const dataPoints = data.elements

    // Durchlaufe den Objekt-Array
    for (let i = 0; i < dataPoints.length; i++) {

        const datapoint = dataPoints[i];
        // Hole die Koordinaten und den Namen für jedes Objekt
        const lat = datapoint.lat;
        const lon = datapoint.lon;
        const name = datapoint.tags.name;

        // Erzeuge den Leaflet Marker an den Koordinaten mit dem Hundelogo
        const marker = L.marker([lat, lon], {icon: dogIcon});

        // Erzeuge und binde das Popup mit dem Namen an den Marker
        marker.bindPopup(name);

        // Füge den Marker zum Array hinzu
        locations.push(marker);
    }
    // Gebe den Marker-Array zurück
    return locations;
}

/**
 * Adds prepared array with markers to the given map
 * @param locations     Array with leaflet markers
 * @param map           The leaflet map
 */
function add_locations(locations, map) {
    // Füge jeden Marker der Karte hinzu
    locations.forEach(location => {
        location.addTo(map);
    });
}
