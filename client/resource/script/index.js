let facilities = [];
let map; // Declare map variable

// Function to initialize the map
function populateUSMap() {
  // Initialize the map on the "usMap" div with a given center and zoom
  map = L.map('usMap').setView([37.8, -96], 4);

  // Add a tile layer to add to our map
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);
}
function zoomOut() {
  map.setView([37.8, -96], 4); // Set the view back to the initial position and zoom level
}

// Function to add a dot to the map
function addDot(facility) {
    let type = facility.type;
    let lat = facility.latitude;
    let lon = facility.longitude;
    if(lat === undefined || lon === undefined) {
        console.error("Latitude or longitude is undefined for facility:", facility);
        return; // Skip this facility if lat or lon is undefined
    }
    var iconOptions = {
        iconSize: [20, 20], // size of the icon
        iconAnchor: [19, 19], // point of the icon which will correspond to marker's location
        popupAnchor: [0, -19] // point from which the popup should open relative to the iconAnchor
    };

    var iconUrlMap = {
        'Hospital': '../resource/img/hospitalicon.png',
        'Division Office': '../resource/img/office-icon.png',
        'Supply Chain Center': '../resource/img/supplychain-icon.png',
        'Shared Service Center': '../resource/img/sharedservices-icon.png'
    };

    // Set icon URL based on type
    iconOptions.iconUrl = iconUrlMap[type] || '../resource/img/default-icon.png';

    var icon = L.icon(iconOptions);

    // Correctly assign the marker to a variable
    var marker = L.marker([lat, lon], {icon: icon}).addTo(map);

    // Attach the click event listener correctly
    marker.on('click', function() {
        handleShowMore(facility);
    });
}


// Example usage: Add a dot to New York City
addDot(40.7128, -74.0060);

async function handleOnLoad(){
    await populateFacilitiesArray();
    //populateFacilitiesTable(facilities);
    populateUSMap(); // Initialize the map here
    populateFiltersContainer();
    addMapPoints();
}

  //DATA
// Retreive SQL data
async function populateFacilitiesArray() {
    try {
      const response = await fetch('http://localhost:5020/api/facilities');
      if (!response.ok) {
        throw new Error("Network response is not ok");
      } else {
        const data = await response.json();
        facilities = data.map(facility => {
          // Determine facility type based on name. used for filtering
          let type;
          if (facility.name.includes('Hub Site')) type = 'Division Office';
          else if (facility.divName.includes('Supply Chain')) type = 'Supply Chain Center';
          else if (facility.divName.includes('HSC')) type = 'Shared Service Center';
          else type = 'Hospital';
  
          return {...facility, type}; // Add type to each facility object
        });
        console.log(facilities);
        return facilities;
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  //POPULATE
  // Modify to accept facilities data as an argument
  function populateFacilitiesTable(facilitiesData) {
    let html = `
      <table class="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Division</th>
            <th>City</th>
            <th>State</th>
            <th>Timezone</th>
            <th>Address</th>
            <th>Zip</th>
            <th>EMR Name</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
    `;
  
    facilitiesData.forEach((facility, index) => {
        html += `
        <tr>
          <td>${index + 1}</td>
          <td>${facility.name}</td>
          <td>${facility.divName}</td>
          <td>${facility.city}</td>
          <td>${facility.state}</td>
          <td>${facility.timeZone}</td>
          <td>${facility.address1}</td>
          <td>${facility.zip}</td>
          <td>${facility.emrName}</td>
          <td>${facility.type}</td>
        </tr>
        `;
    });
  
    html += `</tbody></table>`;
    document.getElementById('facilities-table').innerHTML = html;
  }
  
  
  
  function populateFiltersContainer(){
    const states = [...new Set(facilities.map(facility => facility.state))].sort();
    // Extract unique timezones
    const timezones = [...new Set(facilities.map(facility => facility.timeZone))].sort();
    // Extract unique EMR names
    const emrNames = [...new Set(facilities.map(facility => facility.emrName))].sort();

    // Start building the HTML string for the filters container
    let html = `
      <div class="filter-box">
        <div class="filter-container">
        
      `;

    // State filter dropdown
    html += `<select id="stateFilter" onchange="applyFilters()">
                <option value="">Select State</option>`;
    states.forEach(state => {
        html += `<option value="${state}">${state}</option>`;
    });
    html += `</select>`;

    // Timezone filter dropdown
    html += `<select id="timezoneFilter" onchange="applyFilters()">
                <option value="">Select Timezone</option>`;
    timezones.forEach(timezone => {
        html += `<option value="${timezone}">${timezone}</option>`;
    });
    html += `</select>`;

    // EMR Name filter dropdown
    html += `<select id="emrNameFilter" onchange="applyFilters()">
                <option value="">Select EMR Name</option>`;
    emrNames.forEach(emrName => {
        html += `<option value="${emrName}">${emrName}</option>`;
    });
    html += `</select>`;

    // Add a facility type filter
    const types = ['Division Office', 'Supply Chain Center', 'Shared Service Center', 'Hospital'];

    html += `<select id="typeFilter" onchange="applyFilters()">
                <option value="">Select Facility Type</option>`;
    types.forEach(type => {
      html += `<option value="${type}">${type}</option>`;
    });
    html += `</select>`;

    
    // Extract unique cities
    const cities = [...new Set(facilities.map(facility => facility.city))].sort();
    
    // Extract unique division names
    const divisionNames = [...new Set(facilities.map(facility => facility.divName))].sort();
    
    // Add city filter dropdown
    html += `<select id="cityFilter" onchange="applyFilters()">
    <option value="">Select City</option>`;
    cities.forEach(city => {
      html += `<option value="${city}">${city}</option>`;
    });
    html += `</select>`;
    
    // Add division name filter dropdown
    html += `<select id="divisionNameFilter" onchange="applyFilters()">
    <option value="">Select Division</option>`;
    divisionNames.forEach(divName => {
      html += `<option value="${divName}">${divName}</option>`;
    });
    html += `</select>`;

    html+=`
    <button onclick="resetFilters()">Reset Filters</button>
    </div></div>
    `

    // Make sure to append the new filter HTML to the existing ones correctly
    // and update the inner HTML of the filter container
    document.getElementById('filter-container').innerHTML = html;
}

function addMapPoints(){
    facilities.forEach(facility => {
        addDot(facility)
    })
}
    
  //HANDLING
// Modify the applyFilters function to filter the facilities array
function applyFilters() {
    const stateFilter = document.getElementById('stateFilter').value;
    const timezoneFilter = document.getElementById('timezoneFilter').value;
    const emrNameFilter = document.getElementById('emrNameFilter').value;
    const typeFilter = document.getElementById('typeFilter').value;
    const cityFilter = document.getElementById('cityFilter').value; // New filter
    const divisionNameFilter = document.getElementById('divisionNameFilter').value; // New filter

    // Filter facilities based on selected filters
    let filteredFacilities = facilities.filter(facility => {
        return (!stateFilter || facility.state === stateFilter) &&
               (!timezoneFilter || facility.timeZone === timezoneFilter) &&
               (!emrNameFilter || facility.emrName === emrNameFilter) &&
               (!typeFilter || facility.type === typeFilter) &&
               (!cityFilter || facility.city === cityFilter) &&
               (!divisionNameFilter || facility.divName === divisionNameFilter);
    });

    // Clear existing markers from the map
    map.eachLayer(function (layer) {
        if (layer instanceof L.Marker) {
            map.removeLayer(layer);
        }
    });

    // Add markers for filtered facilities
    filteredFacilities.forEach(facility => {
        addDot(facility);
    });

    // Repopulate table with filtered results
    populateFacilitiesTable(filteredFacilities);
}


function handleShowMore(facility){
  console.log('facility chosen', facility);
  let html=`
      <h2>${facility.name}</h2>
      <p><strong>Division:</strong> ${facility.divName}</p>
      <p><strong>City:</strong> ${facility.city}</p>
      <p><strong>State:</strong> ${facility.state}</p>
      <p><strong>Timezone:</strong> ${facility.timeZone}</p>
      <p><strong>Address:</strong> ${facility.address1}</p>
      <p><strong>Zip:</strong> ${facility.zip}</p>
      <p><strong>EMR Name:</strong> ${facility.emrName}</p>
      <p><strong>Type:</strong> ${facility.type}</p>
      <!-- Add more information as needed -->
      `;

  document.getElementById('side-more-info').innerHTML = html;

  // Zoom to the clicked facility's location
  map.setView([facility.latitude, facility.longitude], 7); // Adjust the zoom level as needed
}

  