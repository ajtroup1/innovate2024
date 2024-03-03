let facilities = [];
let map; // Declare map variable

let usMap; // Declare main map variable
let alaskaMap; // Declare Alaska map variable
let hawaiiMap; // Declare Hawaii map variable

// Function to initialize the main map
function populateUSMap() {
    // Set the bounds for the United States, including Alaska and Hawaii
    var usBounds = [
        [49.384358, -66.93457], // North East
        [24.396308, -125.00165] // South West
    ];

    // Initialize the map with the bounds
    usMap = L.map('usMap', {
        maxBounds: usBounds,
        minZoom: 3 // Adjust the minZoom as needed to prevent zooming out too far
    }).setView([37.8, -96], 4);

    // Add a tile layer to the main map
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxBounds: usBounds, // Apply bounds to the tile layer as well
        noWrap: true // Prevent the map from wrapping around the world
    }).addTo(usMap);

    // Create mini-maps for Alaska and Hawaii
    alaskaMap = new L.Control.MiniMap(L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'), { toggleDisplay: true }).addTo(usMap);
    hawaiiMap = new L.Control.MiniMap(L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'), { toggleDisplay: true }).addTo(usMap);

    // Set positions of mini-maps
    alaskaMap._container.style.bottom = '10px';
    alaskaMap._container.style.left = '10px';
    hawaiiMap._container.style.bottom = '10px';
    hawaiiMap._container.style.left = '150px'; // Adjust left position as needed

    // Set bounds and zoom level for Alaska
    var alaskaBounds = [
        [70.461799,-143.390298], // North East
        [57.551209,-166.494581] // South West
    ];
    alaskaMap._miniMap.setView([61.370716, -152.404419], 3); // Adjust center and zoom level as needed
    alaskaMap._miniMap.options.minZoom = 3;
    alaskaMap._miniMap.setMaxBounds(alaskaBounds);

    // Set bounds and zoom level for Hawaii
    var hawaiiBounds = [
        [22.236744, -154.566406], // North East
        [18.986428, -160.659180] // South West
    ];
    hawaiiMap._miniMap.setView([20.8036, -157.505], 7); // Adjust center and zoom level as needed
    hawaiiMap._miniMap.options.minZoom = 7;
    hawaiiMap._miniMap.setMaxBounds(hawaiiBounds);

    // Define regions with their coordinates
    let regions = [
        {
            name: 'TriStar',
            coordinates: [
                [38.510349, -82.632833],
                [36.276164, -81.797315],
                [34.810195, -84.479769],
                [37.610750, -93.802396],
                [37.121782, -88.877234],
                [38.819167, -84.699143]
            ]
        },
        {
            name: 'Mountain',
            coordinates: [
                [43.193965, -111.928249],
                [43.449728, -116.167303],
                [39.446374, -110.793601]
            ]
        },
        {
            name: 'Far West',
            coordinates: [
                [36.438961, -121.523416],
                [33.302986, -116.730179],
                [36.049099, -114.795294]
            ]
        },
        {
            name: 'Central & West Texas',
            coordinates: [
                [31.784217, -106.422521],
                [31.259770, -106.026750],
                [30.656816, -98.990805],
                [33, -99]
            ]
        },
        {
            name: 'San Antonio',
            coordinates: [
                [29.897806, -98.331185],
                [28.671311, -99.122729],
                [28.863918, -98.639008]
            ]
        },
        {
            name: 'Gulf Coast',
            coordinates: [
                [26.064681, -97.451692],
                [26.301297, -98.243236],
                [29.561993, -96.836047],
                [31.574791, -96.606034],
                [31.049169, -95.726541],
                [29.033118, -95.550642]
            ]
        },
        {
            name: 'Continental',
            coordinates: [
                [37.854037, -97.045605],
                [39.058437, -105.224890],
                [40.007421, -104.301423]
            ]
        },
        {
            name: 'MidAmerica',
            coordinates: [
                [39.296898, -95.154694],
                [38.579091, -94.714948],
                [39.024305, -92.736088],
                [39.534550, -93.660524]
            ]
        },
        {
            name: 'North Texas',
            coordinates: [
                [33.429607, -96.006197],
                [32.803898, -98.007043],
                [32.415211, -96.841715],
                [32.748474, -96.028184]
            ]
        },
        {
            name: 'SouthAtlantic',
            coordinates: [
                [33.868135, -78.741476],
                [32.855364, -79.702225],
                [30.273299, -81.445446],
                [30.327841, -82.179959],
                [31.283245, -82.689268],
                [32.859286, -83.072822],
                [33.977986, -82.743013]
            ]
        },
        {
            name: 'NorthFlorida',
            coordinates: [
                [30.806022, -87.355954],
                [30.644528, -84.189932],
                [30.182172, -82.444138],
                [29.934943, -81.388747],
                [28.864880, -80.911621],
                [28.169843, -80.735723],
                [29.923517, -85.401433]
            ]
        },
  {
    name: 'WestFlorida',
    coordinates: [
      [28.237617, -82.822320],
      [28.344031, -82.316611],
      [28.294708, -81.547191],
      [26.460738, -81.679115],
      [27.525810, -82.757272]
    ]
  },
  {
    name: 'EastFlorida',
    coordinates: [
      [27.467338, -80.800400],
      [27.739940, -80.206742],
      [25.183071, -79.920907],
      [25.242709, -80.470590]
    ]
  },
  {
    name: 'NorthCarolina',
    coordinates: [
      [35.329019, -83.638168],
      [35.992227, -82.319883],
      [36.169807, -81.264491],
      [34.665741, -81.528339],
      [34.665741, -82.935528]
    ]
  },
  {
    name: 'Capital',
    coordinates: [
      [43.615396, -71.290952],
      [42.943553, -70.323510],
      [36.758249, -76.655750],
      [36.758250, -81.305613],
      [37.056930, -81.679398],
      [38.839708, -83.336428],
      [38.771216, -87.821842],
      [39.791655, -87.777868]
    ],
  }]


  // Create polygons for each region
  createPolygons(regions);



      hawaiiMap._miniMap.setView([20.8036, -157.505], 7); // Adjust center and zoom level as needed
      hawaiiMap._miniMap.options.minZoom = 7;
      hawaiiMap._miniMap.setMaxBounds(hawaiiBounds);
  }

  function createPolygons(regions) {
    regions.forEach(region => {
        // Expand the coordinates of the region to create a larger zone
        let expandedCoordinates = region.coordinates.map(coord => [coord[0] + 0.1, coord[1] + 0.1]);

        // Create a polygon with the expanded coordinates of the region
        let polygon = L.polygon(expandedCoordinates, {color: 'transparent', fillOpacity: 0}).addTo(usMap);

        // Add text on top of the polygon with the district name
        let center = polygon.getBounds().getCenter();
        let districtName = region.name;
        let text = L.divIcon({
            className: 'text-label',
            html: `<div class="label-text">${districtName}</div>`,
            iconSize: [100, 40], // Increase icon size for larger text label
            iconAnchor: [50, 20] // Center the text label on the marker
        });
        let marker = L.marker(center, { icon: text }).addTo(usMap);

        // Hide the text label by default
        marker.getElement().style.display = 'none';

        // Event listeners to show/hide text label on hover
        polygon.on('mouseover', function () {
            marker.getElement().style.display = 'block';
        });
        polygon.on('mouseout', function () {
            marker.getElement().style.display = 'none';
        });
    });
}




  // Function to add a dot to the map
  function addDot(map, facility) {
      let type = facility.type;
      let lat = facility.latitude;
      let lon = facility.longitude;
      if(lat === undefined || lon === undefined) {
          console.error("Latitude or longitude is undefined for facility:", facility);
          return; // Skip this facility if lat or lon is undefined
      }
      var iconOptions = {
          iconSize: [12, 12], // size of the icon
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
        // Check if the facility is located in Alaska
        if (isInAlaska(facility)) {
            addDot(alaskaMap._miniMap, facility); // Use alaskaMap._miniMap for the Alaska mini-map
        } else {
            addDot(usMap, facility); // Add points to the main map for facilities outside Alaska
        }
    })
  }
      
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
    usMap.eachLayer(function (layer) { // Use usMap instead of map
        if (layer instanceof L.Marker) {
            usMap.removeLayer(layer); // Use usMap instead of map
        }
    });

    // Add markers for filtered facilities
    filteredFacilities.forEach(facility => {
        addDot(usMap, facility); // Pass usMap as the first argument
    });

  }



  function handleShowMore(facility) {
    console.log('facility chosen', facility);
    let html = `
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

    // Check if the map view needs to be updated
    if (!map.getBounds().contains([facility.latitude, facility.longitude])) {
      // Zoom to the clicked facility's location
      map.setView([facility.latitude, facility.longitude], 7); // Adjust the zoom level as needed
    }
  }

  function isInAlaska(facility) {
    const alaskaBounds = [
        [70.461799,-143.390298], // North East
        [57.551209,-166.494581] // South West
    ];
    const lat = facility.latitude;
    const lon = facility.longitude;
    return lat >= alaskaBounds[1][0] && lat <= alaskaBounds[0][0] &&
          lon >= alaskaBounds[1][1] && lon <= alaskaBounds[0][1];
  }