function get_geolocation() {
    const debug = false

    if (navigator.geolocation) {
        // Aktuelle Position erhalten
        // Callback bei Erfolg zu Funktion geoSuccess
        // Callback bei Fehler zu Funktion geoError
        navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
        if (debug) {
            console.log('Geolocation successful')
        }
    } else {
        if (debug) {
            console.log('Geolocation failed')
        }
    }

    /**
     * Callback on successful read of geolocation
     * @param position
     */
    var geoSuccess = (position) => {
        // Aktuelle Position des Nutzers bekommen
        let user_lat = position.coords.latitude;
        let user_lon = position.coords.longitude;
        // Berechnungen mit Koordinaten machen
    }

    var geoError = (error) => {
        console.log(error);
    }
    

    /**
     * Distanzberechnung zwischen 2 Koordinaten
     * @param lat1  Latitude     Koordinate 1
     * @param lon1  Longitude    Koordinate 1
     * @param lat2  Latitude     Koordinate 2
     * @param lon2  Longitude    Koordinate 2
     * @returns {number} Entfernung in Kilometern
     */
    function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
        let p = 0.017453292519943295;    // Math.PI / 180
        let c = Math.cos;
        let a = 0.5 - c((lat2 - lat1) * p) / 2 +
            c(lat1 * p) * c(lat2 * p) *
            (1 - c((lon2 - lon1) * p)) / 2;

        return 12742 * Math.asin(Math.sqrt(a));
    }
}