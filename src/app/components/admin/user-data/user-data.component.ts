import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AdminService } from '../../../services/admin/admin.service';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { LatLngExpression, LeafletMouseEvent } from 'leaflet';
import * as L from 'leaflet';
import { Shape } from '../../../models/shape';
import { LeafletLayersModel } from '../../../models/leafletLayers';
import { PositionService } from '../../../services/position/position.service';
import { Coordinate } from '../../../models/coordinates';
import { TimedPosition } from '../../../models/timedPosition';
import { Point } from '../../../models/point';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css']
})
export class UserDataComponent implements OnInit {
  userSub : Subscription;
  positions : TimedPosition[] = [];
  constructor(
    private adminService: AdminService,
    private positionService : PositionService
  ) {
    this.apply();
    //this.userData$ = this.adminService.getUserData();
    
  } 

  ngOnInit() {
  }
  ngOnDestroy() { 
    if(this.userSub !== null && this.userSub !==undefined)
      this.userSub.unsubscribe(); 
   }
  

   geoMap: L.Map;
   layerOfMarkers : L.Layer;
   markerLayers = new Array<any>();
   shape : Shape;
   // Open Street Map and Open Cycle Map definitions
   LAYER_OCM = {
     id: 'opencyclemap',
     name: 'Open Cycle Map',
     enabled: true,
     layer: L.tileLayer('http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png', {
       maxZoom: 18,
       attribution: 'Open Cycle Map'
     })
   };
   LAYER_OSM = {
     id: 'openstreetmap',
     name: 'Open Street Map',
     enabled: false,
     layer: L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
       maxZoom: 18,
       attribution: 'Open Street Map'
     })
   };

   greenIcon = L.icon({
    iconUrl: '/assets/redMarker.png',

    iconSize:     [35, 35], // size of the icon
    });

   marker = {
		id: 'marker',
		name: 'marker',
		enabled: true,
		layer: L.marker(
      [ 45.0642791, 7.65603950000002 ], {icon: this.greenIcon}
    )
	};
   // Form model object
   model = new LeafletLayersModel(
     [ this.LAYER_OSM, this.LAYER_OCM ],
     this.LAYER_OSM.id,
     [  ]
   );
   // Values to bind to Leaflet Directive
   layers: L.Layer[];
   
   options = {
     zoom: 13,
     center: L.latLng(45.0642791, 7.65603950000002)
   };
 

    cancel(){
      
      if(this.layerOfMarkers !== null && this.layerOfMarkers !== undefined){
        this.geoMap.removeLayer(this.layerOfMarkers);
      }
      this.geoMap.removeLayer(this.model.overlayLayers[0].layer);
      
     
    }

   onMapReady(map: L.Map) {
    this.geoMap = map;
    this.userSub = this.adminService.getUserData()
                                        .subscribe( (data) => 
                                                  { //console.dir(data); 
                                                    for(let i = 0; i < data.length; i++){
                                                      //console.dir(data[i]);
                                                      this.positions.push(data[i]);
                                                    }
                                                    this.addMarkerToMap();
                                                  } );
    //this.positions = this.positionService.getAllPositions();

   }

   addMarkerToMap(){
    for(let i=0 ; i< this.positions.length; i++){
      let lat = this.positions[i].point.coordinates[0];
      let lng = this.positions[i].point.coordinates[1];
      let timestamp = this.positions[i].timestamp;
      // add each marker as a layer
      this.markerLayers[i] = L.marker([lat, lng], {icon: this.greenIcon});
      this.markerLayers[i].bindPopup("<b>User:</b><br><b>Timestamp:</b> "+ (new Date(timestamp)).toString());
    }
    // add all layers as a single array to layer
    this.layerOfMarkers = L.layerGroup(this.markerLayers);
    this.geoMap.addLayer(this.layerOfMarkers);
   }

   apply() {
 
     // Get the active base layer
     const baseLayer = this.model.baseLayers.find((l: any) => (l.id === this.model.baseLayer));
 
     // Get all the active overlay layers
     const newLayers = this.model.overlayLayers
       //.filter((l: any) => l.enabled)
       .map((l: any) => l.layer);
     newLayers.unshift(baseLayer.layer);
     this.layers = newLayers;
 
     return false;
   }

}
