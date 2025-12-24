import { API_URL } from './config_api.js';

async function setStatesAPI(setStates) {
    var requestOptions = {
      method: 'POST',
      redirect: 'follow'
    };

    const response = await fetch(API_URL + "/query/states", requestOptions);
    let json = await response.json();
    setStates(json);
    
    return json;
}

async function setMetroAPI(setMetros, state) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "value": state
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    let response = await fetch(API_URL + "/query/metro_by_state", requestOptions)
    let json = await response.json();
    setMetros(json);
    return json;
}

async function setMetroAllAPI(setMetros) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Access-Control-Allow-Origin", "*");

  var requestOptions = {
    method: 'POST',
    redirect: 'follow',
    headers: myHeaders
  };

  let response = await fetch(API_URL + "/query/metros", requestOptions)
  let json = await response.json();
  setMetros(json);
  return json;
}


export async function setMetroInfoAPI(setMetros, metro) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "value": metro
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    let response = await fetch(API_URL + "/query/metro_rank", requestOptions);
    let json = await response.json();
    // console.log("status: " + response.status);
    if (response.status == 200) {
      // console.log("setting metros");
      // console.log(json);
        setMetros(json);
    }
    // console.log(json);
    return json;
}

export async function setMetroTransitTypeInfoAPI(setMetros, metro) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    "value": metro
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  let response = await fetch(API_URL + "/query/metro_rank/transit", requestOptions);
  let json = await response.json();
  // console.log("status: " + response.status);
  if (response.status == 200) {
      setMetros(json);
  }
  // console.log(json);
  return json;
}

async function setAgencies(setAgency, metro) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    "value": metro
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  let response = await fetch(API_URL + "/query/agency_name_by_metro", requestOptions);
  let json = await response.json();
  // console.log("status: " + response.status);
  if (response.status == 200) {
      setAgency(json);
  }
  // console.log(json);
  return json;
}

async function setAgencyModesApi(setAgencyMode, agencyName) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    "value": agencyName
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  let response = await fetch(API_URL + "/query/agency_modes", requestOptions);
  let json = await response.json();
  // console.log("status: " + response.status);
  if (response.status == 200) {
      setAgencyMode(json);
  }
  return json;
}

async function setLineGraphDataApi(setGraphData, ntdId, mode, tos) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  // console.log("ntdId " + ntdId + ", " + mode + ", " + tos);

  var raw = JSON.stringify({
    "ntdId": ntdId,
    "mode": mode,
    "typeOfService": tos,
    "type": "UPT"
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  let response = await fetch(API_URL + "/query/ridership_data", requestOptions);
  let json = await response.json();
  // console.log("status: " + response.status);
  if (response.status == 200) {
      setGraphData(json);
  }
  // console.log("line graph data: " + json);
  return json;
}


async function setLineGraphDataApiByMonth(setGraphData, ntdId, mode, tos) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  // console.log("ntdId " + ntdId + ", " + mode + ", " + tos);

  var raw = JSON.stringify({
    "ntdId": ntdId,
    "mode": mode,
    "typeOfService": tos,
    "type": "UPT"
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  let response = await fetch(API_URL + "/query/ridership_data_month", requestOptions);
  let json = await response.json();
  // console.log("status: " + response.status);
  if (response.status == 200) {
      setGraphData(json);
  }
  // console.log("line graph data: " + json);
  return json;
}


export async function setPieChartTransitModesAPI(setChart, metro, statistic) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    "metropolitanArea": metro,
    "statistic": statistic
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  let response = await fetch(API_URL + "/query/piechart", requestOptions);
  let json = await response.json();
  if (response.status == 200) {
    setChart(json);
  }
  return json;
}

export async function setTransitModesAPI(setTransit, metro, statistic) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    "metropolitanArea": metro,
    "statistic": statistic
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  let response = await fetch(API_URL + "/query/piechart", requestOptions);
  let json = await response.json();
  if (response.status == 200) {
    let bus = getTransitMode(json, "Bus");
    let rail = getTransitMode(json, "Rail");
    let demand = getTransitMode(json, "Demand");
    let total = bus + rail + demand;
    // Only update if we have valid data (total > 0)
    if (total > 0) {
      let busPercent = (bus / total) * 100;
      let railPercent = (rail / total) * 100;
      let demandPercent = (demand / total) * 100;
      let body = {
        bus: busPercent,
        rail: railPercent,
        demand: demandPercent
      }
      console.log("body")
      console.log(body)
      // setTransit can be a function (callback) or a setState function
      if (typeof setTransit === 'function') {
        setTransit(body);
      }
    }
  }
  return json;
}

function getTransitMode(json, mode) {
  for (let i = 0; i < json.portions.length; i++) {
    if (json.portions[i].category == mode) {
      return json.portions[i].data;
    }
  }
  return 0;
}

async function setStackedBartChartTransitModesAPI(setChart, metro, statistic) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    "metropolitanArea": metro,
    "statistic": statistic
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  let response = await fetch(API_URL + "/query/stacked_bar_chart", requestOptions);
  let json = await response.json();
  if (response.status == 200) {
    setChart(json);
  }
  return json;
}

export async function setStackedBartChartTransitModesAPIYear(setChart, metro, statistic, year) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    "metropolitanArea": metro,
    "statistic": statistic,
    "year": year
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  let response = await fetch(API_URL + "/query/stacked_bar_chart_by_year", requestOptions);
  let json = await response.json();
  if (response.status == 200) {
    if (setChart) {
      setChart(json);
    }
    console.log("stacked bar chart by year: " + json);
  } else {
    console.log("error: " + response.status);
  }
  return json;
}

export async function setStackedBartChartAgency(setChart, metro) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    "value": metro,
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  console.log("set stacked bar chart")
  let response = await fetch(API_URL + "/query/agency_data", requestOptions);
  let json = await response.json();
  if (response.status == 200) {
    setChart(json);
  } else {
    console.log("error: " + response.status);
  }
  return json;
}


export async function setYearsForMetro(setYears, metro, statistic) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    "metropolitanArea": metro,
    "statistic": statistic
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  let response = await fetch(API_URL + "/query/get_years_of_metro", requestOptions);
  let json = await response.json();
  if (response.status == 200) {
    setYears(json);
  } else {
    console.log("error: " + response.status);
  }
  return json;
}


