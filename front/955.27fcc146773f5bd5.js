"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[955],{8955:(W,g,r)=>{r.r(g),r.d(g,{LandingModule:()=>H});var s=r(6814),d=r(2430),h=r(1303),f=r(6570),t=r(9212),m=r(4633),_=r(2169),y=r(3350),v=r(9862),x=r(3982);let p=(()=>{class n{constructor(e,o){this.coinGeckoApi=e,this.http=o,this.cryptoImg="",this.miniChartState=!1,this.curretnChartData=[],this.cryptoname=this.name}ngOnInit(){}toggleChart(){this.coinGeckoApi.getChartData(this.Item.item.id).subscribe(e=>{console.log("User Page Collection Card: getChartData RESPONSE: ",e)})}static#t=this.\u0275fac=function(o){return new(o||n)(t.Y36(m.l),t.Y36(v.eN))};static#e=this.\u0275cmp=t.Xpm({type:n,selectors:[["app-carousel-element"]],inputs:{Item:"Item",name:"name",cryptoImg:"cryptoImg"},standalone:!0,features:[t.jDz],decls:24,vars:9,consts:[["appGlowify","",1,"carousel-element",3,"mouseenter"],[1,"img-container"],["appGlowify","",1,"img-ele","container"],[1,"cube"],[1,"face","top"],["cross-origin","","alt","",1,"img-ele",3,"src"],[1,"face","bottom"],[1,"face","left"],[1,"face","right"],[1,"face","front"],[1,"face","back"],[1,"crypto-info"]],template:function(o,i){1&o&&(t.TgZ(0,"div",0),t.NdJ("mouseenter",function(){return i.toggleChart()}),t.TgZ(1,"div",1)(2,"div",2)(3,"div",3)(4,"div",4),t._UZ(5,"img",5),t.qZA(),t.TgZ(6,"div",6),t._UZ(7,"img",5),t.qZA(),t.TgZ(8,"div",7),t._UZ(9,"img",5),t.qZA(),t.TgZ(10,"div",8),t._UZ(11,"img",5),t.qZA(),t.TgZ(12,"div",9),t._UZ(13,"img",5),t.qZA(),t.TgZ(14,"div",10),t._UZ(15,"img",5),t.qZA()()(),t.TgZ(16,"div",11)(17,"h1"),t._uU(18),t.qZA(),t.TgZ(19,"div")(20,"h4"),t._uU(21),t.qZA(),t.TgZ(22,"h4"),t._uU(23),t.qZA()()()()()),2&o&&(t.xp6(5),t.Q6J("src",i.Item.item.large,t.LSH),t.xp6(2),t.Q6J("src",i.Item.item.large,t.LSH),t.xp6(2),t.Q6J("src",i.Item.item.large,t.LSH),t.xp6(2),t.Q6J("src",i.Item.item.large,t.LSH),t.xp6(2),t.Q6J("src",i.Item.item.large,t.LSH),t.xp6(2),t.Q6J("src",i.Item.item.large,t.LSH),t.xp6(3),t.hij(" ",i.Item.item.symbol," "),t.xp6(3),t.hij("Score | ",i.Item.item.score,""),t.xp6(2),t.hij("Market Cap Rank | ",i.Item.item.market_cap_rank,""))},dependencies:[y.p,x.w,s.ez],styles:[".carousel-element[_ngcontent-%COMP%]{height:12rem;width:12rem;border-radius:50%;border-style:none;border-width:thin;display:flex;flex-direction:column;align-items:center;justify-content:center}.img-container[_ngcontent-%COMP%]{border-radius:50%;height:100%;width:100%;position:relative;z-index:9999;display:flex;flex-direction:column;align-items:center;justify-content:center;background-color:transparent}.img-ele[_ngcontent-%COMP%]{border-radius:50%;position:absolute;height:100%;width:100%;display:flex;flex-direction:column;align-items:center;justify-content:center}.container[_ngcontent-%COMP%]{width:100px;height:100px;margin:100px;border-radius:50%;display:flex;flex-direction:column;align-items:center;justify-content:center}.cube[_ngcontent-%COMP%]{position:relative;width:150px;height:150px;transform-style:preserve-3d;transform:rotate3d(0,0,0,0);border-radius:50%;display:flex;flex-direction:column;align-items:center;justify-content:center}.face[_ngcontent-%COMP%]{width:150px;height:150px;border:2px solid black;position:absolute;opacity:.6;display:flex;align-items:center;justify-content:center;font-family:Arial,sans-serif;font-size:2rem;border-radius:50%}.front[_ngcontent-%COMP%]{transform:translateZ(75px)}.back[_ngcontent-%COMP%]{transform:translateZ(-75px) rotateY(180deg)}.left[_ngcontent-%COMP%]{transform:translate(-75px) rotateY(-90deg)}.right[_ngcontent-%COMP%]{transform:translate(75px) rotateY(90deg)}.top[_ngcontent-%COMP%]{transform:translateY(-75px) rotateX(90deg)}.bottom[_ngcontent-%COMP%]{transform:translateY(75px) rotateX(-90deg)}@keyframes _ngcontent-%COMP%_turn{0%{transform:rotate3d(0,0,0,0)}75%{transform:rotate3d(1,1,1,360deg)}to{transform:rotateX(90deg)}}.cube[_ngcontent-%COMP%]{position:relative;width:200px;height:200px;transform-style:preserve-3d;animation:_ngcontent-%COMP%_turn 15s linear infinite}@media (prefers-reduced-motion: reduce){.cube[_ngcontent-%COMP%]{animation:none;transform:rotate3d(1,1,0,45deg)}}.crypto-info[_ngcontent-%COMP%]{position:absolute;height:50%;width:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;border-radius:25%}.crypto-info[_ngcontent-%COMP%] > h1[_ngcontent-%COMP%], h4[_ngcontent-%COMP%]{color:snow}"]})}return n})();var u=r(5088);function C(n,a){1&n&&t._UZ(0,"img",9)}function w(n,a){1&n&&t._UZ(0,"img",10)}function Z(n,a){if(1&n&&(t.TgZ(0,"div",11)(1,"h1"),t._uU(2,"CryptoZapp"),t.qZA(),t.TgZ(3,"h4"),t._uU(4,"See the market, make your list, and share it."),t.qZA()()),2&n){const e=t.oxw();t.Udp("width",e.title_container_width)("height",e.title_container_height),t.xp6(3),t.Udp("padding-left","1rem")("padding-right","1rem")}}function M(n,a){if(1&n&&(t.TgZ(0,"div",11)(1,"h1"),t._uU(2,"CryptoZapp"),t.qZA(),t.TgZ(3,"h3"),t._uU(4,"See the market, make your list, and share it."),t.qZA()()),2&n){const e=t.oxw();t.Udp("width",e.title_container_width)("height",e.title_container_height)}}const b=()=>({position:"absolute",height:"100%",width:"100%",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",backgroundColor:"transparent"});function S(n,a){if(1&n){const e=t.EpF();t.TgZ(0,"div",12)(1,"app-carousel-element",13),t.NdJ("click",function(){t.CHM(e);const i=t.oxw();return t.KtG(i.keepActive())})("mouseenter",function(){const l=t.CHM(e).$implicit,c=t.oxw();return c.toggleChart(!0),t.KtG(c.setName(l.item))})("mouseleave",function(){t.CHM(e);const i=t.oxw();return t.KtG(i.toggleChart(!1))}),t.qZA()()}if(2&n){const e=a.$implicit;t.Q6J("ngStyle",t.DdM(4,b)),t.xp6(1),t.Q6J("Item",e)("name",e.name)("cryptoImg",e.item.large)}}const T=()=>({position:"absolute",top:10,right:0,zIndex:"99999",marginTop:"1rem",height:"25vh",width:"25vw",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}),O=()=>({position:"absolute",height:"100%",width:"100%",filter:"blur(10px)",zIndex:"99",marginTop:"1rem"}),I=()=>({position:"absolute",height:"100%",width:"100%",zIndex:"999999",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"space-around"}),P=()=>({position:"relative",height:"50%",width:"80%",display:"flex",flexDirection:"column",alignItems:"flex-end",justifyContent:"center"}),A=()=>({borderRadius:"50%"}),J=()=>({height:"50%",width:"100%",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"flex-start"}),z=()=>({color:"white"}),L=()=>({position:"absolute",top:"7rem",height:"25vh",width:"25vw",filter:"blur(10px)",zIndex:"99999"}),k=()=>({position:"absolute",top:"7rem",height:"25vh",width:"25vw",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",zIndex:"99999"}),Q=()=>({height:"100%",width:"100%"});function U(n,a){if(1&n&&(t.TgZ(0,"div")(1,"div",14),t._UZ(2,"div",14),t.TgZ(3,"div",14)(4,"div",14),t._UZ(5,"img",15),t.qZA(),t.TgZ(6,"div",14)(7,"h1",14),t._uU(8),t.qZA()()()(),t._UZ(9,"div",14),t.TgZ(10,"div",14)(11,"div",14),t._UZ(12,"app-chart"),t.qZA()()()),2&n){const e=t.oxw();t.xp6(1),t.Q6J("ngStyle",t.DdM(12,T)),t.xp6(1),t.Q6J("ngStyle",t.DdM(13,O)),t.xp6(1),t.Q6J("ngStyle",t.DdM(14,I)),t.xp6(1),t.Q6J("ngStyle",t.DdM(15,P)),t.xp6(1),t.Q6J("src",e.cryptoimg,t.LSH)("ngStyle",t.DdM(16,A)),t.xp6(1),t.Q6J("ngStyle",t.DdM(17,J)),t.xp6(1),t.Q6J("ngStyle",t.DdM(18,z)),t.xp6(1),t.Oqu(e.cryptoName),t.xp6(1),t.Q6J("ngStyle",t.DdM(19,L)),t.xp6(1),t.Q6J("ngStyle",t.DdM(20,k)),t.xp6(1),t.Q6J("ngStyle",t.DdM(21,Q))}}const D=[{path:"",component:(()=>{class n{onResize(e){e.target.innerWidth<=699?(this.title_container_width="auto",this.title_container_height="25%",this.crpyoinfo_container_width="90%",this.crpyoinfo_container_height="30%"):e.target.innerWidth>700&&(this.title_container_width="50%",this.title_container_height="30%",this.crpyoinfo_container_width="40%",this.crpyoinfo_container_height="30%")}constructor(e,o){this.coinGeckoApi=e,this.store=o,this.trending_cryptos=[],this.title_container_width=window.innerWidth<=700?"auto":"50%",this.title_container_height=window.innerWidth<=700?"25%":"30%",this.titleFontSize=window.innerWidth<=700,this.crpyoinfo_container_width=window.innerWidth<=700?"90%":"40%",this.crpyoinfo_container_height=(window,"30%"),this.cellsToShow=window.innerWidth<=700?1:4,this.carouselWidth=window.innerWidth<=700?250:1e3,this.carouselHeight=window.innerWidth<=700?200:300,this.miniChartState=!1,this.chartActiveState=!1,this.cryptoName="HELLO",this.cryptoimg="",this.images=[]}ngOnInit(){this.store.select(f.d).subscribe(e=>{this.trending_cryptos=e})}toggleChart(e){this.miniChartState=e}keepActive(){this.chartActiveState=!this.chartActiveState}setName(e){this.cryptoName=e.name,this.cryptoimg=e.large,console.log("crypto: ",e)}static#t=this.\u0275fac=function(o){return new(o||n)(t.Y36(m.l),t.Y36(_.yh))};static#e=this.\u0275cmp=t.Xpm({type:n,selectors:[["app-landing"]],hostBindings:function(o,i){1&o&&t.NdJ("resize",function(c){return i.onResize(c)},!1,t.Jf7)},decls:12,vars:24,consts:[[1,"landing-page","background-theme-color"],["class","cover-img-small","src","https://s7d2.scene7.com/is/image/TWCNews/nyc_lightning_strike1280x720esbgettyimages-629353120png","alt","",4,"ngIf"],["class","cover-img-large","src","https://s7d2.scene7.com/is/image/TWCNews/nyc_lightning_strike1280x720esbgettyimages-629353120png","alt","",4,"ngIf"],["class","title-container container-color",3,"width","height",4,"ngIf"],[1,"carousel-container"],["transitionTimingFunction","ease-in-out",3,"pauseOnHover","loop","borderRadius","cellWidth","overflowCellsLimit","autoplay","height","width","margin","cellsToShow","autoplayInterval","transitionDuration","arrowsOutside","arrows"],["class","carousel-cell",3,"ngStyle",4,"ngFor","ngForOf"],[1,"crpyoinfo-container","container-color"],[4,"ngIf"],["src","https://s7d2.scene7.com/is/image/TWCNews/nyc_lightning_strike1280x720esbgettyimages-629353120png","alt","",1,"cover-img-small"],["src","https://s7d2.scene7.com/is/image/TWCNews/nyc_lightning_strike1280x720esbgettyimages-629353120png","alt","",1,"cover-img-large"],[1,"title-container","container-color"],[1,"carousel-cell",3,"ngStyle"],[3,"Item","name","cryptoImg","click","mouseenter","mouseleave"],[3,"ngStyle"],["alt","","height","50%",3,"src","ngStyle"]],template:function(o,i){1&o&&(t.TgZ(0,"div",0),t.YNc(1,C,1,0,"img",1)(2,w,1,0,"img",2)(3,Z,5,8,"div",3)(4,M,5,4,"div",3),t.TgZ(5,"div",4)(6,"carousel",5),t.YNc(7,S,2,5,"div",6),t.qZA()(),t.TgZ(8,"div",7)(9,"p"),t._uU(10," Crypto allows for self custody of trasferable energy, aka, work that was done. When you work, you exchange time and enerygy for money in a proportional manner. However, overtime that money dissipates due to our fiat money's fundumantal solution to everything, inflation. "),t.qZA()()(),t.YNc(11,U,13,22,"div",8)),2&o&&(t.xp6(1),t.Q6J("ngIf",i.titleFontSize),t.xp6(1),t.Q6J("ngIf",!i.titleFontSize),t.xp6(1),t.Q6J("ngIf",i.titleFontSize),t.xp6(1),t.Q6J("ngIf",!i.titleFontSize),t.xp6(2),t.Q6J("pauseOnHover",!0)("loop",!0)("borderRadius",200)("cellWidth",1200)("overflowCellsLimit",7)("autoplay",!0)("height",i.carouselHeight)("width",i.carouselWidth)("margin",50)("cellsToShow",i.cellsToShow)("autoplayInterval",6e3)("transitionDuration",800)("arrowsOutside",!0)("arrows",!0),t.xp6(1),t.Q6J("ngForOf",i.trending_cryptos),t.xp6(1),t.Udp("width",i.crpyoinfo_container_width)("height",i.crpyoinfo_container_height),t.xp6(3),t.Q6J("ngIf",i.miniChartState||i.chartActiveState))},dependencies:[d.F,s.sg,s.O5,s.PC,p,u.x],styles:[".landing-page[_ngcontent-%COMP%]{position:absolute;height:90vh;width:100%;display:flex;flex-direction:column;align-items:center;justify-content:space-around;overflow:hidden}.cover-img-small[_ngcontent-%COMP%]{position:absolute;height:100%;width:auto;background-size:cover;background-position:center center;opacity:.75}.cover-img-large[_ngcontent-%COMP%]{position:absolute;height:100%;width:100%;background-size:auto;opacity:.75}.title-container[_ngcontent-%COMP%]{position:relative;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1rem;border-radius:1rem;font-family:Copperplate}.title-container[_ngcontent-%COMP%] > h1[_ngcontent-%COMP%]{font-size:4rem}.title-container[_ngcontent-%COMP%] > h2[_ngcontent-%COMP%]{font-size:3rem}.carousel-container[_ngcontent-%COMP%]{position:relative;z-index:1;min-height:30%;height:auto}.crpyoinfo-container[_ngcontent-%COMP%]{position:relative;display:flex;flex-direction:column;align-items:flex-start;justify-content:flex-start;border-radius:1rem;font-family:Papyrus;box-sizing:border-box;padding:2rem;overflow-y:auto}.crpyoinfo-container[_ngcontent-%COMP%] > p[_ngcontent-%COMP%]{font-size:larger}"]})}return n})()}];let j=(()=>{class n{static#t=this.\u0275fac=function(o){return new(o||n)};static#e=this.\u0275mod=t.oAB({type:n});static#n=this.\u0275inj=t.cJS({imports:[h.Bz.forChild(D),h.Bz]})}return n})(),H=(()=>{class n{static#t=this.\u0275fac=function(o){return new(o||n)};static#e=this.\u0275mod=t.oAB({type:n});static#n=this.\u0275inj=t.cJS({imports:[d.Q,s.ez,j,p,u.x]})}return n})()}}]);