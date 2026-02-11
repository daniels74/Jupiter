import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../../../../../../app/Core/Services/user.service';
import {
  HttpClient,
  HttpErrorResponse,
  HttpEventType,
  HttpHeaders,
} from '@angular/common/http';
import { catchError, map, of } from 'rxjs';
import { NgxImageCompressService } from 'ngx-image-compress';
import { User } from '../../../../../../../Core/Interfaces/User.interface';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings-view',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressBarModule,
    MatCardModule,
    MatIconModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
  ],
  templateUrl: './settings-view.component.html',
  styleUrl: './settings-view.component.css',
})
export class SettingsViewComponent {
  @Output() updateUser: EventEmitter<any> = new EventEmitter<any>();
  @Input() name!: FormControl;
  @Input() username!: FormControl;
  @Input() updateUserForm!: FormGroup;
  @Input() user!: User;
  @Output() useCopresserOnImage: EventEmitter<any> = new EventEmitter<any>();
  @Output() toggleSettings: EventEmitter<any> = new EventEmitter<any>();
  @Output() imageUploaded: EventEmitter<string> = new EventEmitter<string>();
  // @Output() onFileInput: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('fileUpload', { static: false }) fileUpload!: ElementRef;

  file: { data: any; inProgress: boolean; progress: number } = {
    data: null,
    inProgress: false,
    progress: 0,
  };

  uploadProgress = 0; // Progress percentage
  uploadInProgress = false; // To show/hide progress bar
  imagePreviewUrl: string | null = null;

  constructor(
    private ngx: NgxImageCompressService,
    private userService: UserService,
    private http: HttpClient,
  ) {}

  base64ToBlob(base64: string, mimeType: string): Blob {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length).map((_, i) =>
      byteCharacters.charCodeAt(i),
    );
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: mimeType });
  }

  getImageSize(base64: string): string {
    const sizeInBytes =
      base64.length * (3 / 4) -
      (base64.endsWith('==') ? 2 : base64.endsWith('=') ? 1 : 0);
    const sizeInKB = sizeInBytes / 1024;
    return `${sizeInKB.toFixed(2)} KB`;
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const base64Image = e.target.result;

        // Compress the image
        this.ngx
          .compressFile(base64Image, -1, 50, 50)
          .then((compressedImage: string) => {
            this.imagePreviewUrl = compressedImage;
            console.log(
              'Compressed Image Size:',
              this.getImageSize(compressedImage),
            );

            // Convert the compressed image back to a Blob
            const blob = this.base64ToBlob(
              compressedImage.split(',')[1],
              file.type,
            );
            console.log('Compressed Image: ', compressedImage);
            // Upload the compressed image
            this.uploadImage(compressedImage);
          });
      };

      reader.readAsDataURL(file); // Read the file as a base64 string
    }
  }

  theimg = '';
  uploadImage(blob: any): void {
    const token = localStorage.getItem('jwt-token'); // Retrieve the token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    // this.ngx.uploadAndGetImageWithMaxSize(0.03).then((result: string) => {
    //   this.theimg = result;
    // });
    const formData = new FormData();
    formData.append('profileImage', blob);
    console.log('FORM DATA: ', { profileImage: blob });
    this.uploadInProgress = true;

    this.http
      .post(
        `http://localhost:3000/api/user/upload/${this.user.id}`,
        { profileImage: blob },
        {
          reportProgress: true,
          observe: 'events',
          headers: headers,
        },
      )
      .subscribe({
        next: (event) => {
          if (event.type === HttpEventType.UploadProgress && event.total) {
            // Update progress percentage
            this.uploadProgress = Math.round(
              (100 * event.loaded) / event.total,
            );
          } else if (event.type === HttpEventType.Response) {
            // Handle successful upload
            console.log('Upload complete:', event.body);
            this.uploadInProgress = false;
            if (this.imagePreviewUrl) {
              this.imageUploaded.emit(this.imagePreviewUrl);
              this.toggleSettings.emit();
            }
          }
        },
        error: (err) => {
          console.error('Upload failed:', err);
          this.uploadInProgress = false;
        },
      });
  }
}
