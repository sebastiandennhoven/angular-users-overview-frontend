import { Component, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UsersTableComponent } from './components/users-table/users-table.component';

@Component({
  selector: 'rnd-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent {
  autoReload: any;
  autoReloadActive = false;

  @ViewChild(UsersTableComponent) userTableComponent: UsersTableComponent | any;

  /**
   * Get latest data from Backend
   * @param userTableComponent required if called from interval
   */
  reloadData(userTableComponent?: UsersTableComponent): void {
    if (userTableComponent) {
      userTableComponent.refreshUsers();
    } else {
      this.userTableComponent.refreshUsers();
    }
  }

  /**
   * Set or unset auto reload interval for users request
   */
  autoReloadData(): void {
    if (this.autoReload) {
      clearInterval(this.autoReload);
      this.autoReloadActive = false;
    } else {
      this.autoReloadActive = true;
      this.autoReload = setInterval(() => {
        this.reloadData(this.userTableComponent)
      }, environment.autoReloadSpeed);
    }
  }

  /** Function to set or unset autoreload */
  turnOfAutoReload(): void {
    if (this.autoReloadActive) {
      this.autoReloadData();
    }
  }

}
