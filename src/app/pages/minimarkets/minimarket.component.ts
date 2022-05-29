import { Component, OnInit } from '@angular/core';
import {Category} from '../../model/category';
import {CategoryService} from '../../services/category.service';
import {MiniMarket} from '../../model/mini-market';
import {MinimarketService} from '../../services/minimarket.service';

@Component({
  selector: 'app-minimarket',
  templateUrl: './minimarket.component.html',
  styleUrls: ['./minimarket.component.scss']
})
export class MinimarketComponent implements OnInit {

  minimarkets: MiniMarket[];

  constructor(private minimarketService: MinimarketService) {
  }

  ngOnInit(): void {
    this.minimarketService.readAll().subscribe(data => {
      this.minimarkets = data;
    })


  }

  sort() {
    this.minimarkets = this.minimarkets.sort((obj1, obj2) => this.sortByName(obj1.name.toLowerCase(), obj2.name.toLowerCase()));
  }

  sortByName(name1: string, name2: string) {
    if (name1 >= name2) {
      return 1;
    } else {
      return -1;
    }
  }

}
