function setupMapOData(array){
    var scl = [[0,'#33cc33'],[0.35,'#ffff00'],[0.5,'#ff9900'], [0.6,'#ff3300'],[0.7,'#9900cc'],[1,'#9900cc']];

    var data = [{
        'type':'scattergeo',
        "locationmode": 'USA-states',
        "lon": [],
        "lat": [],
        "hoverinfor": [],
        "text": [],
        "mode": 'markers',
        "marker": {
            "size": 8,
            "opacity": 0.8,
            "reversescale": false,
            "autocolorscale": false,
            "symbol": 'circle',
            "line": {
                "width": 1,
                "color": 'rgb(102,102,102)'
            },
            "colorscale": scl,
            "cmin": 0,
            "color": [],
            "colorbar": {
                "title": 'Concentration Values: O3'
            }
        }
    }];
    for (value of array){
      if (value[5] == 'o3'){
        data[0].lon.push(value[2])
        data[0].lat.push(value[1])
        data[0].hoverinfor.push(value[0])
        data[0].text.push(value[0] + ' ' + value[3] + ' ' + value[4])
        data[0].marker.color.push(value[3])
      }
    }
    return data;
}

function mapOLayout(){
    var layout = {
        title: 'Hourly Air Concentration of Ozone in Cities of U.S',
        colorbar: true,
        geo: {
            scope: 'north america',
            projection: {
                type: 'albers usa'
            },
            showland: true,
            showrivers: true,
            rivercolor: "#4da6ff",
            showlakes: true,
            lakecolor: "#b3e6ff",
            landcolor: '#f2f2f2',
            subunitcolor: 'rgb(68,68,68)',
            countrycolor: 'rgb(217,217,217)',
            countrywidth: 0.5,
            subunitwidth: 0.5
        },
      paper_bgcolor: "rgba(0,0,0,0)",
      font: {
        size: 12,
        color: "#ffffff"
      },
      titlefont: {
          family: "Times New Roman, serif",
          size: 24
        }
    };
    return layout;
}

  function getMapOParams(jsonString){
    var array = JSON.parse(jsonString);
    input = {"data": setupMapOData(array), "layout": mapOLayout()};
    return input;
};


function loadOMap(){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function(){
      if (this.readyState === 4 && this.status === 200){
          var mapParams = getMapOParams(this.response);
          Plotly.plot('info1', mapParams.data, mapParams.layout);
      }
  };
  xhttp.open("GET", "/project2/filter");
  xhttp.send();
};
