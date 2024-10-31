import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Fruit } from '../fruit';
import { FruitService } from '../fruit.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent implements OnInit{

  formdata: Fruit = {
    id: 0,
    name: '',
    quantity: 0,
    price:0
}

  constructor(
    private fruitService: FruitService,
    private router: Router,
    private route : ActivatedRoute
  ) { }
  
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id')); // Convert the param to a number
      if (!isNaN(id)) { // Check if the ID is a valid number
        this.getById(id); // Fetch fruit details using the valid ID
      } else {
        console.error('Invalid ID:', params.get('id')); // Log if ID is invalid
      }
    });
}

getById(id: number): void {
  this.fruitService.edit(id.toString()).subscribe( // Convert number to string
    (fruit: Fruit) => {
      this.formdata = fruit; // Populate formdata with fetched fruit details
    },
    (error) => {
      console.error('Error fetching fruit details:', error);
    }
  );
}

update(): void {
  this.fruitService.update(this.formdata).subscribe(
      () => {
          console.log('Fruit updated successfully');
          this.router.navigate(['/fruit/home']); // Navigate back to the list or wherever needed
      },
      (error) => {
          console.error('Error updating fruit:', error);
      }
  );
}
}
