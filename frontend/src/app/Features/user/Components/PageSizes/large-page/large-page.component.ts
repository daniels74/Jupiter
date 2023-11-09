import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SingleCoin } from '../../../../../Core/Interfaces/singleCoin.interface';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { User } from '../../../../../Core/Interfaces/User.interface';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { UserPostService } from '../../../../../Core/Services/UserPost/user-post.service';
import { AuthService } from '../../../../../Core/Services/auth.service';

@Component({
  selector: 'user-large-page',
  templateUrl: './large-page.component.html',
  styleUrls: ['./large-page.component.css'],
})
export class LargePageComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private postService: UserPostService,
  ) {}
  // Chart things
  @Input() chosenCrypto!: SingleCoin;
  @Input() chartToggler = false;
  @Input() lineChartData!: ChartConfiguration<'line'>['data'];
  @Input() lineChartOptions!: ChartOptions<'line'>;
  @Input() lineChartLegend = true;
  @Input() counter!: number;
  @Input() chartActive = false;
  @Output() toggleDescription: EventEmitter<any> = new EventEmitter<any>();
  @Input() descriptionToggler = true;
  @Output() closeChart: EventEmitter<any> = new EventEmitter<any>();
  @Input() isBigScreen = false;

  // User things
  @Output() toggleSettings: EventEmitter<any> = new EventEmitter<any>();
  @Input() settingState!: boolean;
  @Input() user!: User;
  @Input() updateUserForm!: FormGroup;
  @Output() updateUser: EventEmitter<any> = new EventEmitter<any>();

  // Collection things
  @Input() collectionTypeToggle!: boolean;
  @Input() cryptoCollection!: any[];
  @Input() nftCollection!: any[];
  @Output() toggleChart: EventEmitter<any> = new EventEmitter<any>();
  @Output() toggleCollectionType: EventEmitter<any> = new EventEmitter<any>();

  // User Posts
  userPosts!: any[];

  postForm: FormGroup = this.formBuilder.group({
    thePost: new FormControl(''),
  });

  ngOnInit(): void {
    this.postService.userPostsSubject.subscribe((allPosts) => {
      this.userPosts = allPosts;
    });
  }

  savePost() {
    console.log('USER NOTE: ', this.postForm.get('thePost')?.value);
    this.postService
      .saveNewPost(this.postForm.get('thePost')?.value)
      .subscribe((jwtres) => {
        this.authService.setPermissions(jwtres.jwt);
      });
  }
}
