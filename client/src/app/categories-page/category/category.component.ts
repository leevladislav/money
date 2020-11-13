import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {of, Subscription} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CategoriesService} from '../../shared/services/categories.service';
import {filter, switchMap} from 'rxjs/operators';
import {Category} from '../../shared/interfaces';
import {OpenModalInfoService} from '../../shared/services/open-modal-info.service';
import {MatDialog} from '@angular/material/dialog';
import {ModalConfirmComponent} from '../../entry-components/modal-confirm/modal-confirm.component';
import {unsubscribe} from '../../utils/unsubscriber';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit, OnDestroy {
  @ViewChild('input', {static: false}) inputRef: ElementRef;
  form: FormGroup;
  image: File;
  imagePreview: any = '';
  isNew = true;
  category: Category;

  private subscriptions: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private categoriesService: CategoriesService,
    private router: Router,
    private openModalService: OpenModalInfoService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.form = this.fb.group({name: [null, [Validators.required]]});
    this.form.disable();

    const routeSub = this.route.params.pipe(
      switchMap(
        (params: Params) => {
          if (params.id) {
            this.isNew = false;
            return this.categoriesService.getById(params.id);
          }

          return of(null);
        }
      )
    ).subscribe(
      (category: Category) => {
        if (category) {
          this.category = category;
          this.form.patchValue({name: category.name});
          this.imagePreview = category.imageSrc;
        }

        this.form.enable();
      },
      error => this.openModalService.openModal(null, error.error.message)
    );

    this.subscriptions.push(routeSub);
  }

  triggerClick() {
    this.inputRef.nativeElement.click();
  }

  tryToDeleteCategory() {
    const dialogRef = this.dialog.open(ModalConfirmComponent, {
      data: {
        title: 'Attention!',
        type: `Are you sure you want to delete category ${this.category.name} ?`,
      },
      panelClass: ['primary-modal'],
      autoFocus: false
    });

    const dialogSub = dialogRef.afterClosed()
      .pipe(filter((result) => result))
      .subscribe(() => this.deleteCategory(this.category._id));

    this.subscriptions.push(dialogSub);
  }

  deleteCategory(categoryId) {
    const deleteCategorySub = this.categoriesService.delete(categoryId)
      .subscribe(
        response => {
          this.openModalService.openModal(response, null, response.message, 'categories');
          this.categoriesService.onUpdateCategories$.next(true);
        },
        error => this.openModalService.openModal(null, error.error.message)
      );

    this.subscriptions.push(deleteCategorySub);
  }

  onFileUpload(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    this.image = file;

    reader.onload = () => this.imagePreview = reader.result;
    reader.readAsDataURL(file);
  }

  onSubmit() {
    let submitCategorySub;

    if (this.form.invalid) {
      return this.form.markAllAsTouched();
    }

    this.form.disable();

    if (this.isNew) {
      submitCategorySub = this.categoriesService.create(
        this.form.value.name,
        this.image
      );
    } else {
      submitCategorySub = this.categoriesService.update(
        this.category._id,
        this.form.value.name,
        this.image
      );
    }

    submitCategorySub.subscribe(
      category => {
        this.category = category;
        this.openModalService.openModal(category, null, 'Category successfully edited', 'categories');
        this.form.enable();
        this.categoriesService.onUpdateCategories$.next(true);
      },
      error => {
        this.openModalService.openModal(null, error.error.message);
        this.form.enable();
      }
    );

    this.subscriptions.push(submitCategorySub);
  }

  ngOnDestroy() {
    unsubscribe(this.subscriptions);
  }
}
