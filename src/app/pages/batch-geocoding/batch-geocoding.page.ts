import { Component, OnInit } from '@angular/core';
import {
  GoogleMaps,
  GoogleMap,
  Geocoder,
  BaseArrayClass,
  GeocoderResult,
  Marker
} from '@ionic-native/google-maps';
import { LoadingController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-batch-geocoding',
  templateUrl: './batch-geocoding.page.html',
  styleUrls: ['./batch-geocoding.page.scss'],
})
export class BatchGeocodingPage implements OnInit {

  map: GoogleMap;
  loading: any;

  constructor(public loadingCtrl: LoadingController, private platform: Platform) { }

  ngOnInit() {
    await this.platform.ready();
    await this.loadMap();
  }

  loadMap() {
    this.map = GoogleMaps.create('map_canvas3', {
      camera: {
        target: [
          {"lat": 37.789, "lng": -122.38},
          {"lat": 32.909, "lng": -117.181}
        ]
      }
    });
  }
  async onButton_click(event) {
    this.map2.clear();

    this.loading = await this.loadingCtrl.create({
      message: 'Please wait...'
    });
    await this.loading.present();
    let start = Date.now();

    // Geocode multiple location
    Geocoder.geocode({

      // Google office locations in California, USA
      "address": [
        "19510 Jamboree Road, Irvine, CA 92612, United States",
        "803 11th Avenue, Sunnyvale, CA 94089, United States",
        "6420 Sequence Dr, Suite 400, San Diego, CA 92121, United States",
        "345 Spear Street, San Francisco, CA 94105, United States",
        "901 Cherry Avenue, San Bruno, CA 94066, United States",
        "12422 W. Bluff Creek Drive,Playa Vista, CA 90094,United States",
        "1600 Amphitheatre Parkway,Mountain View, CA 94043,United States",
        "340 Main Street,Los Angeles, CA 90291,United States",
      ]
    })
    .then((mvcArray: BaseArrayClass<GeocoderResult[]>) => {

      mvcArray.on('insert_at').subscribe((params: any[]) => {
        const index: number = params[0];
        const result: GeocoderResult = mvcArray.getAt(index);
        this.map2.addMarkerSync({
          'position': result[0].position,
          'title':  JSON.stringify(result)
        });
      });
      mvcArray.one('finish').then(() => {
        this.loading.dismiss();
        let end = Date.now();
        alert("duration: " + ((end - start) / 1000).toFixed(1) + " seconds");

        let results: any[] = mvcArray.getArray();
        console.log(results);
      });

    });
  }

}
