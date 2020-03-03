import { Component, OnInit, NgZone } from '@angular/core';
import { Platform, LoadingController } from '@ionic/angular';
import {
  GoogleMaps,
  GoogleMap,
  Geocoder,
  GeocoderResult,
  GoogleMapsAnimation,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  Environment
} from '@ionic-native/google-maps/ngx';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit {

  map: GoogleMap;
  loading: any;
  search_address: any;

  address: Object;
  establishmentAddress: Object;

  formattedAddress: string;
  formattedEstablishmentAddress: string;

  long: any;
  lat: any;

  ciudad: string;
  numExt: string;
  cp: string;
  estado: string;

  phone: string;
  isDisabled = true;

  constructor(private platform: Platform, public loadingCtrl: LoadingController, public zone: NgZone) { }

  async ngOnInit() {
    await this.platform.ready();
    await this.loadMap();
  }

  loadMap() {
    // This code is necessary for browser
    Environment.setEnv({
      'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyBG2qkcfyKgIBzOoSnoLhBl_3CHJkS_2js',
      'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyBG2qkcfyKgIBzOoSnoLhBl_3CHJkS_2js'
    });

    // Create a map
    // after the view is ready
    // and the native paltform is ready
    this.map = GoogleMaps.create('map_canvas');
  }

  async onButtonClick(event: any) {
    this.loading = await this.loadingCtrl.create({
      message: 'Please wait...'
    });
    await this.loading.present();
    this.map.clear();

    // Address -> latitude,longitude
    Geocoder.geocode({
      address: this.formattedAddress
    })
    .then((results: GeocoderResult[]) => {
      console.log(results);
      this.loading.dismiss();

      if (results.length > 0) {
        let marker: Marker = this.map.addMarkerSync({
          position: results[0].position,
          // title:  JSON.stringify(results[0].position)
          title:  this.formattedAddress,
          animation: GoogleMapsAnimation.BOUNCE
        });
        this.map.animateCamera({
          target: marker.getPosition(),
          zoom: 17
        });

        marker.showInfoWindow();
        // console.log(results[0].position.lat);
        // console.log(results[0].position.lng);
        this.lat = results[0].position.lat;
        this.long = results[0].position.lng;
      } else {
        alert('Not found');
      }
    });
  }

  getAddress(place: object) {
    this.address = place['formatted_address'];
    this.phone = this.getPhone(place);
    this.formattedAddress = place['formatted_address'];
    // this.lat = place['geometry']['location']['lat']['[[Scopes]][0]'];
    this.zone.run(() => this.formattedAddress = place['formatted_address']);
    console.log(place);
    // console.log(place['geometry']['location']['lat']);
    /*
    this.numExt = place['address_components'][0]['short_name'];
    this.ciudad = place['address_components'][3]['short_name'];
    this.estado = place['address_components'][4]['long_name'];
    */
    // this.cp = place['address_components'][6]['short_name'];
    /* Mostrar direccion en maps */
    this.onButtonClick(this.formattedAddress);
    this.isDisabled = false;
  }

  getEstablishmentAddress(place: object) {
    this.establishmentAddress = place['formatted_address'];
    this.phone = this.getPhone(place);
    this.formattedEstablishmentAddress = place['formatted_address'];
    this.zone.run(() => {
      this.formattedEstablishmentAddress = place['formatted_address'];
      this.phone = place['formatted_phone_number'];
    });
  }

  getAddrComponent(place, componentTemplate) {
    let result;

    for (let i = 0; i < place.address_components.length; i++) {
      const addressType = place.address_components[i].types[0];
      if (componentTemplate[addressType]) {
        result = place.address_components[i][componentTemplate[addressType]];
        return result;
      }
    }
    return;
  }

  getStreetNumber(place) {
    const COMPONENT_TEMPLATE = { street_number: 'short_name' },
      streetNumber = this.getAddrComponent(place, COMPONENT_TEMPLATE);
    return streetNumber;
  }

  getStreet(place) {
    const COMPONENT_TEMPLATE = { route: 'long_name' },
      street = this.getAddrComponent(place, COMPONENT_TEMPLATE);
    return street;
  }

  getCity(place) {
    const COMPONENT_TEMPLATE = { locality: 'long_name' },
      city = this.getAddrComponent(place, COMPONENT_TEMPLATE);
    return city;
  }

  getState(place) {
    const COMPONENT_TEMPLATE = { administrative_area_level_1: 'short_name' },
      state = this.getAddrComponent(place, COMPONENT_TEMPLATE);
    return state;
  }

  getDistrict(place) {
    const COMPONENT_TEMPLATE = { administrative_area_level_2: 'short_name' },
      state = this.getAddrComponent(place, COMPONENT_TEMPLATE);
    return state;
  }

  getCountryShort(place) {
    const COMPONENT_TEMPLATE = { country: 'short_name' },
      countryShort = this.getAddrComponent(place, COMPONENT_TEMPLATE);
    return countryShort;
  }

  getCountry(place) {
    const COMPONENT_TEMPLATE = { country: 'long_name' },
      country = this.getAddrComponent(place, COMPONENT_TEMPLATE);
    return country;
  }

  getPostCode(place) {
    const COMPONENT_TEMPLATE = { postal_code: 'long_name' },
      postCode = this.getAddrComponent(place, COMPONENT_TEMPLATE);
    return postCode;
  }

  getPhone(place) {
    const COMPONENT_TEMPLATE = { formatted_phone_number: 'formatted_phone_number' },
      phone = this.getAddrComponent(place, COMPONENT_TEMPLATE);
    return phone;
  }

}
