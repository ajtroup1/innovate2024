//ONLOAD
async function handleOnLoad(){
  await populateFacilitiesArray();
    populateFacilitiesTable(facilities);
    populateFiltersContainer();
}

//array for ALL facilities, 261?
let facilities = []


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
    let html = `<div class="filters">`;

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
    html += `</div>`;
    html += `</select>`;
    
    // Make sure to append the new filter HTML to the existing ones correctly
    // and update the inner HTML of the filter container
    document.getElementById('filter-container').innerHTML = html;
  }
  
//HANDLING
function applyFilters() {
  const stateFilter = document.getElementById('stateFilter').value;
  const timezoneFilter = document.getElementById('timezoneFilter').value;
  const emrNameFilter = document.getElementById('emrNameFilter').value;
  const typeFilter = document.getElementById('typeFilter').value;
  const cityFilter = document.getElementById('cityFilter').value; // New filter
  const divisionNameFilter = document.getElementById('divisionNameFilter').value; // New filter

  const filteredFacilities = facilities.filter(facility => {
      return (!stateFilter || facility.state === stateFilter) &&
             (!timezoneFilter || facility.timeZone === timezoneFilter) &&
             (!emrNameFilter || facility.emrName === emrNameFilter) &&
             (!typeFilter || facility.type === typeFilter) &&
             (!cityFilter || facility.city === cityFilter) && // New filter condition
             (!divisionNameFilter || facility.divName === divisionNameFilter); // New filter condition
  });

  // Repopulate table with filtered results
  populateFacilitiesTable(filteredFacilities);
}
