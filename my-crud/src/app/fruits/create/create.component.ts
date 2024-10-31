import { Component } from '@angular/core';
import { FruitService } from '../fruit.service';

import { Fruit } from '../fruit';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {

  constructor(private fruitService: FruitService,private router:Router) { }
  formdata: Omit<Fruit, 'id'> = {
    name: '',
    quantity:0,
    price:0
  }
  create() {
    this.fruitService.create(this.formdata).subscribe({
      next: (data) => {
        this.router.navigate(["fruit/home"])
      },
      error: (er) => {
        console.log(er)
      }
    })
  }

}
