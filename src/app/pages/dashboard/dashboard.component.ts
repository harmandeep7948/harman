import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../../services/api.service'; 

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {
  public weatherSearchForm: FormGroup;
  public weatherData: any;
  public currentWeatherData: any;
  public long: any;
  public lat: any;
  public weatherError: any;
  public covidArray: any;
  public covidError: any;
  public indiaData: any;

  constructor(private formBuilder: FormBuilder, private apiService: ApiService, public AuthService: AuthService) { }

  ngOnInit(): void {
    this.weatherSearchForm = this.formBuilder.group({
      location: ['']
    });
    this.getCoordinates();
    this.getCovidData();
  }

  clearError() {
    this.weatherError = '';
  }

  sendToAPI(formValues: any) {
    this.clearError();
    this.apiService.getWeather(formValues.location)
    .toPromise()
    .then((data) => {
      this.weatherData = data;  
    }).catch(_error => {
      this.weatherError = _error;
      console.log(_error);
    })
  }

  getCovidData() {  
    this.apiService.getCovid().subscribe(  
      response => {  
        this.covidArray = response;  
        this.getIndiaData();   
      }  
    )
  } 

  getIndiaData() {
    this.indiaData = this.covidArray.Countries.find(x => x.Slug == "india");
    console.log(this.indiaData);
  }

  getCoordinates() {
    this.apiService.getPosition().then(pos => {
      console.log(`Positon: ${pos.lng} ${pos.lat}`);
      this.apiService.getCurrentWeather(pos.lng, pos.lat)
      .toPromise()
      .then((currentData) => {
        this.currentWeatherData = currentData;
        console.log(this.currentWeatherData);
      }).catch(error => {
        console.log(error);
      })
    });
  }
}
