"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[562],{3562:(b,c,r)=>{r.r(c),r.d(c,{LandingModule:()=>x});var s=r(6814),l=r(2430),d=r(649),g=r(6570),t=r(9212),u=r(2169),m=r(3982);let p=(()=>{class e{constructor(){this.cryptoname=this.name}static#t=this.\u0275fac=function(i){return new(i||e)};static#e=this.\u0275cmp=t.Xpm({type:e,selectors:[["app-carousel-element"]],inputs:{Item:"Item",name:"name"},decls:11,vars:4,consts:[["appGlowify","",1,"carousel-element"],[1,"img-container"],["alt","",1,"img-ele",3,"src"],[1,"crypto-info"]],template:function(i,o){1&i&&(t.TgZ(0,"div",0)(1,"div",1),t._UZ(2,"img",2),t.TgZ(3,"div",3)(4,"div"),t._uU(5),t.qZA(),t.TgZ(6,"div")(7,"div"),t._uU(8),t.qZA(),t.TgZ(9,"div"),t._uU(10),t.qZA()()()()()),2&i&&(t.xp6(2),t.Q6J("src",o.Item.item.large,t.LSH),t.xp6(3),t.hij(" ",o.Item.item.symbol," "),t.xp6(3),t.hij("Score | ",o.Item.item.score,""),t.xp6(2),t.hij("Market Cap Rank | ",o.Item.item.market_cap_rank,""))},dependencies:[m.w],styles:[".carousel-element[_ngcontent-%COMP%]{height:12rem;width:12rem;border-radius:50%;border-style:solid;border-width:thin;background-color:azure;display:flex;flex-direction:column;align-items:center;justify-content:center}.img-container[_ngcontent-%COMP%]{border-radius:50%;height:100%;width:100%;position:relative;z-index:9999;display:flex;flex-direction:column;align-items:center;justify-content:center}.img-ele[_ngcontent-%COMP%]{border-radius:50%;position:absolute;height:100%;width:100%;display:flex;flex-direction:column;align-items:center;justify-content:center}.crypto-info[_ngcontent-%COMP%]{background-color:#101a1a79;position:absolute;height:50%;width:100%;display:flex;flex-direction:column;align-items:center;justify-content:center}"]})}return e})();const h=()=>({height:"100%",width:"15vw",backgroundColor:"transparent",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"});function f(e,a){if(1&e&&(t.TgZ(0,"div",6),t._UZ(1,"app-carousel-element",7),t.qZA()),2&e){const n=a.$implicit;t.Q6J("ngStyle",t.DdM(3,h)),t.xp6(1),t.Q6J("Item",n)("name",n.name)}}function y(e,a){if(1&e&&(t.TgZ(0,"div",6),t._UZ(1,"app-carousel-element",7),t.qZA()),2&e){const n=a.$implicit;t.Q6J("ngStyle",t.DdM(3,h)),t.xp6(1),t.Q6J("Item",n)("name",n.name)}}const w=[{path:"",component:(()=>{class e{onResize(n){n.target.innerWidth<=699?(this.title_container_width="60%",this.title_container_height="30%",this.crpyoinfo_container_width="90%",this.crpyoinfo_container_height="30%"):n.target.innerWidth>700&&(this.title_container_width="50%",this.title_container_height="30%",this.crpyoinfo_container_width="90%",this.crpyoinfo_container_height="30%")}constructor(n){this.store=n,this.trending_cryptos=[],this.title_container_width=window.innerWidth<=700?"60%":"50%",this.title_container_height="30%",this.crpyoinfo_container_width=window.innerWidth<=700?"90%":"40%",this.crpyoinfo_container_height=(window,"30%"),this.cellsToShow=window.innerWidth<=700?1:4,this.images=[]}ngOnInit(){this.store.select(g.d).subscribe(n=>{this.trending_cryptos=n,this.trending_cryptos.forEach(i=>{this.images.push({path:i.item.large})}),this.images.reverse()})}static#t=this.\u0275fac=function(i){return new(i||e)(t.Y36(u.yh))};static#e=this.\u0275cmp=t.Xpm({type:e,selectors:[["app-landing"]],hostBindings:function(i,o){1&i&&t.NdJ("resize",function(Z){return o.onResize(Z)},!1,t.Jf7)},decls:13,vars:23,consts:[[1,"landing-page"],[1,"title-container"],[1,"carousel-container"],["transitionTimingFunction","ease-in-out",3,"loop","borderRadius","cellWidth","overflowCellsLimit","autoplay","height","width","margin","cellsToShow","autoplayInterval","transitionDuration","arrowsOutside","arrows"],["class","carousel-cell",3,"ngStyle",4,"ngFor","ngForOf"],[1,"crpyoinfo-container"],[1,"carousel-cell",3,"ngStyle"],[3,"Item","name"]],template:function(i,o){1&i&&(t.TgZ(0,"div",0)(1,"div",1)(2,"h1"),t._uU(3,"CryptoZapp"),t.qZA(),t.TgZ(4,"h3"),t._uU(5,"See the market, make your list, and share it."),t.qZA()(),t.TgZ(6,"div",2)(7,"carousel",3),t.YNc(8,f,2,4,"div",4)(9,y,2,4,"div",4),t.qZA()(),t.TgZ(10,"div",5)(11,"p"),t._uU(12," Crypto allows for self custody of trasferable energy, aka, work that was done. When you work, you exchange time and enerygy for money in a proportional manner. However, overtime that money dissipates due to our fiat money's fundumantal solution to everything, inflation. "),t.qZA()()()),2&i&&(t.xp6(1),t.Udp("width",o.title_container_width)("height",o.title_container_height),t.xp6(6),t.Q6J("loop",!0)("borderRadius",200)("cellWidth",1200)("overflowCellsLimit",7)("autoplay",!0)("height",300)("width",1200)("margin",50)("cellsToShow",o.cellsToShow)("autoplayInterval",4e3)("transitionDuration",2e3)("arrowsOutside",!0)("arrows",!0),t.xp6(1),t.Q6J("ngForOf",o.trending_cryptos),t.xp6(1),t.Q6J("ngForOf",o.trending_cryptos),t.xp6(1),t.Udp("width",o.crpyoinfo_container_width)("height",o.crpyoinfo_container_height))},dependencies:[p,l.F,s.sg,s.PC],styles:[".landing-page[_ngcontent-%COMP%]{background-color:#202043;color:#fff;height:90vh;width:100%;display:flex;flex-direction:column;align-items:center;justify-content:space-around;overflow:hidden;background-image:url(https://s7d2.scene7.com/is/image/TWCNews/nyc_lightning_strike1280x720esbgettyimages-629353120png);background-size:cover}.title-container[_ngcontent-%COMP%]{background-color:#0a0c30bf;display:flex;flex-direction:column;align-items:center;justify-content:space-around;border-radius:1rem}.carousel-container[_ngcontent-%COMP%]{z-index:1;height:30%;width:100vw;background-color:#008cff33;display:flex;flex-direction:column;align-items:center;justify-content:center}.crpyoinfo-container[_ngcontent-%COMP%]{background-color:#0a0c30cc;display:flex;flex-direction:column;align-items:center;justify-content:center;border-radius:1rem}"]})}return e})()}];let v=(()=>{class e{static#t=this.\u0275fac=function(i){return new(i||e)};static#e=this.\u0275mod=t.oAB({type:e});static#n=this.\u0275inj=t.cJS({imports:[d.Bz.forChild(w),d.Bz]})}return e})();var _=r(3350);let C=(()=>{class e{static#t=this.\u0275fac=function(i){return new(i||e)};static#e=this.\u0275mod=t.oAB({type:e});static#n=this.\u0275inj=t.cJS({imports:[s.ez,_.p]})}return e})(),x=(()=>{class e{static#t=this.\u0275fac=function(i){return new(i||e)};static#e=this.\u0275mod=t.oAB({type:e});static#n=this.\u0275inj=t.cJS({imports:[C,l.Q,s.ez,v]})}return e})()}}]);