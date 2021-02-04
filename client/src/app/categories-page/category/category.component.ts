import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {of, Subscription} from 'rxjs';
import {filter, switchMap} from 'rxjs/operators';

import {CategoriesService} from '../../shared/services/categories.service';
import {OpenModalInfoService} from '../../shared/services/open-modal-info.service';
import {ModalConfirmComponent} from '../../entry-components/modal-confirm/modal-confirm.component';
import {unsubscribe} from '../../utils/unsubscriber';
import {Category, CategoryCreateParams, CategoryUpdateParams} from '../../shared/interfaces/categories.interfaces';
import {SelectIconComponent} from '../../shared-modules/select-icon/select-icon.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit, OnDestroy {
  form: FormGroup;
  isNew = true;
  category: Category;
  iconName = 'icon-pictures';

  private subscriptions: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private categoriesService: CategoriesService,
    private openModalService: OpenModalInfoService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.initForm();
    this.getCategories();
  }

  initForm(): void {
    this.form = this.fb.group({
      name: [null, [Validators.required]]
    });

    this.form.disable();
  }

  getCategories(): void {
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
          this.iconName = category.iconName;
          this.form.patchValue({name: category.name});
        }

        this.form.enable();
      },
      error => this.openModalService.openModal(null, error.error.message)
    );

    this.subscriptions.push(routeSub);
  }

  selectIcon(): void {
    const dialogRef = this.dialog.open(SelectIconComponent, {
      panelClass: ['primary-modal'],
      autoFocus: false
    });

    const dialogRefSub = dialogRef.afterClosed()
      .subscribe((iconName: string) => {
        if (!iconName) {
          return;
        }

        if (this.category && this.category.iconName === iconName) {
          return;
        }

        this.iconName = iconName;

        if (this.isNew) {
          return;
        }

        this.updateCategory(true);
      });

    this.subscriptions.push(dialogRefSub);
  }

  onDeleteCategory(): void {
    const dialogRef = this.dialog.open(ModalConfirmComponent, {
      data: {
        title: 'Attention!',
        type: `Are you sure you want to delete category ${this.category.name} ?`,
      },
      panelClass: ['primary-modal'],
      autoFocus: false
    });

    const dialogRefSub = dialogRef.afterClosed()
      .pipe(filter((result) => result))
      .subscribe(() => this.deleteCategory(this.category._id));

    this.subscriptions.push(dialogRefSub);
  }

  deleteCategory(categoryId): void {
    const deleteCategorySub = this.categoriesService.delete(categoryId).subscribe(
      response => {
        this.categoriesService.categoriesUpdated$.next(true);
        this.openModalService.openModal(response, null, response.message, 'categories');
      },
      error => this.openModalService.openModal(null, error.error.message)
    );

    this.subscriptions.push(deleteCategorySub);
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return this.form.markAllAsTouched();
    }

    this.form.disable();
    this.isNew ? this.createCategory() : this.updateCategory();
  }

  createCategory(): void {
    const data: CategoryCreateParams = {
      name: this.form.value.name,
      iconName: this.iconName
    };

    const createCategorySub = this.categoriesService.create(data)
      .subscribe(
        category => {
          this.category = category;
          this.form.enable();
          this.categoriesService.categoriesUpdated$.next(true);
          this.openModalService.openModal(
            category,
            null,
            'Category successfully created',
            'categories'
          );
        },
        error => {
          this.form.enable();
          this.openModalService.openModal(null, error.error.message);
        }
      );

    this.subscriptions.push(createCategorySub);
  }

  updateCategory(isIconUpdate = false): void {
    const data: CategoryUpdateParams = {
      id: this.category._id,
      name: this.form.value.name,
      iconName: this.iconName
    };

    const updateCategorySub = this.categoriesService.update(data)
      .subscribe(
        (category: Category) => {
          this.category = category;
          this.form.enable();
          this.categoriesService.categoriesUpdated$.next(true);

          if (!isIconUpdate) {
            this.openModalService.openModal(
              category,
              null,
              'Category successfully edited',
              'categories'
            );
          }
        },
        (error) => {
          this.form.enable();
          this.openModalService.openModal(null, error.error.message);
        }
      );

    this.subscriptions.push(updateCategorySub);
  }

  ngOnDestroy(): void {
    unsubscribe(this.subscriptions);
  }
}
