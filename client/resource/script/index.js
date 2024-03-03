// Initialize the map on the "usMap" div with a given center and zoom
var map = L.map('usMap').setView([37.8, -96], 4);

// Add a tile layer to add to our map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

// Function to add a dot to the map
function addDot(lat, lon) {
    L.circle([lat, lon], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 10000
    }).addTo(map);
}

// Example usage: Add a dot to New York City
addDot(40.7128, -74.0060);
