# Import der Libraries
# Geopandas für das Datenverarbeiten
# Matplotlib für das Plotten
import geopandas as gpd
import matplotlib.pyplot as plt

# Einlesen der Geodaten - Path muss dann entsprechend angepasst werden
geo_data = gpd.read_file("data/geodata/berlin_dog_grooming.geojson")

# Einlesen des Shapefiles - Umriss von Berlin
berlin_shape = gpd.read_file("data/shapefiles/berlin/bezirksgrenzen.shp")

# Generieren der Umrisse von Berlin
base = berlin_shape.plot(
    color="lightgray"  # Farbe der Shapes
    , edgecolor="black",  # Farbe der Umrandung
    figsize=[20, 20]  # Größe des Plots - hier 2000 x 2000px
)
# Konvertieren der Geodaten zum Koordinatensystem der Shape
geo_data.to_crs(berlin_shape.crs)

# Einzeichnen der Ergebnisse in der Berlinkarte
geo_data.plot(
    ax=base,  # Berlinkarte als Achse
    marker="*",  # Marker für die jeweilige Location
    color="red",  # Farbe für den Marker
    markersize=25  # Größe des Markers
)

# Anzeigen des Plots
plt.show()
