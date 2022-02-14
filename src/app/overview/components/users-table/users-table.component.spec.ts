import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GeneralOperations } from '../../operations/general.operation';
import { UsersDataService } from '../../services/users-data.service';

import { UsersTableComponent } from './users-table.component';

describe('UsersTableComponent', () => {
  let component: UsersTableComponent;
  let fixture: ComponentFixture<UsersTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [ UsersTableComponent ],
      providers: [UsersDataService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('displayed columns are in place', () => {
    expect(component.displayedColumns.length > 0).toBeTruthy();
  })

  it('unique countries should have length', () => {
    expect(component.uniqueCountries.length >= 0).toBeTruthy();
  })

  it('get correct sorting from operation', () => {
    const sortableItems = [{timeAdded: 3, name: 'test item 3', gender: '', country: '', email: '', picture: ''}, {timeAdded: 2, name: 'test item 2', gender: '', country: '', email: '', picture: ''}, {timeAdded: 1, name: 'test item 1', gender: '', country: '', email: '', picture: ''}]
    const sortedItems = GeneralOperations.sortByKey(sortableItems);
    console.log('sorted items', sortedItems);
    expect(GeneralOperations.sortByKey(sortedItems)[0].name === 'test item 1').toBeTruthy();
  })
});
