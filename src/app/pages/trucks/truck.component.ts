import { Component, OnInit } from '@angular/core';
import {Truck} from '../../model/truck';
import {TruckService} from '../../services/truck.service';

@Component({
  selector: 'app-truck',
  templateUrl: './truck.component.html',
  styleUrls: ['./truck.component.scss']
})
export class TruckComponent implements OnInit {
  trucks: Truck[];

  constructor(private truckService: TruckService) {
  }

  ngOnInit(): void {
    this.truckService.readAll().subscribe(data => {
      this.trucks = data;
    })


  }

  sort() {
    this.trucks = this.trucks.sort((obj1, obj2) => this.sortByName(obj1.serialNumber.toLowerCase(), obj2.serialNumber.toLowerCase()));
  }

  sortByName(name1: string, name2: string) {
    if (name1 >= name2) {
      return 1;
    } else {
      return -1;
    }
  }

}
