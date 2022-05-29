import { Component, OnInit } from '@angular/core';
import {Category} from '../../model/category';
import {CategoryService} from '../../services/category.service';
import {Manufacturer} from '../../model/manufacturer';
import {ManufacturerService} from '../../services/manufacturer.service';

@Component({
  selector: 'app-manufacturer',
  templateUrl: './manufacturer.component.html',
  styleUrls: ['./manufacturer.component.scss']
})
export class ManufacturerComponent implements OnInit {

  manufacturers: Manufacturer[];

  constructor(private manufacturerService: ManufacturerService) {
  }

  ngOnInit(): void {
    this.manufacturerService.readAll().subscribe(data => {
      this.manufacturers = data;
    })


  }

  sort() {
    this.manufacturers = this.manufacturers.sort((obj1, obj2) => this.sortByName(obj1.name.toLowerCase(), obj2.name.toLowerCase()));
  }

  sortByName(name1: string, name2: string) {
    if (name1 >= name2) {
      return 1;
    } else {
      return -1;
    }
  }

}
