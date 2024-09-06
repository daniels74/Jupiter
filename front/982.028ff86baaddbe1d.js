"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[982],{982:(J,p,r)=>{r.r(p),r.d(p,{RegisterModule:()=>A});var l=r(6814),m=r(1303),t=r(9212),s=r(6223),d=r(3019),v=r(4664),w=r(9530),g=r(1993),h=r(8672),x=r(1154),I=r(173),c=r(2032),u=r(9157),f=r(2296);function C(i,a){if(1&i&&(t.TgZ(0,"mat-error"),t._uU(1),t.qZA()),2&i){const e=t.oxw(2);t.xp6(1),t.Oqu(e.emailErrorMessage())}}function Z(i,a){if(1&i&&(t.TgZ(0,"mat-error"),t._uU(1),t.qZA()),2&i){const e=t.oxw(2);t.xp6(1),t.Oqu(e.passwordErrorMessage())}}function T(i,a){1&i&&(t.TgZ(0,"button",7),t._uU(1,"Register"),t.qZA())}function E(i,a){1&i&&(t.TgZ(0,"button",8),t._uU(1,"Register"),t.qZA())}function S(i,a){if(1&i){const e=t.EpF();t.TgZ(0,"form",3),t.NdJ("ngSubmit",function(){t.CHM(e);const o=t.oxw();return t.KtG(o.registerUser())}),t.TgZ(1,"div")(2,"h1"),t._uU(3,"Register"),t.qZA()(),t.TgZ(4,"mat-form-field",4)(5,"mat-label"),t._uU(6,"Email"),t.qZA(),t._UZ(7,"input",5),t.YNc(8,C,2,1,"mat-error"),t.qZA(),t.TgZ(9,"mat-form-field",4)(10,"mat-label"),t._uU(11,"Password"),t.qZA(),t._UZ(12,"input",5),t.YNc(13,Z,2,1,"mat-error"),t.qZA(),t.TgZ(14,"div",6),t.YNc(15,T,2,0,"button",7)(16,E,2,0),t.qZA()()}if(2&i){const e=t.oxw();t.Udp("width",e.container_width)("height",e.container_height),t.Q6J("formGroup",e.registerForm),t.xp6(4),t.Udp("width",e.form_input_container_width)("height",e.form_input_container_height),t.xp6(3),t.Q6J("formControl",e.emailInput),t.xp6(1),t.um2(8,e.emailInput.invalid?8:-1),t.xp6(1),t.Udp("width",e.form_input_container_width)("height",e.form_input_container_height),t.xp6(3),t.Q6J("formControl",e.passwordInput),t.xp6(1),t.um2(13,e.passwordInput.invalid?13:-1),t.xp6(2),t.um2(15,e.emailInput.invalid?15:16)}}function M(i,a){if(1&i&&(t.TgZ(0,"div",9),t._UZ(1,"ngx-spinner",10),t.qZA()),2&i){const e=t.oxw();t.Udp("width",e.container_width)("height",e.container_height),t.xp6(1),t.Q6J("fullScreen",!1)}}const R=[{path:"",component:(()=>{class i{constructor(e,n,o,b,y){this.spinner=e,this.authServ=n,this.formBuilder=o,this.router=b,this.store=y,this.loadingState=!1,this.container_width=window.innerWidth<=700?"95%":"50%",this.container_height=window.innerWidth<=700?"75%":"50%",this.form_input_container_width=window.innerWidth<=700?"80%":"50%",this.form_input_container_height=window.innerWidth<=700?"10%":"20%",this.emailErrorMessage=(0,t.tdS)(""),this.passwordErrorMessage=(0,t.tdS)(""),this.registerForm=this.formBuilder.group({email:new s.NI("",[s.kI.required]),password:new s.NI("",[s.kI.required])}),(0,d.T)(this.emailInput.statusChanges,this.emailInput.valueChanges).pipe((0,g.sL)()).subscribe(()=>{this.updateEmailErrorMsg()}),(0,d.T)(this.passwordInput.statusChanges,this.passwordInput.valueChanges).pipe((0,g.sL)()).subscribe(()=>{this.updatePasswordErrorMesg()})}ngOnInit(){this.store.select(w.d).subscribe(e=>{this.user=e})}get emailInput(){return this.registerForm.get("email")}get passwordInput(){return this.registerForm.get("password")}updateEmailErrorMsg(){this.emailInput.hasError("required")?this.emailErrorMessage.set("You must enter a value"):this.emailInput.hasError("email")?this.emailErrorMessage.set("Not a valid email"):this.emailErrorMessage.set("")}updatePasswordErrorMesg(){this.passwordInput.hasError("required")?this.passwordErrorMessage.set("You must enter a value"):this.passwordErrorMessage.set("")}registerUser(){this.spinner.show("primary"),this.loadingState=!0,this.authServ.register(this.emailInput.value,this.passwordInput.value).pipe((0,v.w)(e=>(console.log("Usercreated",e),this.authServ.login(this.emailInput.value,this.passwordInput.value)))).subscribe(e=>{setTimeout(()=>{this.spinner.hide(),this.loadingState=!1,this.authServ.setPermissions(e.jwt),this.router.navigate(["/user",this.user.id])},3e3)})}static#t=this.\u0275fac=function(n){return new(n||i)(t.Y36(h.t2),t.Y36(x.e),t.Y36(s.qu),t.Y36(m.F0),t.Y36(I.yh))};static#e=this.\u0275cmp=t.Xpm({type:i,selectors:[["app-register"]],decls:3,vars:2,consts:[[1,"register-page"],["action","","class","register-form",3,"formGroup","width","height","ngSubmit",4,"ngIf"],["class","login-form",3,"width","height",4,"ngIf"],["action","",1,"register-form",3,"formGroup","ngSubmit"],["appearance","outline","color","accent",1,"form-field"],["matInput","","type","text","required","",3,"formControl"],[1,"btn-container"],["mat-raised-button","","color","warn","type","submit"],["mat-raised-button","","color","primary","type","submit"],[1,"login-form"],["size","medium","template","<img src='../../../assets/bluedots-transparent.gif' />","bdColor","transparent",1,"spinner",3,"fullScreen"]],template:function(n,o){1&n&&(t.TgZ(0,"div",0),t.YNc(1,S,17,18,"form",1)(2,M,2,5,"div",2),t.qZA()),2&n&&(t.xp6(1),t.Q6J("ngIf",!o.loadingState),t.xp6(1),t.Q6J("ngIf",o.loadingState))},dependencies:[s._Y,s.Fj,s.JJ,s.JL,s.Q7,s.oH,s.sg,l.O5,h.Ro,c.Nt,u.KE,u.hX,u.TO,f.lW]})}return i})()}];let U=(()=>{class i{static#t=this.\u0275fac=function(n){return new(n||i)};static#e=this.\u0275mod=t.oAB({type:i});static#i=this.\u0275inj=t.cJS({imports:[m.Bz.forChild(R),m.Bz]})}return i})(),A=(()=>{class i{static#t=this.\u0275fac=function(n){return new(n||i)};static#e=this.\u0275mod=t.oAB({type:i});static#i=this.\u0275inj=t.cJS({imports:[s.UX,s.u5,l.ez,U,h.ef,c.c,u.lN,f.ot]})}return i})()}}]);