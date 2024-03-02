function _1(md){return(
md
)}

function _chart(d3,topojson,us)
{
  const width = 975;
  const height = 610;

  const zoom = d3.zoom()
      .scaleExtent([1, 8])
      .on("zoom", zoomed);

  const svg = d3.create("svg")
      .attr("viewBox", [0, 0, width, height])
       .attr("width", width)
      .attr("height", height)
      .attr("style", "max-width: 100%; height: auto;")
      .on("click", reset);

  const path = d3.geoPath();

  const g = svg.append("g");

  const states = g.append("g")
      .attr("fill", "#444")
      .attr("cursor", "pointer")
    .selectAll("path")
    .data(topojson.feature(us, us.objects.states).features)
    .join("path")
      .on("click", clicked)
      .attr("d", path);
  
  states.append("title")
      .text(d => d.properties.name);

  g.append("path")
      .attr("fill", "none")
      .attr("stroke", "white")
      .attr("stroke-linejoin", "round")
      .attr("d", path(topojson.mesh(us, us.objects.states, (a, b) => a !== b)));

  svg.call(zoom);

  function reset() {
    states.transition().style("fill", null);
    svg.transition().duration(750).call(
      zoom.transform,
      d3.zoomIdentity,
      d3.zoomTransform(svg.node()).invert([width / 2, height / 2])
    );
  }

  function clicked(event, d) {
    const [[x0, y0], [x1, y1]] = path.bounds(d);
    event.stopPropagation();
    states.transition().style("fill", null);
    d3.select(this).transition().style("fill", "red");
    svg.transition().duration(750).call(
      zoom.transform,
      d3.zoomIdentity
        .translate(width / 2, height / 2)
        .scale(Math.min(8, 0.9 / Math.max((x1 - x0) / width, (y1 - y0) / height)))
        .translate(-(x0 + x1) / 2, -(y0 + y1) / 2),
      d3.pointer(event, svg.node())
    );
  }

  function zoomed(event) {
    const {transform} = event;
    g.attr("transform", transform);
    g.attr("stroke-width", 1 / transform.k);
  }

  return svg.node();
}


function _us(FileAttachment){return(
FileAttachment("states-albers-10m.json").json()
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["states-albers-10m.json", {url: new URL("./files/75faaaca1f1a4f415145b9db520349a3a0b93a53c1071346a30e6824586a7c251f45367d9262ed148b7a2b5c2694aa7703f3ac88051abc65066fd0074fdf9c9e.json", import.meta.url), mimeType: "application/json", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("chart")).define("chart", ["d3","topojson","us"], _chart);
  main.variable(observer("us")).define("us", ["FileAttachment"], _us);
  return main;
}

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
