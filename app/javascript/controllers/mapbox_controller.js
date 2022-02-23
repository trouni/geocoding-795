import { Controller } from "@hotwired/stimulus"
import mapboxgl from "mapbox-gl"

export default class extends Controller { // equivalent to `class DefaultClass < Controller` in Ruby
  // Stimulus values:
  // if you name a data-attribute "data-<controller-name>-<value-name>-value",
  // then you can access it in Stimulus by declaring it inside the `static values`
  // by calling this.<valueName>Value
  static values = {
    apiKey: String,
    markers: Array,
    // <name of the value>: <data type of that value>
    // title: String,
    // darkMode: Boolean,
  }

  connect() {
    mapboxgl.accessToken = this.apiKeyValue

    this.map = new mapboxgl.Map({
      container: this.element,
      style: "mapbox://styles/mapbox/streets-v10"
    })
    this.#addMarkersToMap()
    this.#fitMapToMarkers()
  }

  #addMarkersToMap() {
    this.markersValue.forEach((marker) => {
      new mapboxgl.Marker()
        .setLngLat([ marker.lng, marker.lat ])
        .addTo(this.map)
    });
  }

  #fitMapToMarkers() {
    const bounds = new mapboxgl.LngLatBounds()
    this.markersValue.forEach(marker => bounds.extend([ marker.lng, marker.lat ]))
    this.map.fitBounds(bounds, { padding: 200, maxZoom: 15, duration: 1000 })
  }
}