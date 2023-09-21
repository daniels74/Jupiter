"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[169],{3169:(w,l,i)=>{i.r(l),i.d(l,{HomeModule:()=>k});var d=i(6814),c=i(5082),s=i(2169);const u=(0,s.ZF)("cryptos"),p=(0,s.ZF)("nfts");var t=i(6689),g=i(1154),h=i(3486),f=i(4633);let v=(()=>{var e;class r{constructor(o,a,m){this.authService=o,this.cryptoService=a,this.coinGeckoService=m}getMoreInfo(){this.coinGeckoService.getSingleCoin(this.coinId).subscribe(o=>{console.log("API for single coin working: ",o)})}saveToCollection(){this.cryptoService.postCryptoId(this.coinId).subscribe(o=>{this.authService.setPermissions(o.jwt)})}}return(e=r).\u0275fac=function(o){return new(o||e)(t.Y36(g.e),t.Y36(h.$),t.Y36(f.l))},e.\u0275cmp=t.Xpm({type:e,selectors:[["app-card"]],inputs:{dataImage:"dataImage",dataName:"dataName",dataMarketCapRank:"dataMarketCapRank",coinId:"coinId"},decls:12,vars:3,consts:[["gloww","",1,"card"],[1,"coin-img-container"],["alt","",3,"src"],[1,"coin-info-container"],[1,"coin-info"],[1,"options"],[1,"save-btn",3,"click"]],template:function(o,a){1&o&&(t.TgZ(0,"div",0)(1,"div",1),t._UZ(2,"img",2),t.qZA(),t.TgZ(3,"div",3)(4,"div",4)(5,"h3"),t._uU(6),t.qZA(),t.TgZ(7,"h3"),t._uU(8),t.qZA()()(),t.TgZ(9,"div",5)(10,"button",6),t.NdJ("click",function(){return a.saveToCollection()}),t._uU(11,"Save"),t.qZA()()()),2&o&&(t.xp6(2),t.s9C("src",a.dataImage,t.LSH),t.xp6(4),t.Oqu(a.dataName),t.xp6(2),t.Oqu(a.dataMarketCapRank))},styles:[".card[_ngcontent-%COMP%]{margin-left:3rem;margin-right:3rem;height:25vh;width:15vw;background-color:#07194b;color:#cad5d8;display:flex;flex-direction:column;align-items:center;justify-content:space-around;border-radius:1rem;border-style:solid;border-width:thin;border-color:#add8e6}.coin-img-container[_ngcontent-%COMP%]{height:45%;width:100%;display:flex;flex-direction:column;align-items:center;justify-content:space-around;border-top-right-radius:1rem;border-top-left-radius:1rem;border-bottom:0}.coin-info-container[_ngcontent-%COMP%]{height:45%;width:100%;background-color:#2b3a5b;display:flex;flex-direction:column;align-items:center;justify-content:space-around;border-bottom-left-radius:1rem;border-bottom-right-radius:1rem}.coin-info[_ngcontent-%COMP%]{height:75%;width:90%;display:flex;flex-direction:column;align-items:center;justify-content:space-around}.options[_ngcontent-%COMP%]{height:20%;width:100%;display:flex;flex-direction:row;align-items:center;justify-content:flex-end}.save-btn[_ngcontent-%COMP%]{height:80%;width:25%;margin-right:.5rem;background-color:#4f6558;color:#20d520;border-color:#1ca81c;border-style:solid;border-radius:.5rem;border-width:thin}"]}),r})();function C(e,r){if(1&e&&(t.TgZ(0,"div"),t._UZ(1,"app-card",4),t.qZA()),2&e){const n=r.$implicit;t.xp6(1),t.Q6J("dataImage",n.item.small)("dataName",n.item.name)("dataMarketCapRank",n.item.market_cap_rank)("coinId",n.item.id)}}function y(e,r){if(1&e&&(t.TgZ(0,"div"),t._UZ(1,"app-card",5),t.qZA()),2&e){const n=r.$implicit;t.xp6(1),t.Q6J("dataImage",n.thumb)("dataName",n.name)}}const b=[{path:"",component:(()=>{var e;class r{constructor(o){this.store=o,this.crypto$=this.store.select(u),this.nfts$=this.store.select(p)}}return(e=r).\u0275fac=function(o){return new(o||e)(t.Y36(s.yh))},e.\u0275cmp=t.Xpm({type:e,selectors:[["app-home"]],decls:9,vars:6,consts:[[1,"crypto-page"],["gloww","","routerLink","/",1,"home-btn"],[1,"listt-container"],[4,"ngFor","ngForOf"],[3,"dataImage","dataName","dataMarketCapRank","coinId"],[3,"dataImage","dataName"]],template:function(o,a){1&o&&(t.TgZ(0,"div",0)(1,"button",1),t._uU(2,"Home"),t.qZA(),t.TgZ(3,"div",2),t.YNc(4,C,2,4,"div",3),t.ALo(5,"async"),t.qZA(),t.TgZ(6,"div",2),t.YNc(7,y,2,2,"div",3),t.ALo(8,"async"),t.qZA()()),2&o&&(t.xp6(4),t.Q6J("ngForOf",t.lcZ(5,2,a.crypto$)),t.xp6(3),t.Q6J("ngForOf",t.lcZ(8,4,a.nfts$)))},dependencies:[v,d.sg,c.rH,d.Ov],styles:[".crypto-page[_ngcontent-%COMP%]{height:90vh;width:100%;background-color:#191939;display:flex;flex-direction:column;align-items:center;justify-content:space-around}.listt-container[_ngcontent-%COMP%]{height:40%;width:70%;color:#000;background-color:#030324;border-radius:1rem;border-style:solid;border-width:thin;border-color:#add8e6;display:flex;flex-direction:row;align-items:center;justify-content:flex-start;overflow-x:scroll;gap:8rem}.home-btn[_ngcontent-%COMP%]{height:2rem;width:4rem;border-radius:1rem;background-color:#00008b;color:#add8e6;border-style:solid;border-width:thin;border-color:light blue}"]}),r})()}];let M=(()=>{var e;class r{}return(e=r).\u0275fac=function(o){return new(o||e)},e.\u0275mod=t.oAB({type:e}),e.\u0275inj=t.cJS({imports:[c.Bz.forChild(b),c.Bz]}),r})(),Z=(()=>{var e;class r{}return(e=r).\u0275fac=function(o){return new(o||e)},e.\u0275mod=t.oAB({type:e}),e.\u0275inj=t.cJS({}),r})(),k=(()=>{var e;class r{}return(e=r).\u0275fac=function(o){return new(o||e)},e.\u0275mod=t.oAB({type:e}),e.\u0275inj=t.cJS({imports:[Z,d.ez,M,c.Bz]}),r})()}}]);