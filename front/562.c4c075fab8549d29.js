"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[562],{3562:(M,l,a)=>{a.r(l),a.d(l,{LandingModule:()=>x});var s=a(6814),c=a(2430),d=a(649),h=a(6570),e=a(5879),m=a(2169),p=a(3982);let f=(()=>{var n;class i{constructor(){this.cryptoname=this.name}}return(n=i).\u0275fac=function(t){return new(t||n)},n.\u0275cmp=e.Xpm({type:n,selectors:[["app-carousel-element"]],inputs:{Item:"Item",name:"name"},decls:11,vars:4,consts:[["appGlowify","",1,"carousel-element"],[1,"img-container"],["alt","",1,"img-ele",3,"src"],[1,"crypto-info"]],template:function(t,r){1&t&&(e.TgZ(0,"div",0)(1,"div",1),e._UZ(2,"img",2),e.TgZ(3,"div",3)(4,"div"),e._uU(5),e.qZA(),e.TgZ(6,"div")(7,"div"),e._uU(8),e.qZA(),e.TgZ(9,"div"),e._uU(10),e.qZA()()()()()),2&t&&(e.xp6(2),e.Q6J("src",r.Item.item.large,e.LSH),e.xp6(3),e.hij(" ",r.Item.item.symbol," "),e.xp6(3),e.hij("Score | ",r.Item.item.score,""),e.xp6(2),e.hij("Market Cap Rank | ",r.Item.item.market_cap_rank,""))},dependencies:[p.w],styles:[".carousel-element[_ngcontent-%COMP%]{height:12rem;width:12rem;border-radius:50%;border-style:solid;border-width:thin;background-color:azure;display:flex;flex-direction:column;align-items:center;justify-content:center}.img-container[_ngcontent-%COMP%]{border-radius:50%;height:100%;width:100%;position:relative;z-index:9999;display:flex;flex-direction:column;align-items:center;justify-content:center}.img-ele[_ngcontent-%COMP%]{border-radius:50%;position:absolute;height:100%;width:100%;display:flex;flex-direction:column;align-items:center;justify-content:center}.crypto-info[_ngcontent-%COMP%]{background-color:#101a1a79;position:absolute;height:50%;width:100%;display:flex;flex-direction:column;align-items:center;justify-content:center}"]}),i})();const u=function(){return{height:"100%",width:"15vw",backgroundColor:"transparent",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}};function y(n,i){if(1&n&&(e.TgZ(0,"div",6),e._UZ(1,"app-carousel-element",7),e.qZA()),2&n){const o=i.$implicit;e.Q6J("ngStyle",e.DdM(3,u)),e.xp6(1),e.Q6J("Item",o)("name",o.name)}}function w(n,i){if(1&n&&(e.TgZ(0,"div",6),e._UZ(1,"app-carousel-element",7),e.qZA()),2&n){const o=i.$implicit;e.Q6J("ngStyle",e.DdM(3,u)),e.xp6(1),e.Q6J("Item",o)("name",o.name)}}const _=[{path:"",component:(()=>{var n;class i{onResize(t){t.target.innerWidth<=699?(this.title_container_width="60%",this.title_container_height="30%",this.crpyoinfo_container_width="90%",this.crpyoinfo_container_height="30%"):t.target.innerWidth>700&&(this.title_container_width="50%",this.title_container_height="30%",this.crpyoinfo_container_width="90%",this.crpyoinfo_container_height="30%")}constructor(t){this.store=t,this.trending_cryptos=[],this.title_container_width=window.innerWidth<=700?"60%":"50%",this.title_container_height="30%",this.crpyoinfo_container_width=window.innerWidth<=700?"90%":"40%",this.crpyoinfo_container_height=(window,"30%"),this.cellsToShow=window.innerWidth<=700?1:4,this.images=[]}ngOnInit(){this.store.select(h.d).subscribe(t=>{this.trending_cryptos=t,this.trending_cryptos.forEach(r=>{this.images.push({path:r.item.large})}),this.images.reverse()})}}return(n=i).\u0275fac=function(t){return new(t||n)(e.Y36(m.yh))},n.\u0275cmp=e.Xpm({type:n,selectors:[["app-landing"]],hostBindings:function(t,r){1&t&&e.NdJ("resize",function(Z){return r.onResize(Z)},!1,e.Jf7)},decls:13,vars:23,consts:[[1,"landing-page"],[1,"title-container"],[1,"carousel-container"],["transitionTimingFunction","ease-in-out",3,"loop","borderRadius","cellWidth","overflowCellsLimit","autoplay","height","width","margin","cellsToShow","autoplayInterval","transitionDuration","arrowsOutside","arrows"],["class","carousel-cell",3,"ngStyle",4,"ngFor","ngForOf"],[1,"crpyoinfo-container"],[1,"carousel-cell",3,"ngStyle"],[3,"Item","name"]],template:function(t,r){1&t&&(e.TgZ(0,"div",0)(1,"div",1)(2,"h1"),e._uU(3,"CryptoZapp"),e.qZA(),e.TgZ(4,"h3"),e._uU(5,"See the market, make your list, and share it."),e.qZA()(),e.TgZ(6,"div",2)(7,"carousel",3),e.YNc(8,y,2,4,"div",4),e.YNc(9,w,2,4,"div",4),e.qZA()(),e.TgZ(10,"div",5)(11,"p"),e._uU(12," Crypto allows for self custody of trasferable energy, aka, work that was done. When you work, you exchange time and enerygy for money in a proportional manner. However, overtime that money dissipates due to our fiat money's fundumantal solution to everything, inflation. "),e.qZA()()()),2&t&&(e.xp6(1),e.Udp("width",r.title_container_width)("height",r.title_container_height),e.xp6(6),e.Q6J("loop",!0)("borderRadius",200)("cellWidth",1200)("overflowCellsLimit",7)("autoplay",!0)("height",300)("width",1200)("margin",50)("cellsToShow",r.cellsToShow)("autoplayInterval",4e3)("transitionDuration",2e3)("arrowsOutside",!0)("arrows",!0),e.xp6(1),e.Q6J("ngForOf",r.trending_cryptos),e.xp6(1),e.Q6J("ngForOf",r.trending_cryptos),e.xp6(1),e.Udp("width",r.crpyoinfo_container_width)("height",r.crpyoinfo_container_height))},dependencies:[f,c.F,s.sg,s.PC],styles:[".landing-page[_ngcontent-%COMP%]{background-color:#202043;color:#fff;height:90vh;width:100%;display:flex;flex-direction:column;align-items:center;justify-content:space-around;overflow:hidden;background-image:url(https://s7d2.scene7.com/is/image/TWCNews/nyc_lightning_strike1280x720esbgettyimages-629353120png);background-size:cover}.title-container[_ngcontent-%COMP%]{background-color:#000;display:flex;flex-direction:column;align-items:center;justify-content:space-around}.crpyoinfo-container[_ngcontent-%COMP%]{background-color:#000;display:flex;flex-direction:column;align-items:center;justify-content:center}.carousel-container[_ngcontent-%COMP%]{z-index:1;height:30%;width:100vw;background-color:#000;display:flex;flex-direction:column;align-items:center;justify-content:center}"]}),i})()}];let v=(()=>{var n;class i{}return(n=i).\u0275fac=function(t){return new(t||n)},n.\u0275mod=e.oAB({type:n}),n.\u0275inj=e.cJS({imports:[d.Bz.forChild(_),d.Bz]}),i})(),C=(()=>{var n;class i{}return(n=i).\u0275fac=function(t){return new(t||n)},n.\u0275mod=e.oAB({type:n}),n.\u0275inj=e.cJS({imports:[s.ez]}),i})(),x=(()=>{var n;class i{}return(n=i).\u0275fac=function(t){return new(t||n)},n.\u0275mod=e.oAB({type:n}),n.\u0275inj=e.cJS({imports:[C,c.Q,s.ez,v]}),i})()}}]);