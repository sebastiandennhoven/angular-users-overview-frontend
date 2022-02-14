import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { UserModel } from '../../models/user.model';
import { GeneralOperations } from '../../operations/general.operation';
import { UsersDataService } from '../../services/users-data.service';

@Component({
  selector: 'rnd-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss']
})
export class UsersTableComponent implements OnInit {

  @Output() turnOfAutoReload = new EventEmitter();

  displayedColumns: string[] = ['image', 'name', 'gender', 'email', 'location'];
  dataSource = new MatTableDataSource<UserModel>();
  uniqueCountries: string[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild(MatTable) table: MatTable<UserModel> | any;

  constructor(
    private userDataService: UsersDataService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.getUserData();
    this.getUniqueCountries();
  }

  /** Request all users but limited amount by backend */
  getUserData(): void {
    this.userDataService.getAllUsers().subscribe(userData => {
      this.dataSource.data = GeneralOperations.sortByKey(userData).reverse();
      this.dataSource.paginator = this.paginator;
    }, error => {
      this.toastrService.error('Unable to receive users. Backend turned on?');
    })
  }

  /** Get all unique countries */
  getUniqueCountries(): void {
    this.userDataService.getAllUniqueCountries().subscribe(countries => {
      this.uniqueCountries = countries.sort();
    }, error => {
      this.toastrService.error('Unable to receive unique countries.');
    })
  }

  /** Refresh user & country Data */
  refreshUsers(): void {
    this.getUserData();
    this.getUniqueCountries();
  }

  /** Tracker for table to match items in list with datapool */
  trackBy(index: number, item: UserModel) {
    return item.timeAdded;
  }

  /** Request users for country and display in users table */
  filterByCountry(country: string): void {
    this.turnOfAutoReload.emit();
    this.userDataService.getUsersForCountry(country).subscribe(countryUsers => {
      this.dataSource.data = GeneralOperations.sortByKey(countryUsers).reverse();
      this.dataSource.paginator = this.paginator;
      this.table.renderRows();
    }, error => {
      this.toastrService.error('Unable to filter by country.');
    })
  }

}
