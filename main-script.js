//sourse

// Standard OSM layer
var osm=new ol.layer.Tile({
    title: 'OpenStreetMap', 
    type: 'base',
    source: new ol.source.OSM()
});
// Transport OSM layer
var trans=new ol.layer.Tile({
    title: 'Transport', 
    type: 'base',
    source: new ol.source.OSM({
        url: 'https://tile.thunderforest.com/transport/{z}/{x}/{y}.png?apikey=ca1e9bfe3fda4ae2b94f08ce52557a68',
        attributions: 'Tiles provided by <a href="http://thunderforest.com">ThunderForest</a>',
        maxZoom: 17
    })
});

//geojson layers
//here are the tram line and station vector files

//Tram line
var style=[
    new ol.style.Style({
        fill: new ol.style.Fill({
            color: 'green'
        }),
        stroke: new ol.style.Stroke({
            color:'#3399CC',
            width: 3,
        })
    })
];

var route=new ol.layer.Vector({
    title: "Tram Route",
    source: new ol.source.Vector({
        format: new ol.format.GeoJSON(),
        url: 'data/line.geojson',
    }),
    style: style,
});
// tram station points
var pcStyle=new ol.style.Style({
    stroke: new ol.style.Stroke({ color: [255,128,0,.6], width: 2 }),
    fill: new ol.style.Fill({ color: [255,128,0,.2] })
});

var pomStyle=(f,r)=>new ol.style.Style({
    image: new ol.style.Circle({
        radius: 4,
        fill: new ol.style.Fill({ color: 'red' }),
        stroke: new ol.style.Stroke({ 
            width: 1, 
            color: 'black'
        })
    }),
    text: new ol.style.Text({ 
        text: f.get('Point number')+'',
        textAlign: 'left',
        offsetX: 13,
        font: '12px sans-serif',
        stroke: new ol.style.Stroke({ width: 4, color: 'white' })
    })
});

// style function using 'name' attribute as label
var poiStyle = function (f, r) {
    return new ol.style.Style({
        image: new ol.style.Circle({
            radius: 3,
            stroke: new ol.style.Stroke({ color: [0, 0, 0, .6], width: 0.00001 }),
            fill: new ol.style.Fill({ color: [255,255,255,0.5] })
        }),

    });
};

// style function using 'name' attribute as label
var points=new ol.layer.Vector({
     title: "Points",
     source: new ol.source.Vector({
         format: new ol.format.GeoJSON(),
         url: 'data/points.geojson'
     }),
     style: pomStyle,
     declutter: true
 });

//map object
var map=new ol.Map({
    target: 'map_div',
    layers: [osm,trans,route,points],
    view: new ol.View({
        center: ol.proj.fromLonLat([19.1, 47.5]),
        zoom: 12
    })
});   

//map.addLayer(route,points);
map.addControl(new ol.control.LayerSwitcher());
