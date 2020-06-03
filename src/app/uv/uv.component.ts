import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-uv',
  templateUrl: './uv.component.html',
  styleUrls: ['./uv.component.css']
})
export class UvComponent implements OnInit {
  loc$: Observable<string>;
  loc: string;
  currentWeather: any = <any>{};
  hourly: any = <any>{};
  uv: any[] = [];
  msg: string;

  constructor(
    private store: Store<any>,
    private weatherService: WeatherService
  ) {
    this.loc$ = store.pipe(select('loc'));
    this.loc$.subscribe(loc => {
      this.loc = loc;
      this.searchWeather(loc);
    })
  }

  ngOnInit() {
  }

  searchWeather(loc: string) {
    this.msg = '';
    this.currentWeather = {};
    this.weatherService.getCurrentWeather(loc)
      .subscribe(res => {
        this.currentWeather = res;
      }, err => {

      }, () => {
        // this.searchUv(loc);
        // this.searchHour(loc);
      })
  }

  // searchUv(loc: string) {
  //   this.weatherService.getUv(this.currentWeather.coord.lat, this.currentWeather.coord.lon)
  //     .subscribe(res => {
  //       this.uv = res as any[];
  //     }, err => {

  //     })
  // }

// searchHour(loc: string) {
//   this.weatherService.getHour(loc).subscribe(res => {
//     console.log("Hourly data"+ JSON.stringify(res));
    
//     this.hourly = res;
//   }, err => {

//     })
// }

  resultFound() {
    return Object.keys(this.currentWeather).length > 0;
  }

}
