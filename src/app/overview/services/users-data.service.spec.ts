import { HttpClient } from '@angular/common/http';
import { inject, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';

import { UsersDataService } from './users-data.service';

describe('UsersDataService', () => {
  let service: UsersDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientModule,
      HttpClientTestingModule] });
    service = TestBed.inject(UsersDataService);
  });
  it(`should create`, (inject([],
    (httpClient: HttpClient) => {
      expect(service).toBeTruthy();
  })));

});
