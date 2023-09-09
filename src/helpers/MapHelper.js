import { icon } from 'leaflet';
const popupAnchor = [0, -30];
export const customIcons = {
  iconHere: icon({
    iconUrl: new URL('/src/assets/images/map/marker-here.png',
      import.meta.url).href,
    iconSize: [21, 32],
    iconAnchor: [10, 32],
    popupAnchor,
  }),
  iconLanding: icon({
    iconUrl: new URL('/src/assets/images/map/marker-landing.png',
      import.meta.url).href,
    iconSize: [21, 32],
    iconAnchor: [10, 32],
    popupAnchor,
  }),
  iconTakeoff: icon({
    iconUrl: new URL('/src/assets/images/map/marker-takeoff.png',
      import.meta.url).href,
    iconSize: [21, 32],
    iconAnchor: [10, 32],
    popupAnchor,
  }),
  iconPlane: icon({
    iconUrl: new URL('/src/assets/images/map/plane.png',
      import.meta.url).href,
    iconSize: [15, 15],
    iconAnchor: [15, 15],
    popupAnchor: [0, -20],
    className: 'plane'
  }),
  ownPlane: icon({
    iconUrl: new URL('/src/assets/images/map/plane.png',
      import.meta.url).href,
    iconSize: [15, 15],
    iconAnchor: [15, 15],
    popupAnchor: [0, -20],
  }),
  acarPlane: icon({
    iconUrl: new URL('/src/assets/images/map/plane_yellow.png',
      import.meta.url).href,
    iconSize: [15, 15],
    iconAnchor: [15, 15],
    popupAnchor: [0, -20],
  }),
  iconLocationRed: icon({
    iconUrl: new URL('/src/assets/images/map/location-red.png',
      import.meta.url).href,
    iconSize: [12, 16],
    iconAnchor: [6, 16],
    popupAnchor: [0, -20],
  }),
  iconLocationYellow: icon({
    iconUrl: new URL('/src/assets/images/map/location-yellow.png',
      import.meta.url).href,
    iconSize: [12, 16],
    iconAnchor: [6, 16],
    popupAnchor: [0, -20],
  }),
  iconLocationBlue: icon({
    iconUrl: new URL('/src/assets/images/map/location-blue.png',
      import.meta.url).href,
    iconSize: [12, 16],
    iconAnchor: [6, 16],
    popupAnchor: [0, -20],
  }),
  iconLocationLightBlue: icon({
    iconUrl: new URL('/src/assets/images/map/location-lightblue.png',
      import.meta.url).href,
    iconSize: [12, 16],
    iconAnchor: [6, 16],
    popupAnchor: [0, -20],
  }),
  iconLocationGreen: icon({
    iconUrl: new URL('/src/assets/images/map/location-green.png',
      import.meta.url).href,
    iconSize: [12, 16],
    iconAnchor: [6, 16],
    popupAnchor: [0, -20],
  }),
  iconLocationGray: icon({
    iconUrl: new URL('/src/assets/images/map/location-gray.png',
      import.meta.url).href,
    iconSize: [12, 16],
    iconAnchor: [6, 16],
    popupAnchor: [0, -20],
  }),
};