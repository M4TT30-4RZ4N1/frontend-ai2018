import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Shape } from '../../../../models/shape';
import { LeafletLayersModel } from '../../../../models/leafletLayers';
import * as L from 'leaflet';
import { PositionService } from '../../../../services/position/position.service';
import { LeafletMouseEvent } from 'leaflet';
import { Subscription } from 'rxjs/Subscription';
import { Coordinate } from '../../../../models/coordinates';
import { UserService } from '../../../../services/user/user.service';
import { TimedPosition } from '../../../../models/timedPosition';
import { Point } from '../../../../models/point';

@Component({
  selector: 'app-insert',
  templateUrl: './insert.component.html',
  styleUrls: ['./insert.component.css']
})
export class InsertComponent implements OnInit {
    positionSub : Subscription;
  
    geoMap: L.Map;
    layerOfMarkers : L.Layer;
    markerLayers = new Array<any>();
    positionToSend : TimedPosition[] = [];
    // Open Street Map and Open Cycle Map definitions
    greenIcon = L.icon({
      iconUrl: '/assets/redMarker.png',
  
      iconSize:     [35, 35], // size of the icon
    });
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
    
    positions : Coordinate[];
  
    // Form model object
    model = new LeafletLayersModel(
      [ this.LAYER_OSM, this.LAYER_OCM ],
      this.LAYER_OSM.id,
      [ ]
    );
  
  
    // Values to bind to Leaflet Directive
    layers: L.Layer[];
    
    options = {
      zoom: 13,
      center: L.latLng(45.0642791, 7.65603950000002)
    };
  
    constructor(
      private changeDetectorRef:ChangeDetectorRef, 
      private positionService: PositionService,
      private userService : UserService
    ) {
      this.apply();
  
    } 
    ngOnInit() {
    }
    ngOnDestroy(): void {
      if(this.positionSub != null)
        this.positionSub.unsubscribe();
    }
  
    onMapReady(map: L.Map) {
      this.geoMap = map;
      map.on('click', (e : LeafletMouseEvent) => {
        // add all layers as a single array to layer
        let timestamp = new Date().getTime();
        let p : Point = new Point("Point", [e.latlng.lat, e.latlng.lng]);
        let timedPosition : TimedPosition = new TimedPosition(p,"",timestamp);
        this.positionToSend.push(timedPosition);

        this.markerLayers.push(L.marker(e.latlng, {icon: this.greenIcon}));
        this.layerOfMarkers = L.layerGroup(this.markerLayers);
        this.geoMap.addLayer(this.layerOfMarkers);
        this.changeDetectorRef.detectChanges();
      });
  
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
    sendPositions(){
      this.positionSub = this.userService.sendPositions(this.positionToSend)
                                        .subscribe( (data) => 
                                                  { 
                                                  },
                                                (error) =>
                                                  {
                                                    console.log(error);
                                                    alert("Error during the request")
                                                  } );    
    }

    cancel(){
      
      if(this.layerOfMarkers !== null && this.layerOfMarkers !== undefined){
        this.geoMap.removeLayer(this.layerOfMarkers);
      }
      this.markerLayers = [];
      this.positionToSend = [];
     
    }
}
