/* LAYERS */
//scenarios
var year = [20,30,40];
var scenarios = 28;

//water stress scenario generator
var stresScenario = function(year,scenario) {
    var scenario = {
      user_name: 'insights',
      type: 'cartodb',
      sublayers: [{
          sql: 'SELECT * FROM aqueduct_projections_20150309',
        cartocss:'#aqueduct_projections_20150309 {'+
        'polygon-opacity:1;'+
        'polygon-gamma:.2;'+
        'polygon-fill: rgba(0,0,0,0);'+
        '[ws'+year+scenario+'cl="2.8x or greater decrease"] { polygon-fill:#0099cc; }'+
        '[ws'+year+scenario+'cl="2x decrease"]   { polygon-fill:#73afd1;  }'+
        '[ws'+year+scenario+'cl="1.4x decrease"] { polygon-fill:#abc7d9;  }'+
        '[ws'+year+scenario+'cl="Near normal"]   { polygon-fill:#ddd; }'+
        '[ws'+year+scenario+'cl="1.4x increase"] { polygon-fill:#f8ab95;  }'+
        '[ws'+year+scenario+'cl="2x increase"]   { polygon-fill:#ff7351;  }'+
        '[ws'+year+scenario+'cl="2.8x or greater increase"] { polygon-fill:#ff1900; }}'
      },

      {     
        sql: "select * from irrigation",
        cartocss: '#irrigation {raster-opacity:1; raster-colorizer-default-mode: discrete; raster-scaling:lanczos; raster-colorizer-stops: stop(2,rgba(255,255,255,0)) stop(10,rgba(255,255,255,1)) stop(50,rgba(255,255,255,1)) stop(255,rgba(255,255,255,1)); comp-op: dst-in;}',
        raster: true,
        raster_band: 1
      }],
    };

  return scenario
};
//countryLayer that will go on top
var countryLayer={
  user_name: 'insights',
      type: 'cartodb',
      sublayers: [{
        sql: 'SELECT * FROM countriedata',
        cartocss:'#countriedata{ polygon-fill: transparent; polygon-opacity: 0.7; line-color: #000000; line-width: 0.5; line-opacity: 0.1;}',
        interactivity: ['cartodb_id', 'y2014']
       
       }],
    };
//population

var Layer2020B,
    Layer2030B,
    Layer2040B;     
         
var startVis = function() {
  
  var baseMaps = {
    "Basemap": L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer/tile/{z}/{y}/{x}', {maxZoom: 18, zIndex:0})
    };
  var map = L.map('map', {
    scrollWheelZoom: true,
    center: [8.928487062665504, 39.5947265625,],
    zoom: 3,
    layers:[baseMaps.Basemap]
  });

  cartodb.createLayer(map,stresScenario(year[1],scenarios)).addTo(map)
   //y asi es como se añade interactivity con un infowindow!
  cartodb.createLayer(map,countryLayer).addTo(map)
    .done(function(layer) {
      cdb.vis.Vis.addInfowindow(map, layer.getSubLayer(0), countryLayer.sublayers[0].interactivity);
    });

  // .done(function(layer){
  //   Layer2020B = layer
  //   cartodb.createLayer(map,stresScenario(year[1],scenarios)).addTo(map)
  //   .done(function(layer){
  //   Layer2030B=layer;
  //     cartodb.createLayer(map,stresScenario(year[2],scenarios)).addTo(map)
  //     .done(function(layer){
  //     Layer2040B=layer;
  //         var stresScenarios = {
  //         "2020_scenario_B":Layer2020B,
  //         "2030_scenario_B":Layer2030B,
  //         "2040_scenario_B":Layer2040B
  //         };
  //         L.control.layers(stresScenarios, null).addTo(map);    
  //     });
  //   });
  // });
       
  


};

window.onload = startVis;
