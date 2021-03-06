import {AfterViewInit, Component, OnInit} from '@angular/core';
import bornesChargements from "src/assets/bornesChargement.json";
import * as L from 'leaflet';
import {Borne} from "../model/borne";
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  // @ts-ignore
  map;

  // retrieve from https://gist.github.com/ThomasG77/61fa02b35abf4b971390
  smallIcon = new L.Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-icon.png',
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-icon-2x.png',
    iconSize:    [25, 41],
    iconAnchor:  [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    shadowSize:  [41, 41]
  });

  constructor() { }

  ngAfterViewInit(): void {
    this.createMap();
  }

  createMap() {
    const parcThabor = {
      lat: 48.114384,
      lng: -1.669494,
    };

    const zoomLevel = 12;

    this.map = L.map('map', {
      center: [parcThabor.lat, parcThabor.lng],
      zoom: zoomLevel
    });

    const mainLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    mainLayer.addTo(this.map);
    const descriptionWikipedia = `
      Le parc du Thabor, situé à Rennes à proximité du centre-ville,
      est un parc public aménagé sur plus de dix hectares dont la particularité est de mêler un jardin à la française,
      un jardin à l’anglaise et un important jardin botanique.`;
    const popupOptions = {
      coords: parcThabor,
      text: descriptionWikipedia,
      open: true
    };
    this.addMarker(popupOptions);
    this.loadBornes();
  }

  // @ts-ignore
  addMarker({coords, text, open}) {
    const marker = L.marker([coords.lat, coords.lng], { icon: this.smallIcon });
    if (open) {
      marker.addTo(this.map).bindPopup(text).openPopup();
    } else {
      marker.addTo(this.map).bindPopup(text);
    }
  }

  loadBornes(): Borne[] {
    const bornes: Borne[] = [];
    // @ts-ignore
    bornesChargements.map((item: any) => {
      const borne = new Borne(item);
      const content = "<h3>" + borne.title + "</h3><div class='card'><div class='card-body'>"
        + borne.locationDetails.address + "</div></div>"
      const borneOptions = {
        coords: [borne.locationDetails.latitude, borne.locationDetails.longitude],
        text: content,
        open: true
      }
      console.log(borneOptions);
      this.addMarker(borneOptions);
    })
    return bornes;
  }

}
