import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CharacterForNumbers } from '../models/characterForNumbers.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  public mobNumberPattern = '^[0-9]{10}|^[0-9]{7}$';
  public isValidFormSubmitted = false;
  public characterForNumbers: CharacterForNumbers = {
    2: ['a', 'b', 'c'],
    3: ['d', 'e', 'f'],
    4: ['g', 'h', 'i'],
    5: ['j', 'k', 'l'],
    6: ['m', 'n', 'o'],
    7: ['p', 'q', 'r', 's'],
    8: ['t', 'u', 'v'],
    9: ['w', 'x', 'y', 'z']
  };
  public combinations = [];
  public pageNumbers = [];
  // Can use formbuilder API too for complex forms
  mobileInputForm = new FormGroup({
    phoneNumber : new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10}|^[0-9]{7}$')])
  });
  public submitted = false;
  public selectedPage: number;
  public displayData: string[];

  constructor() {}

  public onFormSubmit() {
    this.submitted = true;
    if (this.mobileInputForm.invalid) {
      return;
    }
    this.createCombinations(this.mobileInputForm.get('phoneNumber').value.toString());
  }

  public createCombinations(phoneNumber) {
    this.combinations = [];
    for (let i = phoneNumber.length; i > 0; i--) {
      const selectedCharacter = phoneNumber.slice(i - 1, i);
      if (this.characterForNumbers[selectedCharacter]) {
        for (const character of this.characterForNumbers[selectedCharacter]) {
          const x = phoneNumber;
          const t = x.substring(0, i - 1) + character + x.substring(i);
          this.combinations.push(t);
        }
      }
    }
    this.loadPageNumbers();
  }

  public loadPageNumbers() {
    const totalPages = Math.ceil(this.combinations.length / 5);
    this.pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      this.pageNumbers.push(i);
    }
    this.selectPage(1);
  }

  public selectPage(selectedPageNumber: number) {
    this.selectedPage = selectedPageNumber;
    this.displayData = this.combinations.slice(((selectedPageNumber - 1) * 5),
                                                                        5 * selectedPageNumber);
  }

  public nextPage() {
    if (this.selectedPage === this.pageNumbers[this.pageNumbers.length - 1]) {
      return;
    }
    this.selectPage((1 + this.selectedPage));
  }

  public previousPage() {
    if (this.selectedPage === this.pageNumbers[0]) {
      return;
    }
    this.selectPage((this.selectedPage - 1));
  }

}
