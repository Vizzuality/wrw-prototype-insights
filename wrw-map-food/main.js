/* LAYERS */
//scenarios
var year = [20,30,40];
var scenario = [24,28,38];

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
//crops

//population

var Layer2020A,
    Layer2020B,
    Layer2020C,
    Layer2030A,
    Layer2030B,
    Layer2030C,
    Layer2040A,
    Layer2040B,
    Layer2040C;     
         
var startVis = function() {
  
  var baseMaps = {
    "Basemap": L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer/tile/{z}/{y}/{x}', {maxZoom: 18, zIndex:1})
    };
  var map = L.map('map', {
    scrollWheelZoom: true,
    center: [8.928487062665504, 39.5947265625,],
    zoom: 3,
    layers:[baseMaps.Basemap]
  });
   
   cartodb.createLayer(map,stresScenario(year[0],scenario[0])).addTo(map)
  .done(function(layer){
    Layer2020A = layer
    cartodb.createLayer(map,stresScenario(year[0],scenario[1])).addTo(map)
    .done(function(layer){
    Layer2020B=layer;
      cartodb.createLayer(map,stresScenario(year[0],scenario[2])).addTo(map)
      .done(function(layer){
      Layer2020C=layer;
      cartodb.createLayer(map,stresScenario(year[1],scenario[0])).addTo(map)
      .done(function(layer){
        Layer2030A=layer; 
        cartodb.createLayer(map,stresScenario(year[1],scenario[1])).addTo(map)
        .done(function(layer){
          Layer2030B=layer; 
          cartodb.createLayer(map,stresScenario(year[1],scenario[2])).addTo(map)
          .done(function(layer){
            Layer2030C=layer; 
            cartodb.createLayer(map,stresScenario(year[2],scenario[0])).addTo(map)
            .done(function(layer){
              Layer2040A=layer;
              cartodb.createLayer(map,stresScenario(year[2],scenario[1])).addTo(map)
              .done(function(layer){
                Layer2040B=layer; 
                cartodb.createLayer(map,stresScenario(year[2],scenario[2])).addTo(map)
                .done(function(layer){
                  Layer2040C=layer;
                  var stresScenarios = {
                      "2020_scenario_A":Layer2020A,
                      "2020_scenario_B":Layer2020B,
                      "2020_scenario_C":Layer2020C,
                      "2030_scenario_A":Layer2030A,
                      "2030_scenario_B":Layer2030B,
                      "2030_scenario_C":Layer2030C,
                      "2040_scenario_A":Layer2040A,
                      "2040_scenario_B":Layer2040B,
                      "2040_scenario_C":Layer2040C
                    };
                    L.control.layers(stresScenarios, null).addTo(map);
                  });
                });
              });
            });
          });
        });
      });
    });
  });


};

window.onload = startVis;
