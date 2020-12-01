import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductstudentComponent } from './productstudent.component';

describe('ProductstudentComponent', () => {
  let component: ProductstudentComponent;
  let fixture: ComponentFixture<ProductstudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductstudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductstudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
