import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { SingleCoin } from '../../../../../Core/Interfaces/singleCoin.interface';
import { User } from '../../../../../Core/Interfaces/User.interface';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UserPostService } from '../../../../../Core/Services/UserPost/user-post.service';
import { AuthService } from '../../../../../Core/Services/auth.service';
import { UserService } from '../../../../../Core/Services/user.service';
import { catchError, map, of } from 'rxjs';
import { HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { selectUser } from '../../../../../Shared/State/Selectors/users.selector';
import { NoteCardComponent } from './components/note-card/note-card.component';
import { CommonModule } from '@angular/common';

export interface File {
  data: any;
  progress: number;
  inProgress: boolean;
}
@Component({
  selector: 'user-large-page',
  templateUrl: './large-page.component.html',
  styleUrls: ['./large-page.component.scss'],
})
export class LargePageComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private postService: UserPostService,
    private userService: UserService,
    private store: Store,
  ) {}
  // Chart things
  @Input() chosenCrypto: SingleCoin = <SingleCoin>{};
  @Input() chartState = false;
  @Output() toggleDescription: EventEmitter<any> = new EventEmitter<any>();
  @Input() descriptionToggler = true;
  @Output() closeChart: EventEmitter<any> = new EventEmitter<any>();

  // User things
  @Output() toggleSettings: EventEmitter<any> = new EventEmitter<any>();
  @Input() settingState!: boolean;
  @Input() user!: User;
  @Input() updateUserForm!: FormGroup;
  @Input() name!: FormControl;
  @Input() username!: FormControl;
  @Output() updateUser: EventEmitter<any> = new EventEmitter<any>();

  // Collection things
  @Input() collectionTypeToggle!: boolean;
  @Input() cryptoCollection!: any[];
  @Input() nftCollection!: any[];
  @Output() toggleChart: EventEmitter<any> = new EventEmitter<any>();
  @Output() toggleCollectionType: EventEmitter<any> = new EventEmitter<any>();
  @Output() useCopresserOnImage: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('fileUpload', { static: false }) fileUpload!: ElementRef;

  file: File = {
    data: null,
    inProgress: false,
    progress: 0,
  };

  form: FormGroup = this.formBuilder.group({
    profileImage: [null, [Validators.required]],
  });

  userProfileImg!: string;

  // User Posts
  userPosts!: any[];

  postForm: FormGroup = this.formBuilder.group({
    thePost: new FormControl(''),
  });

  ngOnInit(): void {
    this.postService.userPostsSubject.subscribe((allPosts) => {
      this.userPosts = allPosts;
    });

    this.userService.findUserImage().subscribe((res) => {
      this.userProfileImg = res.profileImage;
    });
    // this.store.select(selectUser).subscribe((user) => {
    //   this.userProfileImg = user.profileImage;
    // });
  }

  savePost() {
    const currentPost = this.postForm.get('thePost')?.value;
    console.log('Note: ', currentPost);
    this.postService.saveNewPost(currentPost).subscribe((jwtres) => {
      this.authService.setPermissions(jwtres.jwt);
    });
  }

  onClick() {
    const fileInput = this.fileUpload.nativeElement;
    fileInput.click();
    fileInput.onchange = () => {
      this.file = {
        data: fileInput.files[0],
        inProgress: false,
        progress: 0,
      };
      this.fileUpload.nativeElement.value = '';
      this.uploadFile();
    };
  }

  uploadFile() {
    const formData = new FormData();
    formData.append('file', this.file.data);
    this.file.inProgress = true;
    this.userService
      .uploadProfileImage(formData)
      .pipe(
        map((event: any) => {
          switch (event.type) {
            case HttpEventType.UploadProgress:
              this.file.progress = Math.round(
                (event.loaded * 100) / event.total,
              );
              break;
            case HttpEventType.Response:
              return event;
          }
        }),
        catchError((Error: HttpErrorResponse) => {
          this.file.inProgress = false;
          return of('Upload Failed');
        }),
      )
      .subscribe((event: any) => {
        if (typeof event === 'object') {
          this.form.patchValue({ profileImage: event.body.profileImage });
        }
      });
  }
}
