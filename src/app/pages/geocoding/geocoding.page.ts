import { Component, OnInit } from '@angular/core';
import { Platform, LoadingController, ToastController } from '@ionic/angular';
import { Environment } from '@ionic-native/google-maps';
import {
  GoogleMap,
  GoogleMaps,
  GoogleMapsEvent,
  Geocoder,
  GeocoderResult,
  GoogleMapsAnimation,
  Marker,
  MyLocation} from '@ionic-native/google-maps/ngx';

@Component({
  selector: 'app-geocoding',
  templateUrl: './geocoding.page.html',
  styleUrls: ['./geocoding.page.scss'],
})
export class GeocodingPage implements OnInit {

  map: GoogleMap;
  loading: any;

  constructor(public loadingCtrl: LoadingController, private platform: Platform, public toastCtrl: ToastController) { }

  async ngOnInit() {
    await this.platform.ready();
    await this.loadMap();
  }

  loadMap() {
    Environment.setEnv({
      'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyBG2qkcfyKgIBzOoSnoLhBl_3CHJkS_2js',
      'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyBG2qkcfyKgIBzOoSnoLhBl_3CHJkS_2js'
    });

    this.map = GoogleMaps.create('map_canvas2', {
      camera: {
        target: {
          lat: 43.0741704,
          lng: -89.3809802
        },
        zoom: 18,
        tilt: 30
      }
    });

  }

  async onButtonClick() {
    this.map.clear();

    this.loading = await this.loadingCtrl.create({
      message: 'Rastreando tu ubicación...'
    });
    await this.loading.present();

    // Get the location of you
    this.map.getMyLocation().then((location: MyLocation) => {
      this.loading.dismiss();
      console.log(JSON.stringify(location, null ,2));

      // Move the map camera to the location with animation
      this.map.animateCamera({
        target: location.latLng,
        zoom: 17,
        tilt: 30
      });

      // add a marker
      let marker: Marker = this.map.addMarkerSync({
        // title: JSON.stringify(location.latLng),
        position: location.latLng,
        animation: GoogleMapsAnimation.BOUNCE
      });

      // show the infoWindow
      marker.showInfoWindow();

      // If clicked it, display the alert
      marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
        this.showToast('clicked!');
      });
    })
    .catch(err => {
      this.loading.dismiss();
      this.showToast(err.error_message);
    });
  }

  async showToast(message: string) {
    let toast = await this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'middle'
    });

    toast.present();
  }

}
