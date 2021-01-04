import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public lat : string;
  public long: string;
  public mess: string;
  private url: string = "https://api.covid19api.com/summary"; 
  constructor(private http: HttpClient) { }
  getWeather(location) {
    return this.http.get(
      "https://api.openweathermap.org/data/2.5/weather?q="+location+"&appid=29477c56553ceeab826cbcf8560b648b&units=metric");

  }

  getCurrentWeather(long, lat) {
    return this.http.get(
      "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&appid=29477c56553ceeab826cbcf8560b648b&units=metric");
  }

  getCovid() {
    return this.http.get(
      this.url);
  }
  
  getPosition(): Promise<any>
  {
    return new Promise((resolve, reject) => {

      navigator.geolocation.getCurrentPosition(resp => {

          resolve({lng: resp.coords.longitude, lat: resp.coords.latitude});
        },
        err => {
          reject(err);
        });
    });

  }
}
