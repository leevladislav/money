import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-history-edit',
  templateUrl: './history-edit.component.html',
  styleUrls: ['./history-edit.component.scss']
})
export class HistoryEditComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public modal: MatDialogRef<HistoryEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number
  ) {
  }

  ngOnInit(): void {
  }
}
