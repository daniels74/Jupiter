import { Component, Input } from '@angular/core';
import { SingleCoin } from '../../../../Core/Interfaces/singleCoin.interface';
import { AuthService } from '../../../../Core/Services/auth.service';
import { CryptoService } from '../../../../Core/Services/UserCollection/crypto.service';

@Component({
  selector: 'app-crypto-card',
  templateUrl: './crypto-card.component.html',
  styleUrls: ['./crypto-card.component.css'],
})
export class CryptoCardComponent {
  @Input() crypto!: SingleCoin;

  // ? Sizing
  isLargeScreen = window.innerWidth < 700 ? false : true;

  constructor(
    private authService: AuthService,
    private cryptoService: CryptoService,
  ) {}

  removeCrypto() {
    if (this.crypto.id) {
      this.cryptoService.deleteCryptoId(this.crypto.id).subscribe((res) => {
        console.log('Crypto Removed from Collection using crypto ID: ', res);
        this.authService.setPermissions(res.jwt);
      });
    } else {
      this.deleteCryptoEntryByIdNumber();
    }
  }

  deleteCryptoEntryByIdNumber() {
    const id: number = this.crypto.collectionId;
    this.cryptoService.deleteCryptoEntryById(id).subscribe((res) => {
      console.log('Crypto Removed from Collection using id number: ', res);
      this.authService.setPermissions(res.jwt);
    });
  }
}
