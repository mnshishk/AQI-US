function findAverage(array){
  var count = 0;
  var sum = 0;
  for (var value of array){
    count += 1
    sum += value[3]
  }
  return sum / count;
}

function setupPieData(array){
  var data = [{
      values: [],
      labels: [
        'Carbon Monoxide (1 hr. avg. ppm)',
        'Ozone (1 hr. avg. ppm)', 'PM2.5 (µg/m3)',
        'PM10 (µg/m3)',
        'Sulfur Dioxide (1 hr. avg. ppm)',
        "Nitrogen Dioxide (1 hr. avg. ppm)"
      ],
      type: 'pie'
  }];

  var ozone = [];
  var co = [];
  var pm25 = [];
  var pm10 = []
  var so2 = [];
  var no2 = [];
  for (var value of array){
    if (value[5] == 'o3'){
      ozone.push(value)
    }else if (value[5] == 'co'){
      co.push(value)
    }else if (value[5] == 'pm25'){
      pm25.push(value)
    }else if (value[5] == 'pm10'){
      pm10.push(value)
    }else if (value[5] == 'so2'){
      so2.push(value)
    }else if (value[5] == 'no2'){
      no2.push(value)
    }
  }
  data[0].values[0] = findAverage(co)
  data[0].values[1] = findAverage(ozone)
  data[0].values[2] = findAverage(pm25)
  data[0].values[3] = findAverage(pm10)
  data[0].values[4] = findAverage(so2)
  data[0].values[5] = findAverage(no2)
  return data
}

function PieLayout(){
  var layout = {
      height: 800,
      width: 1000,
      paper_bgcolor: "rgba(0,0,0,0)",
      font: {
        family: 'Times New Roman, serif',
        size: 18,
        color: "#ffffff"
      }
  };
  return layout;
}

function getMapParams(jsonString){
  var array = JSON.parse(jsonString);
  input = {"data": setupPieData(array), "layout": PieLayout()};
  return input;
};

function loadPie(){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function(){
      if (this.readyState === 4 && this.status === 200){
          var mapParams = getMapParams(this.response);
          Plotly.plot('info3', mapParams.data, mapParams.layout);
      }
  };
  xhttp.open("GET", "/project2/filter");
  xhttp.send();
};
