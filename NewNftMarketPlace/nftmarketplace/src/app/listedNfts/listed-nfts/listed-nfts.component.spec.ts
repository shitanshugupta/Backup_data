import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListedNftsComponent } from './listed-nfts.component';

describe('ListedNftsComponent', () => {
  let component: ListedNftsComponent;
  let fixture: ComponentFixture<ListedNftsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListedNftsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListedNftsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
