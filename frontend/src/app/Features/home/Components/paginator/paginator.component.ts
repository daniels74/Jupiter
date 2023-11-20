import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BasicCrypto } from '../../../../Core/Interfaces/CoinGecko/BasicCrypto.interface';
import { CoinGeckoApiService } from '../../../../Core/Services/coin-gecko-api.service';
import { AuthService } from '../../../../Core/Services/auth.service';
import { Store } from '@ngrx/store';
import { selectAuth } from '../../../../Shared/State/Selectors/auth.selector';
import { CryptoService } from '../../../../Core/Services/UserCollection/crypto.service';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css'],
})
export class PaginatorComponent implements OnInit {
  allCrypto!: BasicCrypto[];
  sizeState = window.innerWidth < 700 ? false : true;
  // colorControl = 'warn' as ThemePalette;
  isAuth: any = false;

  // displayedColumns!: any;
  displayedColumns = this.isAuth
    ? ['selected', 'id', 'name', 'symbol']
    : ['id', 'name', 'symbol'];

  dataSource = new MatTableDataSource<BasicCrypto>(this.allCrypto);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private CoinGeckoService: CoinGeckoApiService,
    public spinner: NgxSpinnerService,
    private authService: AuthService,
    private Store: Store,
    private cryptoService: CryptoService,
  ) {}

  ngOnInit(): void {
    // Retrieve Authentication State
    this.Store.select(selectAuth).subscribe((authState) => {
      this.isAuth = authState;
      console.log('In pagination auth state ', authState);
      this.displayedColumns = authState
        ? ['selected', 'id', 'name', 'symbol']
        : ['id', 'name', 'symbol'];
    });
    // this.displayedColumns = this.isAuth
    //   ? ['selected', 'id', 'name', 'symbol']
    //   : ['id', 'name', 'symbol'];

    this.CoinGeckoService.allCrypto_O.subscribe((allcrypto) => {
      if (allcrypto.length !== 0) {
        this.allCrypto = allcrypto;
        this.dataSource.data = this.allCrypto;
      }
    });
    this.dataSource = new MatTableDataSource<BasicCrypto>(this.allCrypto);
  }

  ngAfterViewInit() {
    if (!this.allCrypto) {
      this.spinner.show('primary');
    } else if (this.allCrypto) {
      this.spinner.hide();
    }
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  selection = new SelectionModel<BasicCrypto>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  submitForm() {
    console.log('SELected crypto: ', this.selection.selected);
    this.selection.selected.forEach((sel) => {
      this.cryptoService.postCryptoId(sel.id).subscribe((jwtres) => {
        this.authService.setPermissions(jwtres.jwt);
      });
    });
  }
}
