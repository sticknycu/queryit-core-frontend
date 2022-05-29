import { Component, OnInit } from '@angular/core';
import {Deposit} from '../../model/deposit';
import {DepositService} from '../../services/deposit.service';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.scss']
})
export class DepositComponent implements OnInit {

  deposits: Deposit[];

  constructor(private depositService: DepositService) {
  }

  ngOnInit(): void {
    this.depositService.readAll().subscribe(data => {
      this.deposits = data;
    })


  }

  sort() {
    this.deposits = this.deposits.sort((obj1, obj2) => this.sortByName(obj1.name.toLowerCase(), obj2.name.toLowerCase()));
  }

  sortByName(name1: string, name2: string) {
    if (name1 >= name2) {
      return 1;
    } else {
      return -1;
    }
  }

}
