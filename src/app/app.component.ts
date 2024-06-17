import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ApisService } from './services/apis.service';
import { Car } from './models/cars';
import { AddCar } from './models/addCar';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{

  constructor(private apis:ApisService) { }
  title = 'intellion-test';
  Cars: Car[] = [];
  newCar: Car = {
    id: 0,
    brand: '',
    model: '',
    year: ''
  };

  selectedCar: Car = {
    id: 0,
    brand: '',
    model: '',
    year: ''
  };
  editMode = false;

  ngOnInit(): void {

    this.apis.getAllCars().subscribe((res: Car[]) => {
      this.Cars = res;
      console.log(this.Cars);
    });



  }

  addCar() {
    this.apis.addCar(this.newCar).subscribe((response) => {
      console.log('Car added successfully', response);
      this.resetForm();
      this.ngOnInit(); // Refresh the list
    }, (error) => {
      console.error('Error adding car', error);
    });
  }

  loadCar(car: Car) {
    this.apis.getCarById(car.id).subscribe((carData: Car) => {
      this.selectedCar = {
        id: carData.id,
        brand: carData.brand,
        model: carData.model,
        year: carData.year
      };
      console.log('Car loaded', this.newCar);
    });
  }

  saveCar() {
    if (this.selectedCar.id !== 0) {
      this.apis.updateCar(this.selectedCar as Car).subscribe((response) => {
        console.log('Car updated successfully', response);
        this.resetForm();
        this.ngOnInit(); // Refresh the list
      }, (error) => {
        console.error('Error updating car', error);
      });
    } else {
      this.apis.addCar(this.selectedCar as AddCar).subscribe((response) => {
        console.log('Car added successfully', response);
        this.resetForm();
        this.ngOnInit(); // Refresh the list
      }, (error) => {
        console.error('Error adding car', error);
      });
    }
  }

  resetForm() {
    this.selectedCar = {
      id: 0,
      brand: '',
      model: '',
      year: ''
    };
  }


  deleteCar(id: number) {
    this.apis.deleteCar(id).subscribe((response) => {
      console.log('Car deleted successfully', response);
      this.ngOnInit(); // Refresh the list
    }, (error) => {
      console.error('Error deleting car', error);
    });
  }





}
