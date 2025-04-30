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
import { MatTableDataSource } from '@angular/material/table';
import { FriendRequestsService } from '../../../../../Core/Services/friend-requests.service';

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
    private FriendRequestService: FriendRequestsService,
  ) {}
  friendsList: any = <any>[];
  sentFriendRequests: any = <any>[];
  myfriendsList: any = <any>[];

  // Chart things
  @Input() chosenCrypto: SingleCoin = <SingleCoin>{};
  @Input() chartState = false;
  @Output() toggleDescription: EventEmitter<any> = new EventEmitter<any>();
  @Input() descriptionToggler = true;
  @Output() closeChart: EventEmitter<any> = new EventEmitter<any>();

  // User things
  @Output() toggleSettings: EventEmitter<any> = new EventEmitter<any>();
  @Input() settingState!: boolean;
  @Output() toggleFriendRequestList: EventEmitter<any> =
    new EventEmitter<any>();
  @Input() friendRequestList!: boolean;
  @Input() userFriendRequestList!: any[];
  @Output() toggleFriendsList: EventEmitter<any> = new EventEmitter<any>();
  @Input() friendsListState!: boolean;
  @Input() user!: User;
  @Input() profilePic: any;
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
  // Image gets compressed and initalized in a variable.
  // It gets saved upon hitting submit which triggers updateUser function
  // which retrieves the variable holding the image, puts it in the form, and submits it.
  @Output() useCopresserOnImage: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('fileUpload', { static: false }) fileUpload!: ElementRef;

  sentOrRecieved_state = false; // false = recieved requests

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

  displayedColumns = ['Image', 'Name', 'Status', 'Options'];
  dataSource = new MatTableDataSource<any>(this.friendsList);
  sentFriendRequests_dataSource = new MatTableDataSource<any>(
    this.sentFriendRequests,
  );
  myfriends_dataSource = new MatTableDataSource<any>(this.myfriendsList);

  ngOnInit(): void {
    this.FriendRequestService.getFriendsList().subscribe((res) => {
      this.myfriends_dataSource.data = res;
    });

    this.postService.userPostsSubject.subscribe((allPosts) => {
      this.userPosts = allPosts;
    });

    this.userService.findUserImage().subscribe((res) => {
      console.log('profileImg:', res.profileImage);
      this.userProfileImg = res.profileImage;
    });
    // this.store.select(selectUser).subscribe((user) => {
    //   this.userProfileImg = user.profileImage;
    // });
    this.getFriendRequests();
    this.getSentFriendRequests();
  }

  getFriendRequests() {
    this.userService.getFriendRequests().subscribe((res) => {
      console.log('MY RECIEVED friend requests: ', res);
      this.friendsList = res;
      this.dataSource.data = res;
    });
  }

  getSentFriendRequests() {
    this.userService.getSentFriendRequests().subscribe((res) => {
      console.log('MY SENT friend requests: ', res);
      this.sentFriendRequests = res;
      this.sentFriendRequests_dataSource.data = res;
    });
  }

  savePost() {
    const currentPost = this.postForm.get('thePost')?.value;
    console.log('Note: ', currentPost);
    this.postService.saveNewPost(currentPost).subscribe((jwtres) => {
      this.authService.setPermissions(jwtres.jwt);
    });
  }

  // onFileInput() {
  //   const fileInput = this.fileUpload.nativeElement;
  //   fileInput.click();
  //   fileInput.onchange = () => {
  //     this.file = {
  //       data: fileInput.files[0],
  //       inProgress: false,
  //       progress: 0,
  //     };
  //     this.fileUpload.nativeElement.value = '';
  //     this.uploadFile();
  //   };
  // }

  // uploadFile() {
  //   const formData = new FormData();
  //   formData.append('file', this.file.data);
  //   this.file.inProgress = true;
  //   this.userService
  //     .uploadProfileImage(formData)
  //     .pipe(
  //       map((event: any) => {
  //         switch (event.type) {
  //           case HttpEventType.UploadProgress:
  //             this.file.progress = Math.round(
  //               (event.loaded * 100) / event.total,
  //             );
  //             break;
  //           case HttpEventType.Response:
  //             return event;
  //         }
  //       }),
  //       catchError((Error: HttpErrorResponse) => {
  //         this.file.inProgress = false;
  //         return of('Upload Failed');
  //       }),
  //     )
  //     .subscribe((event: any) => {
  //       if (typeof event === 'object') {
  //         this.form.patchValue({ profileImage: event.body.profileImage });
  //       }
  //       this.userService.findUserImage().subscribe((res) => {
  //         this.userProfileImg = res.profileImage;
  //       });
  //     });
  // }

  toggle_SentOrRecieved() {
    this.sentOrRecieved_state = !this.sentOrRecieved_state;
  }

  acceptFriendRequest(id: number) {
    return this.FriendRequestService.acceptFriendRequest(id).subscribe(
      (res) => {
        this.getFriendRequests();
        console.log(res);
      },
    );
  }

  denyFriendRequest(id: number) {
    return this.FriendRequestService.denyFriendRequest(id).subscribe((res) => {
      this.getFriendRequests();
      console.log(res);
    });
  }

  cancelFriendRequest(id: number) {
    return this.FriendRequestService.cancelFriendRequest(id).subscribe(
      (res) => {
        this.getSentFriendRequests();
        console.log(res);
      },
    );
  }
}
