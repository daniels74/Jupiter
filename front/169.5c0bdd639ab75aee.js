"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[169],{3169:(q,d,s)=>{s.r(d),s.d(d,{HomeModule:()=>Y});var c=s(6814),l=s(2169);const f=(0,l.ZF)("cryptos"),u=(0,l.ZF)("nfts");var t=s(6689),p=s(9368);function y(e,r){if(1&e&&(t.TgZ(0,"div"),t._UZ(1,"app-card",7),t.qZA()),2&e){const i=r.$implicit;t.xp6(1),t.Q6J("isCrypto",!0)("dataImage",i.item.small)("dataName",i.item.name)("dataMarketCapRank",i.item.market_cap_rank)("coinId",i.item.id)}}function C(e,r){1&e&&(t.TgZ(0,"div"),t._uU(1," Api Down... "),t.qZA())}function v(e,r){if(1&e&&(t.TgZ(0,"div"),t._UZ(1,"app-card",8),t.qZA()),2&e){const i=r.$implicit;t.xp6(1),t.Q6J("isCrypto",!1)("dataImage",i.thumb)("dataName",i.name)("coinId",i.id)}}function b(e,r){if(1&e&&(t.TgZ(0,"div"),t._UZ(1,"app-card",7),t.qZA()),2&e){const i=r.$implicit;t.xp6(1),t.Q6J("isCrypto",!0)("dataImage",i.item.small)("dataName",i.item.name)("dataMarketCapRank",i.item.market_cap_rank)("coinId",i.item.id)}}function w(e,r){if(1&e&&(t.TgZ(0,"div"),t._UZ(1,"app-card",9),t.qZA()),2&e){const i=r.$implicit;t.xp6(1),t.Q6J("isCrypto",!1)("dataImage",i.thumb)("dataName",i.name)}}function x(e,r){if(1&e){const i=t.EpF();t.TgZ(0,"button",10),t.NdJ("click",function(){t.CHM(i);const o=t.oxw();return t.KtG(o.toggleContainerContent())}),t._uU(1,"NFTs"),t.qZA()}}function _(e,r){if(1&e){const i=t.EpF();t.TgZ(0,"button",10),t.NdJ("click",function(){t.CHM(i);const o=t.oxw();return t.KtG(o.toggleContainerContent())}),t._uU(1,"Crypto"),t.qZA()}}const S=function(e){return{height:"100%",width:"100%",display:e,flexDirection:"column",alignItems:"center",justifyContent:"space-around"}},Z=function(e,r,i,n,o){return{display:e,height:r,width:i,flexDirection:n,overflowY:o,overflowX:"scroll"}},T=function(e,r,i,n){return{display:"flex",height:e,width:r,flexDirection:i,overflowY:n,overflowX:"scroll"}},E=function(e){return{height:"100%",width:"100%",display:e,flexDirection:"column",alignItems:"center",justifyContent:"center"}},I=function(){return{color:"lightblue",height:"10%",width:"100%",display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"center"}},m=function(e,r,i,n,o){return{display:e,height:r,width:i,flexDirection:n,overflowY:o,overflowX:"hidden"}};let h=(()=>{var e;class r{constructor(n,o){this.store=n,this.nftService=o,this.crypto$=this.store.select(f),this.nfts$=this.store.select(u),this.isBigScreen=window.innerWidth>700?"flex":"none",this.isSmallScreen=window.innerWidth<700?"flex":"none",this.content_toggler=!1,this.selectedContent="Crypto",this.displayCryptoExp="flex",this.displayNftExp="none",this.heightCryptoExp=window.innerWidth<700?"80%":"40%",this.widthCryptoExp=window.innerWidth<700?"100%":"70%",this.cryptoFlexDirectionExp=window.innerWidth<700?"column":"row",this.cryptoScrollYExp=window.innerWidth<700?"scroll":"hidden",this.cryptoScrollXExp=window.innerWidth<700?"hidden":"scroll"}ngOnInit(){this.crypto$.subscribe(n=>{console.log("Trending Crypto <Home>: ",n)}),this.nfts$.subscribe(n=>{console.log("Trending NFTS <Home>: ",n)}),this.nftService.nftCollection.subscribe(n=>{console.log("my nfts: ",n)})}
//! crypto and NFTs in small screens
toggleContainerContent(){"flex"===this.displayCryptoExp?this.displayCryptoExp="none":(this.displayCryptoExp="flex",this.selectedContent="Crypto"),"none"===this.displayNftExp?(this.displayNftExp="flex",this.selectedContent="NFTs"):this.displayNftExp="none",this.content_toggler=!this.content_toggler}}return(e=r).\u0275fac=function(n){return new(n||e)(t.Y36(l.yh),t.Y36(p.o))},e.\u0275cmp=t.Xpm({type:e,selectors:[["app-home"]],decls:21,vars:51,consts:[[1,"crypto-page"],[3,"ngStyle"],[1,"listt-container",3,"ngStyle"],[4,"ngFor","ngForOf"],[4,"ngIf"],[1,"toggleButton"],["class","btn",3,"click",4,"ngIf"],[3,"isCrypto","dataImage","dataName","dataMarketCapRank","coinId"],[3,"isCrypto","dataImage","dataName","coinId"],[3,"isCrypto","dataImage","dataName"],[1,"btn",3,"click"]],template:function(n,o){1&n&&(t.TgZ(0,"div",0)(1,"div",1)(2,"div",2),t.YNc(3,y,2,5,"div",3),t.ALo(4,"async"),t.YNc(5,C,2,0,"div",4),t.qZA(),t.TgZ(6,"div",2),t.YNc(7,v,2,4,"div",3),t.ALo(8,"async"),t.qZA()(),t.TgZ(9,"div",1)(10,"h2",1),t._uU(11),t.qZA(),t.TgZ(12,"div",2),t.YNc(13,b,2,5,"div",3),t.ALo(14,"async"),t.qZA(),t.TgZ(15,"div",2),t.YNc(16,w,2,3,"div",3),t.ALo(17,"async"),t.qZA(),t.TgZ(18,"div",5),t.YNc(19,x,2,0,"button",6),t.YNc(20,_,2,0,"button",6),t.qZA()()()),2&n&&(t.xp6(1),t.Q6J("ngStyle",t.VKq(23,S,o.isBigScreen)),t.xp6(1),t.Q6J("ngStyle",t.qbA(25,Z,o.displayCryptoExp,o.heightCryptoExp,o.widthCryptoExp,o.cryptoFlexDirectionExp,o.cryptoScrollYExp)),t.xp6(1),t.Q6J("ngForOf",t.lcZ(4,15,o.crypto$)),t.xp6(2),t.Q6J("ngIf",o.crypto$),t.xp6(1),t.Q6J("ngStyle",t.l5B(31,T,o.heightCryptoExp,o.widthCryptoExp,o.cryptoFlexDirectionExp,o.cryptoScrollYExp)),t.xp6(1),t.Q6J("ngForOf",t.lcZ(8,17,o.nfts$)),t.xp6(2),t.Q6J("ngStyle",t.VKq(36,E,o.isSmallScreen)),t.xp6(1),t.Q6J("ngStyle",t.DdM(38,I)),t.xp6(1),t.Oqu(o.selectedContent),t.xp6(1),t.Q6J("ngStyle",t.qbA(39,m,o.displayCryptoExp,o.heightCryptoExp,o.widthCryptoExp,o.cryptoFlexDirectionExp,o.cryptoScrollYExp)),t.xp6(1),t.Q6J("ngForOf",t.lcZ(14,19,o.crypto$)),t.xp6(2),t.Q6J("ngStyle",t.qbA(45,m,o.displayNftExp,o.heightCryptoExp,o.widthCryptoExp,o.cryptoFlexDirectionExp,o.cryptoScrollYExp)),t.xp6(1),t.Q6J("ngForOf",t.lcZ(17,21,o.nfts$)),t.xp6(3),t.Q6J("ngIf",!o.content_toggler),t.xp6(1),t.Q6J("ngIf",o.content_toggler))},styles:[".crypto-page[_ngcontent-%COMP%]{height:90vh;width:100%;background-color:#191939}.listt-container[_ngcontent-%COMP%]{color:#000;background-color:#030324;border-radius:1rem;border-style:solid;border-width:thin;border-color:#add8e6;display:flex;flex-direction:row;align-items:center;justify-content:flex-start;overflow-x:scroll;gap:8rem}.toggleButton[_ngcontent-%COMP%]{height:10%;width:100%;display:flex;flex-direction:column;align-items:center;justify-content:center}.btn[_ngcontent-%COMP%]{height:2rem;width:6rem;border-radius:.5rem;background-color:#47869b;color:#00008b;border-style:solid;border-width:thin;border-color:#00f}"]}),r})();var a=s(5082);const M=[{path:"",component:h}];let N=(()=>{var e;class r{}return(e=r).\u0275fac=function(n){return new(n||e)},e.\u0275mod=t.oAB({type:e}),e.\u0275inj=t.cJS({imports:[a.Bz.forChild(M),a.Bz]}),r})(),k=(()=>{var e;class r{}return(e=r).\u0275fac=function(n){return new(n||e)},e.\u0275mod=t.oAB({type:e}),e.\u0275inj=t.cJS({imports:[c.ez]}),r})();var A=s(1131),H=s(1154),J=s(8584),F=s(4633);let O=(()=>{var e;class r{constructor(n,o,g,Q,j){this.authService=n,this.cryptoService=o,this.nftService=g,this.coinGeckoService=Q,this.store=j,this.authState=!1,this.cardHeightExp=window.innerWidth<700?"40rem":"25rem",this.cardWidthExp=window.innerWidth<700?"25rem":"15rem",this.cardClass=window.innerWidth<700?{height:"30rem",width:"19rem",marginLeft:"3rem",marginTop:"2rem",marginBottom:"2rem"}:{height:"25vh",width:"15vw",marginLeft:"2rem"},this.btnClass=window.innerWidth<700?{height:"50%",width:"45%"}:{height:"80%",width:"25%"}}ngOnInit(){this.store.select(A.H).subscribe(n=>{this.authState=n})}getMoreInfo(){this.coinGeckoService.getSingleCoin(this.coinId).subscribe(n=>{console.log("API for single coin working: ",n)})}saveToCollection(n){!0===this.isCrypto?(console.log("crypto id saving to db: ",n),this.cryptoService.postCryptoId(n).subscribe(o=>{this.authService.setPermissions(o.jwt)})):!1===this.isCrypto&&(console.log("id",n),this.nftService.postNftId(n).subscribe(o=>{this.authService.setPermissions(o.jwt)}))}}return(e=r).\u0275fac=function(n){return new(n||e)(t.Y36(H.e),t.Y36(J.$),t.Y36(p.o),t.Y36(F.l),t.Y36(l.yh))},e.\u0275cmp=t.Xpm({type:e,selectors:[["app-card"]],inputs:{dataImage:"dataImage",dataName:"dataName",dataMarketCapRank:"dataMarketCapRank",coinId:"coinId",isCrypto:"isCrypto"},decls:12,vars:5,consts:[["gloww","",1,"card",3,"ngStyle"],[1,"coin-img-container"],["alt","",3,"src"],[1,"coin-info-container"],[1,"coin-info"],[1,"options"],[1,"save-btn",3,"ngStyle","click"]],template:function(n,o){1&n&&(t.TgZ(0,"div",0)(1,"div",1),t._UZ(2,"img",2),t.qZA(),t.TgZ(3,"div",3)(4,"div",4)(5,"h3"),t._uU(6),t.qZA(),t.TgZ(7,"h3"),t._uU(8),t.qZA()()(),t.TgZ(9,"div",5)(10,"button",6),t.NdJ("click",function(){return o.saveToCollection(o.coinId)}),t._uU(11,"Save to Collection"),t.qZA()()()),2&n&&(t.Q6J("ngStyle",o.cardClass),t.xp6(2),t.s9C("src",o.dataImage,t.LSH),t.xp6(4),t.Oqu(o.dataName),t.xp6(2),t.Oqu(o.dataMarketCapRank),t.xp6(2),t.Q6J("ngStyle",o.btnClass))},dependencies:[c.PC],styles:[".card[_ngcontent-%COMP%]{margin-right:3rem;background-color:#07194b;color:#cad5d8;display:flex;flex-direction:column;align-items:center;justify-content:space-around;border-radius:1rem;border-style:solid;border-width:thin;border-color:#add8e6}.coin-img-container[_ngcontent-%COMP%]{height:45%;width:100%;display:flex;flex-direction:column;align-items:center;justify-content:space-around;border-top-right-radius:1rem;border-top-left-radius:1rem;border-bottom:0}.coin-info-container[_ngcontent-%COMP%]{height:45%;width:100%;background-color:#2b3a5b;display:flex;flex-direction:column;align-items:center;justify-content:space-around;border-bottom-left-radius:1rem;border-bottom-right-radius:1rem}.coin-info[_ngcontent-%COMP%]{height:75%;width:90%;display:flex;flex-direction:column;align-items:center;justify-content:space-around}.options[_ngcontent-%COMP%]{height:20%;width:100%;display:flex;flex-direction:row;align-items:center;justify-content:flex-end}.save-btn[_ngcontent-%COMP%]{height:80%;width:25%;margin-right:.5rem;background-color:#4f6558;color:#20d520;border-color:#1ca81c;border-style:solid;border-radius:.5rem;border-width:thin}"]}),r})(),Y=(()=>{var e;class r{}return(e=r).\u0275fac=function(n){return new(n||e)},e.\u0275mod=t.oAB({type:e}),e.\u0275inj=t.cJS({imports:[k,c.ez,N,a.Bz]}),r})();t.B6R(h,[O,c.sg,c.O5,c.PC],[c.Ov])}}]);