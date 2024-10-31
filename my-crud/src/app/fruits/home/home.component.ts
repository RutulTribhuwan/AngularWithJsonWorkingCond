import { Component, OnInit } from '@angular/core';
import { Fruit } from '../fruit';
import { FruitService } from '../fruit.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  allfruits: Fruit[]=[];

  constructor(private fruitService: FruitService) {}
  
    ngOnInit(): void {
      this.fruitService.getAll().subscribe((data) => {
        this.allfruits = data;
      })


    }
    deleteItem(id: number): void { // Accept id as a number
      this.fruitService.delete(id.toString()).subscribe({ // Convert id to string for deletion
        next: () => {
          this.allfruits = this.allfruits.filter(fruit => fruit.id !== id);
          console.log('Fruit deleted successfully');
        },
        error: (error) => {
          console.error('Error deleting fruit:', error);
        }
      });
    }


}
