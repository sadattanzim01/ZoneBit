//but mask helpers
//converts a GMT offset to a bit position in a 24 bit number
function offsetToBitPosition(offset) {
  return offset + 12;
}

//creates a 24 bit number with exactly one bit turned on
//at the position matching the GMT offset
function createCityMask(offset) {
  return 1 << offsetToBitPosition(offset);
}

function formatGMT(offset) {
  return `GMT ${offset >= 0 ? "+" : ""}${offset}`;
}

//City Data grouped by region
//each city has a name and a gmt offset integer organized
//into regions so the UI can render collapsible sections
const cityData = {
  "Europe": [
    { name: "Reykjavik (Iceland)",         gmt: 0  },
    { name: "London (United Kingdom)",      gmt: 1  },
    { name: "Dublin (Ireland)",             gmt: 1  },
    { name: "Lisbon (Portugal)",            gmt: 1  },
    { name: "Madrid (Spain)",               gmt: 2  },
    { name: "Paris (France)",               gmt: 2  },
    { name: "Berlin (Germany)",             gmt: 2  },
    { name: "Brussels (Belgium)",           gmt: 2  },
    { name: "Amsterdam (Netherlands)",      gmt: 2  },
    { name: "Rome (Italy)",                 gmt: 2  },
    { name: "Bern (Switzerland)",           gmt: 2  },
    { name: "Vienna (Austria)",             gmt: 2  },
    { name: "Luxembourg (Luxembourg)",      gmt: 2  },
    { name: "Monaco (Monaco)",              gmt: 2  },
    { name: "Andorra la Vella (Andorra)",   gmt: 2  },
    { name: "Vatican City (Vatican)",       gmt: 2  },
    { name: "Copenhagen (Denmark)",         gmt: 2  },
    { name: "Oslo (Norway)",                gmt: 2  },
    { name: "Stockholm (Sweden)",           gmt: 2  },
    { name: "Helsinki (Finland)",           gmt: 3  },
    { name: "Tallinn (Estonia)",            gmt: 3  },
    { name: "Riga (Latvia)",                gmt: 3  },
    { name: "Vilnius (Lithuania)",          gmt: 3  },
    { name: "Warsaw (Poland)",              gmt: 2  },
    { name: "Prague (Czech Republic)",      gmt: 2  },
    { name: "Bratislava (Slovakia)",        gmt: 2  },
    { name: "Budapest (Hungary)",           gmt: 2  },
    { name: "Ljubljana (Slovenia)",         gmt: 2  },
    { name: "Zagreb (Croatia)",             gmt: 2  },
    { name: "Sarajevo (Bosnia)",            gmt: 2  },
    { name: "Belgrade (Serbia)",            gmt: 2  },
    { name: "Podgorica (Montenegro)",       gmt: 2  },
    { name: "Pristina (Kosovo)",            gmt: 2  },
    { name: "Skopje (North Macedonia)",     gmt: 2  },
    { name: "Tirana (Albania)",             gmt: 2  },
    { name: "Athens (Greece)",              gmt: 3  },
    { name: "Nicosia (Cyprus)",             gmt: 3  },
    { name: "Valletta (Malta)",             gmt: 2  },
    { name: "Bucharest (Romania)",          gmt: 3  },
    { name: "Sofia (Bulgaria)",             gmt: 3  },
    { name: "Chisinau (Moldova)",           gmt: 3  },
    { name: "Kyiv (Ukraine)",               gmt: 3  },
    { name: "Minsk (Belarus)",              gmt: 3  },
    { name: "Moscow (Russia)",              gmt: 3  },
    { name: "San Marino (San Marino)",      gmt: 2  },
  ],
  "North America": [
    { name: "Ottawa (Canada)",              gmt: -4 },
    { name: "Washington DC (USA)",          gmt: -4 },
    { name: "Mexico City (Mexico)",         gmt: -6 },
    { name: "Guatemala City (Guatemala)",   gmt: -6 },
    { name: "Belmopan (Belize)",            gmt: -6 },
    { name: "Tegucigalpa (Honduras)",       gmt: -6 },
    { name: "San Salvador (El Salvador)",   gmt: -6 },
    { name: "Managua (Nicaragua)",          gmt: -6 },
    { name: "San Jose (Costa Rica)",        gmt: -6 },
    { name: "Panama City (Panama)",         gmt: -5 },
    { name: "Nassau (Bahamas)",             gmt: -4 },
    { name: "Havana (Cuba)",                gmt: -4 },
    { name: "Kingston (Jamaica)",           gmt: -5 },
    { name: "Port-au-Prince (Haiti)",       gmt: -4 },
    { name: "Santo Domingo (Dom. Rep.)",    gmt: -4 },
    { name: "San Juan (Puerto Rico)",       gmt: -4 },
    { name: "Bridgetown (Barbados)",        gmt: -4 },
    { name: "Port of Spain (Trinidad)",     gmt: -4 },
    { name: "Castries (Saint Lucia)",       gmt: -4 },
    { name: "Kingstown (St. Vincent)",      gmt: -4 },
    { name: "St. George's (Grenada)",       gmt: -4 },
    { name: "Roseau (Dominica)",            gmt: -4 },
    { name: "Basseterre (St. Kitts)",       gmt: -4 },
    { name: "St. John's (Antigua)",         gmt: -4 },
  ],
  "South America": [
    { name: "Bogota (Colombia)",            gmt: -5 },
    { name: "Quito (Ecuador)",              gmt: -5 },
    { name: "Lima (Peru)",                  gmt: -5 },
    { name: "Caracas (Venezuela)",          gmt: -4 },
    { name: "Georgetown (Guyana)",          gmt: -4 },
    { name: "Paramaribo (Suriname)",        gmt: -3 },
    { name: "Cayenne (French Guiana)",      gmt: -3 },
    { name: "Brasilia (Brazil)",            gmt: -3 },
    { name: "Buenos Aires (Argentina)",     gmt: -3 },
    { name: "Montevideo (Uruguay)",         gmt: -3 },
    { name: "Asuncion (Paraguay)",          gmt: -4 },
    { name: "Santiago (Chile)",             gmt: -3 },
    { name: "La Paz (Bolivia)",             gmt: -4 },
    { name: "Sucre (Bolivia)",              gmt: -4 },
  ],
  "Africa": [
    { name: "Rabat (Morocco)",              gmt: 1  },
    { name: "Algiers (Algeria)",            gmt: 1  },
    { name: "Tunis (Tunisia)",              gmt: 1  },
    { name: "Tripoli (Libya)",              gmt: 2  },
    { name: "Cairo (Egypt)",                gmt: 2  },
    { name: "Khartoum (Sudan)",             gmt: 3  },
    { name: "Juba (South Sudan)",           gmt: 3  },
    { name: "Addis Ababa (Ethiopia)",       gmt: 3  },
    { name: "Asmara (Eritrea)",             gmt: 3  },
    { name: "Djibouti (Djibouti)",          gmt: 3  },
    { name: "Mogadishu (Somalia)",          gmt: 3  },
    { name: "Nairobi (Kenya)",              gmt: 3  },
    { name: "Kampala (Uganda)",             gmt: 3  },
    { name: "Kigali (Rwanda)",              gmt: 2  },
    { name: "Bujumbura (Burundi)",          gmt: 2  },
    { name: "Dodoma (Tanzania)",            gmt: 3  },
    { name: "Dar es Salaam (Tanzania)",     gmt: 3  },
    { name: "Lilongwe (Malawi)",            gmt: 2  },
    { name: "Lusaka (Zambia)",              gmt: 2  },
    { name: "Harare (Zimbabwe)",            gmt: 2  },
    { name: "Gaborone (Botswana)",          gmt: 2  },
    { name: "Pretoria (South Africa)",      gmt: 2  },
    { name: "Maseru (Lesotho)",             gmt: 2  },
    { name: "Mbabane (Eswatini)",           gmt: 2  },
    { name: "Maputo (Mozambique)",          gmt: 2  },
    { name: "Antananarivo (Madagascar)",    gmt: 3  },
    { name: "Moroni (Comoros)",             gmt: 3  },
    { name: "Port Louis (Mauritius)",       gmt: 4  },
    { name: "Victoria (Seychelles)",        gmt: 4  },
    { name: "Luanda (Angola)",              gmt: 1  },
    { name: "Windhoek (Namibia)",           gmt: 2  },
    { name: "Kinshasa (DR Congo)",          gmt: 1  },
    { name: "Brazzaville (Congo)",          gmt: 1  },
    { name: "Libreville (Gabon)",           gmt: 1  },
    { name: "Malabo (Equatorial Guinea)",   gmt: 1  },
    { name: "Yaounde (Cameroon)",           gmt: 1  },
    { name: "Bangui (CAR)",                 gmt: 1  },
    { name: "N'Djamena (Chad)",             gmt: 1  },
    { name: "Niamey (Niger)",               gmt: 1  },
    { name: "Abuja (Nigeria)",              gmt: 1  },
    { name: "Porto-Novo (Benin)",           gmt: 1  },
    { name: "Lome (Togo)",                  gmt: 0  },
    { name: "Accra (Ghana)",                gmt: 0  },
    { name: "Yamoussoukro (Ivory Coast)",   gmt: 0  },
    { name: "Monrovia (Liberia)",           gmt: 0  },
    { name: "Freetown (Sierra Leone)",      gmt: 0  },
    { name: "Conakry (Guinea)",             gmt: 0  },
    { name: "Bissau (Guinea-Bissau)",       gmt: 0  },
    { name: "Banjul (Gambia)",              gmt: 0  },
    { name: "Dakar (Senegal)",              gmt: 0  },
    { name: "Praia (Cape Verde)",           gmt: -1 },
    { name: "Bamako (Mali)",                gmt: 0  },
    { name: "Ouagadougou (Burkina Faso)",   gmt: 0  },
    { name: "Nouakchott (Mauritania)",      gmt: 0  },
    { name: "Sao Tome (Sao Tome & Principe)", gmt: 0 },
  ],
  "Middle East": [
    { name: "Ankara (Turkey)",              gmt: 3  },
    { name: "Beirut (Lebanon)",             gmt: 3  },
    { name: "Damascus (Syria)",             gmt: 3  },
    { name: "Amman (Jordan)",               gmt: 3  },
    { name: "Jerusalem (Israel)",           gmt: 3  },
    { name: "Baghdad (Iraq)",               gmt: 3  },
    { name: "Tehran (Iran)",                gmt: 3  },
    { name: "Kuwait City (Kuwait)",         gmt: 3  },
    { name: "Riyadh (Saudi Arabia)",        gmt: 3  },
    { name: "Manama (Bahrain)",             gmt: 3  },
    { name: "Doha (Qatar)",                 gmt: 3  },
    { name: "Abu Dhabi (UAE)",              gmt: 4  },
    { name: "Muscat (Oman)",                gmt: 4  },
    { name: "Sanaa (Yemen)",                gmt: 3  },
  ],
  "Central Asia": [
    { name: "Kabul (Afghanistan)",          gmt: 4  },
    { name: "Islamabad (Pakistan)",         gmt: 5  },
    { name: "New Delhi (India)",            gmt: 5  },
    { name: "Kathmandu (Nepal)",            gmt: 5  },
    { name: "Thimphu (Bhutan)",             gmt: 6  },
    { name: "Dhaka (Bangladesh)",           gmt: 6  },
    { name: "Colombo (Sri Lanka)",          gmt: 5  },
    { name: "Male (Maldives)",              gmt: 5  },
    { name: "Astana (Kazakhstan)",          gmt: 5  },
    { name: "Bishkek (Kyrgyzstan)",         gmt: 6  },
    { name: "Dushanbe (Tajikistan)",        gmt: 5  },
    { name: "Tashkent (Uzbekistan)",        gmt: 5  },
    { name: "Ashgabat (Turkmenistan)",      gmt: 5  },
    { name: "Tbilisi (Georgia)",            gmt: 4  },
    { name: "Yerevan (Armenia)",            gmt: 4  },
    { name: "Baku (Azerbaijan)",            gmt: 4  },
  ],
  "East & Southeast Asia": [
    { name: "Beijing (China)",              gmt: 8  },
    { name: "Tokyo (Japan)",                gmt: 9  },
    { name: "Seoul (South Korea)",          gmt: 9  },
    { name: "Pyongyang (North Korea)",      gmt: 9  },
    { name: "Ulaanbaatar (Mongolia)",       gmt: 8  },
    { name: "Taipei (Taiwan)",              gmt: 8  },
    { name: "Bangkok (Thailand)",           gmt: 7  },
    { name: "Vientiane (Laos)",             gmt: 7  },
    { name: "Phnom Penh (Cambodia)",        gmt: 7  },
    { name: "Hanoi (Vietnam)",              gmt: 7  },
    { name: "Naypyidaw (Myanmar)",          gmt: 6  },
    { name: "Kuala Lumpur (Malaysia)",      gmt: 8  },
    { name: "Singapore (Singapore)",        gmt: 8  },
    { name: "Bandar Seri Begawan (Brunei)", gmt: 8  },
    { name: "Jakarta (Indonesia)",          gmt: 7  },
    { name: "Dili (East Timor)",            gmt: 9  },
    { name: "Manila (Philippines)",         gmt: 8  },
  ],
  "Oceania": [
    { name: "Canberra (Australia)",         gmt: 10 },
    { name: "Wellington (New Zealand)",     gmt: 12 },
    { name: "Port Moresby (Papua New Guinea)", gmt: 10 },
    { name: "Honiara (Solomon Islands)",    gmt: 11 },
    { name: "Port Vila (Vanuatu)",          gmt: 11 },
    { name: "Suva (Fiji)",                  gmt: 12 },
    { name: "Funafuti (Tuvalu)",            gmt: 12 },
    { name: "Tarawa (Kiribati)",            gmt: 12 },
    { name: "Majuro (Marshall Islands)",    gmt: 12 },
    { name: "Palikir (Micronesia)",         gmt: 11 },
    { name: "Ngerulmud (Palau)",            gmt: 9  },
    { name: "Yaren (Nauru)",                gmt: 12 },
    { name: "Nuku'alofa (Tonga)",           gmt: 13 },
    { name: "Apia (Samoa)",                 gmt: 13 },
    { name: "Pago Pago (American Samoa)",   gmt: -11 },
  ],
};
//flattens all regions intoa single array and attaches a bitmask to it
//each city; this is exactly what the search logic runs against
const cities = Object.values(cityData).flat().map(city => ({
  ...city,
  bits: createCityMask(city.gmt)
}));

//Search Logic
//this app basically uses bitwise AND instead of === to match cities
//if city.bits & searchMask is non-zero then they share the same GMT bit → match
//the invert flag powers the "NOT in GMT" bonus feature
function findCities(searchOffset, invert = false) {
  const searchMask = createCityMask(searchOffset);
  return cities.filter(city => {
    const match = (city.bits & searchMask) !== 0;
    return invert ? !match : match;
  });
}

//Render city list
//builds the collapsible region sections dynamically from cityData
//Europe opens by default, all other regions start collapsed
function renderCityList() {
  const container = document.getElementById("city-list");

  Object.entries(cityData).forEach(([region, regionCities], regionIndex) => {
    const section = document.createElement("div");
    section.className = "region-section";

    const header = document.createElement("button");
    header.className = "region-header" + (regionIndex === 0 ? " open" : "");
    header.innerHTML = `
      <span class="region-name">${region}</span>
      <span class="region-meta">${regionCities.length} cities</span>
      <span class="region-chevron">▾</span>
    `;

    const body = document.createElement("div");
    body.className = "region-body" + (regionIndex === 0 ? "" : " collapsed");

    regionCities.forEach(city => {
      const cityIndex = cities.findIndex(c => c.name === city.name);
      const label = document.createElement("label");
      label.className = "city-label";
      label.innerHTML = `
        <input type="checkbox" data-index="${cityIndex}" checked />
        <span class="city-name">${city.name}</span>
        <span class="gmt-badge">${formatGMT(city.gmt)}</span>
      `;
      body.appendChild(label);
    });

    //toggle the collapse/expand when region header is clicked
    header.addEventListener("click", () => {
      body.classList.toggle("collapsed");
      header.classList.toggle("open");
    });

    section.appendChild(header);
    section.appendChild(body);
    container.appendChild(section);
  });
}

//Display results
//renders matched cities into the output panel with a count summary
//each result animates in with a staggered delay
function displayResults(matched, offset, invert) {
  const resultsList = document.getElementById("results");
  const countEl     = document.getElementById("result-count");
  const outputSec   = document.getElementById("output-section");

  resultsList.innerHTML = "";
  outputSec.classList.add("visible");

  const direction = invert ? "NOT in" : "in";
  const offsetStr = formatGMT(offset);
  const cityWord  = matched.length === 1 ? "city" : "cities";

  countEl.innerHTML = `
    <span class="count-number">${matched.length}</span>
    <span class="count-label">${cityWord} found ${direction} <strong>${offsetStr}</strong></span>
  `;

  if (matched.length === 0) {
    resultsList.innerHTML = `<li class="no-result">No cities matched this offset.</li>`;
    return;
  }

  matched.forEach((city, idx) => {
    const li = document.createElement("li");
    li.style.animationDelay = `${idx * 40}ms`;
    li.innerHTML = `
      <span class="result-city">${city.name}</span>
      <span class="gmt-badge">${formatGMT(city.gmt)}</span>
    `;
    resultsList.appendChild(li);
  });
}

// --- ERROR ---
function showError(msg) {
  const countEl   = document.getElementById("result-count");
  const outputSec = document.getElementById("output-section");
  document.getElementById("results").innerHTML = "";
  outputSec.classList.add("visible");
  countEl.innerHTML = `<span class="error-msg">⚠ ${msg}</span>`;
}

//Search handler
//reads and validates the GMT input, then calls findCities()
//handles both "Find Cities" and "NOT in GMT" button clicks
function runSearch(invert) {
  const raw = document.getElementById("gmt-input").value.trim();

  if (raw === "" || isNaN(raw)) {
    showError("Enter a valid integer between -12 and +13.");
    return;
  }

  const offset = parseInt(raw, 10);

  if (offset < -12 || offset > 13) {
    showError("Offset must be between -12 and +13.");
    return;
  }

  const matched = findCities(offset, invert);
  displayResults(matched, offset, invert);
}

//INIT
//runs on page load then renders the city list and wires up all event listeners
document.addEventListener("DOMContentLoaded", () => {
  renderCityList();

  document.getElementById("find-btn").addEventListener("click", () => runSearch(false));
  document.getElementById("find-not-btn").addEventListener("click", () => runSearch(true));

  document.getElementById("gmt-input").addEventListener("keydown", e => {
    if (e.key === "Enter") runSearch(false);
  });
});