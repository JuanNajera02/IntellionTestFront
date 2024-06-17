import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AddCar } from '../models/addCar';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Car } from '../models/cars';

@Injectable({
  providedIn: 'root'
})
export class ApisService {

  url:string = "http://localhost:8080"

  constructor(private http:HttpClient) { }


  addCar(car:AddCar ):Observable<any>{
    return this.http.post(this.url+"/cars/addCar", car)
  }

  getAllCars(): Observable<Car[]> {
    return this.http.get<any[]>(this.url + "/cars/getCars")
  }

  getCarById(id: number): Observable<any> {
    return this.http.get<any>(this.url + "/cars/getCar/" + id);
  }


  updateCar(car:Car):Observable<any>{
    return this.http.put(this.url+"/cars/updateCar", car)
  }

  deleteCar(id: number): Observable<any> {
    return this.http.delete(this.url + "/cars/deleteCar/"+id);
  }



}
