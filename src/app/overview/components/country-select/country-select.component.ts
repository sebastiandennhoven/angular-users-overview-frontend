import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'rnd-country-select',
  templateUrl: './country-select.component.html',
  styleUrls: ['./country-select.component.scss']
})
export class CountrySelectComponent {

  @Input() countries: string[] = [];
  @Input() countrySelected = '';
  @Output() countrySelectionChange = new EventEmitter<string>()


}
