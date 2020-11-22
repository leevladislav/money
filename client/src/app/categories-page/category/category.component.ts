import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {of, Subscription} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CategoriesService} from '../../shared/services/categories.service';
import {filter, switchMap} from 'rxjs/operators';
import {OpenModalInfoService} from '../../shared/services/open-modal-info.service';
import {MatDialog} from '@angular/material/dialog';
import {ModalConfirmComponent} from '../../entry-components/modal-confirm/modal-confirm.component';
import {unsubscribe} from '../../utils/unsubscriber';
import {Category, CategoryCreateParams, CategoryUpdateParams} from '../../shared/interfaces/categories.interfaces';

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
    private openModalService: OpenModalInfoService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit() {
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
          this.imagePreview = category.imageSrc;

          this.form.patchValue({name: category.name});
        }

        this.form.enable();
      },
      error => this.openModalService.openModal(null, error.error.message)
    );

    this.subscriptions.push(routeSub);
  }

  triggerClick(): void {
    this.inputRef.nativeElement.click();
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

  deleteCategory(categoryId) {
    const deleteCategorySub = this.categoriesService.delete(categoryId)
      .subscribe(
        response => {
          this.categoriesService.categoriesUpdated$.next(true);
          this.openModalService.openModal(response, null, response.message, 'categories');
        },
        error => this.openModalService.openModal(null, error.error.message)
      );

    this.subscriptions.push(deleteCategorySub);
  }

  onFileUpload(event: any): void {
    const file = event.target.files[0];
    const reader = new FileReader();
    this.image = file;

    reader.onload = () => this.imagePreview = reader.result;
    reader.readAsDataURL(file);
  }

  onSubmit() {
    if (this.form.invalid) {
      return this.form.markAllAsTouched();
    }

    this.form.disable();

    this.isNew ? this.createCategory() : this.updateCategory();
  }

  createCategory(): void {
    const data: CategoryCreateParams = {
      name: this.form.value.name,
      image: this.image
    };

    const createCategorySub = this.categoriesService.create(data).subscribe(
      category => {
        this.category = category;
        this.form.enable();
        this.categoriesService.categoriesUpdated$.next(true);
        this.openModalService.openModal(category, null, 'Category successfully created', 'categories');
      },
      error => {
        this.form.enable();
        this.openModalService.openModal(null, error.error.message);
      }
    );

    this.subscriptions.push(createCategorySub);
  }

  updateCategory(): void {
    const data: CategoryUpdateParams = {
      id: this.category._id,
      name: this.form.value.name,
      image: this.image
    };

    const updateCategorySub = this.categoriesService.update(data).subscribe(
      category => {
        this.category = category;
        this.form.enable();
        this.categoriesService.categoriesUpdated$.next(true);
        this.openModalService.openModal(category, null, 'Category successfully edited', 'categories');
      },
      error => {
        this.form.enable();
        this.openModalService.openModal(null, error.error.message);
      }
    );

    this.subscriptions.push(updateCategorySub);
  }

  ngOnDestroy() {
    unsubscribe(this.subscriptions);
  }
}
