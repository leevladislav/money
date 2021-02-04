import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-select-icon',
  templateUrl: './select-icon.component.html',
  styleUrls: ['./select-icon.component.scss']
})
export class SelectIconComponent implements OnInit {
  iconsNamesList: string[] = [
    'icon-bookmark',
    'icon-clock',
    'icon-cloud',
    'icon-connect',
    'icon-education',
    'icon-facebook',
    'icon-games',
    'icon-girl',
    'icon-home',
    'icon-instagram',
    'icon-light',
    'icon-lock',
    'icon-mail',
    'icon-pictures',
    'icon-repare',
    'icon-search',
    'icon-settings',
    'icon-synchronize',
    'icon-trash',
    'icon-weather',
    'icon-work',
  ];

  constructor(public modal: MatDialogRef<SelectIconComponent>) {
  }

  ngOnInit(): void {
  }

  selectIcon(iconName: string): void {
    this.modal.close(iconName);
  }
}
