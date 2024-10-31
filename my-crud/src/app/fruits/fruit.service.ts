import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Fruit } from './fruit';
import { switchMap } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FruitService {

  constructor(private httpClient: HttpClient) { }
  
  getAll(){
    return this.httpClient.get<Fruit[]>('http://localhost:3000/fruits');
  } 

  create(data: Omit<Fruit, 'id'>) {
    // Get current fruits to generate the next ID
    return this.httpClient.get<Fruit[]>('http://localhost:3000/fruits').pipe(
      switchMap((fruits) => {
        const nextId = fruits.length > 0 ? Math.max(...fruits.map(f => f.id)) + 1 : 1; // Generate a new numeric ID
        const newFruit = { id: nextId, ...data }; // Create a new fruit object with the generated ID
        return this.httpClient.post('http://localhost:3000/fruits', newFruit); // Post the new fruit
      })
    );
  }


  edit(id: string) {
    return this.httpClient.get<Fruit>(`http://localhost:3000/fruits/${id}`);
  }

  update(data:Fruit){
    return this.httpClient.put<Fruit>(`http://localhost:3000/fruits/${data.id}`, data);
  } 

  delete(id: string): Observable<void> {
    return this.httpClient.delete<void>(`http://localhost:3000/fruits/${id}`);
}



}
