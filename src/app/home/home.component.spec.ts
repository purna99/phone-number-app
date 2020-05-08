import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const combinations =  ['123456p', '123456q', '123456r', '123456s', '12345m7',
'12345n7', '12345o7', '1234j67', '1234k67', '1234l67', '123g567', '123h567', '123i567', '12d4567',
'12e4567', '12f4567', '1a34567', '1b34567', '1c34567']

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [FormsModule, ReactiveFormsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('onFormSubmit() should not call createCombinations() and update submitted', () => {
    spyOn(component, 'createCombinations').and.returnValue();
    component.onFormSubmit();
    expect(component.submitted).toBeTruthy();
    expect(component.createCombinations).not.toHaveBeenCalled();
  });

  it('onFormSubmit() should call createCombinations() and update submitted', () => {
    spyOn(component, 'createCombinations').and.returnValue();
    component.mobileInputForm.controls.phoneNumber.setValue(1234567);
    component.onFormSubmit();
    expect(component.submitted).toBeTruthy();
    expect(component.createCombinations).toHaveBeenCalledWith('1234567');
  });

  it('createCombinations() should create combinations and call loadPageNumbers()', () => {
    spyOn(component, 'loadPageNumbers').and.returnValue();
    component.createCombinations('1234567');
    expect(component.loadPageNumbers).toHaveBeenCalled();
    expect(component.combinations).toEqual(combinations);
  });

  it('loadPageNumbers() should call selectPage() and update pageNumbers[]', () => {
    component.combinations = combinations;
    spyOn(component, 'selectPage').and.returnValue();
    component.loadPageNumbers();
    expect(component.selectPage).toHaveBeenCalledWith(1);
    expect(component.pageNumbers).toEqual([1, 2, 3, 4]);
  });

  it('selectPage() should create displayData and update selectedPage', () => {
    component.combinations = combinations;
    component.selectPage(1);
    expect(component.selectedPage).toEqual(1);
    expect(component.displayData).toEqual(['123456p', '123456q', '123456r', '123456s', '12345m7']);
  });

  it('nextPage() should call selectPage()', () => {
    spyOn(component, 'selectPage').and.returnValue();
    component.selectedPage = 1;
    component.nextPage();
    expect(component.selectPage).toHaveBeenCalledWith(2);
  });

  it('nextPage() should not call selectPage()', () => {
    spyOn(component, 'selectPage').and.returnValue();
    component.selectedPage = 3;
    component.pageNumbers = [1, 2, 3];
    component.nextPage();
    expect(component.selectPage).not.toHaveBeenCalled();
  });

  it('previousPage() should call selectPage()', () => {
    spyOn(component, 'selectPage').and.returnValue();
    component.selectedPage = 2;
    component.previousPage();
    expect(component.selectPage).toHaveBeenCalledWith(1);
  });

  it('previousPage() should not call selectPage()', () => {
    spyOn(component, 'selectPage').and.returnValue();
    component.selectedPage = 1;
    component.pageNumbers = [1, 2, 3];
    component.previousPage();
    expect(component.selectPage).not.toHaveBeenCalled();
  });
});
