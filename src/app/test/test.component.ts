import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Pet, PetService } from 'src/pet-client';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  constructor(
    private pet:PetService
  ) { }

  petId:number;
  $pet:Observable<Pet>;

  ngOnInit(): void {
  }

  

  getPet(id:number){
    this.$pet = this.pet.getPetById(id);
  }

}
