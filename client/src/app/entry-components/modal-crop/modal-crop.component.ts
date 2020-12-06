import {Component, Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {base64ToFile, ImageCroppedEvent} from 'ngx-image-cropper';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
    selector: 'app-modal-crop',
    templateUrl: './modal-crop.component.html',
    styleUrls: ['./modal-crop.component.scss']
})
export class ModalCropComponent implements OnInit {
    imageChangedEvent: any = '';
    croppedImage: any = '';
    showCropper = false;
    loadFailed = '';
    resizeToWidth = 1110;
    aspectRatio = 16 / 10;
    roundCropper = false;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private dialogRef: MatDialogRef<ModalCropComponent>
    ) {
    }

    ngOnInit(): void {
        this.imageChangedEvent = this.data.file;

        if (this.data.roundCropper) {
            this.roundCropper = true;
        }

        if (this.data.resizeToWidth) {
            this.resizeToWidth = this.data.resizeToWidth;
        }

        if (this.data.aspectRatio) {
            this.aspectRatio = this.data.aspectRatio;
        }
    }

    imageCropped(event: ImageCroppedEvent): void {
        this.croppedImage = event;
        this.croppedImage.file = new File([base64ToFile(event.base64)], 'ArimedAdmin.png');
    }

    imageLoaded(): void {
        this.showCropper = true;
    }

    loadImageFailed(): void {
        this.loadFailed = 'Please, try again.';
    }

    cropImage(): void {
        this.dialogRef.close(this.croppedImage);
    }
}
