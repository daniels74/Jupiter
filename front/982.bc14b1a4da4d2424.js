"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[982],{982:(U,h,o)=>{o.r(h),o.d(h,{RegisterModule:()=>_});var m=o(6814),a=o(1303),r=o(6223),u=o(4664),g=o(9530),t=o(9212),l=o(8672),p=o(1154),c=o(2169);function f(e,d){1&e&&(t.TgZ(0,"div"),t._uU(1,"Email is required "),t.qZA())}function v(e,d){1&e&&(t.TgZ(0,"div"),t._uU(1,"Password is required "),t.qZA())}function w(e,d){if(1&e){const i=t.EpF();t.TgZ(0,"form",3),t.NdJ("ngSubmit",function(){t.CHM(i);const s=t.oxw();return t.KtG(s.registerUser())}),t.TgZ(1,"div")(2,"h1"),t._uU(3," Register "),t.qZA()(),t.TgZ(4,"div",4)(5,"div",5)(6,"label",6),t._uU(7,"Email"),t.qZA(),t._UZ(8,"input",7),t.qZA(),t.TgZ(9,"div",8),t.YNc(10,f,2,0,"div",9),t.qZA()(),t.TgZ(11,"div",4)(12,"div",5)(13,"label",6),t._uU(14,"Password"),t.qZA(),t._UZ(15,"input",10),t.qZA(),t.TgZ(16,"div",8),t.YNc(17,v,2,0,"div",9),t.qZA()(),t.TgZ(18,"div",11)(19,"button",12),t._uU(20,"Register"),t.qZA()()()}if(2&e){const i=t.oxw();t.Udp("width",i.container_width)("height",i.container_height),t.Q6J("formGroup",i.registerForm),t.xp6(4),t.Udp("width",i.form_input_container_width)("height",i.form_input_container_height),t.xp6(4),t.Q6J("formControl",i.emailControl),t.xp6(2),t.Q6J("ngIf",i.emailControl.invalid&&(i.emailControl.dirty||i.emailControl.touched)),t.xp6(1),t.Udp("width",i.form_input_container_width)("height",i.form_input_container_height),t.xp6(4),t.Q6J("formControl",i.passwordControl),t.xp6(2),t.Q6J("ngIf",i.passwordControl.invalid&&(i.passwordControl.dirty||i.passwordControl.touched))}}function C(e,d){if(1&e&&(t.TgZ(0,"div",13),t._UZ(1,"ngx-spinner",14),t.qZA()),2&e){const i=t.oxw();t.Udp("width",i.container_width)("height",i.container_height),t.xp6(1),t.Q6J("fullScreen",!1)}}const Z=[{path:"",component:(()=>{class e{constructor(i,n,s,T,S){this.spinner=i,this.authServ=n,this.formBuilder=s,this.router=T,this.store=S,this.loadingState=!1,this.container_width=window.innerWidth<=700?"95%":"50%",this.container_height=window.innerWidth<=700?"75%":"50%",this.form_input_container_width=window.innerWidth<=700?"100%":"50%",this.form_input_container_height=(window,"20%"),this.registerForm=this.formBuilder.group({email:new r.NI("",[r.kI.required]),password:new r.NI("",[r.kI.required])})}ngOnInit(){this.store.select(g.d).subscribe(i=>{this.user=i})}get emailControl(){return this.registerForm.get("email")}get passwordControl(){return this.registerForm.get("password")}registerUser(){this.spinner.show("primary"),this.loadingState=!0,this.authServ.register(this.emailControl.value,this.passwordControl.value).pipe((0,u.w)(i=>(console.log("Usercreated",i),this.authServ.login(this.emailControl.value,this.passwordControl.value)))).subscribe(i=>{setTimeout(()=>{this.spinner.hide(),this.loadingState=!1,this.authServ.setPermissions(i.jwt),this.router.navigate(["/user",this.user.id])},3e3)})}static#t=this.\u0275fac=function(n){return new(n||e)(t.Y36(l.t2),t.Y36(p.e),t.Y36(r.qu),t.Y36(a.F0),t.Y36(c.yh))};static#i=this.\u0275cmp=t.Xpm({type:e,selectors:[["app-register"]],decls:3,vars:2,consts:[[1,"register-page"],["action","","class","register-form",3,"formGroup","width","height","ngSubmit",4,"ngIf"],["class","login-form",3,"width","height",4,"ngIf"],["action","",1,"register-form",3,"formGroup","ngSubmit"],[1,"form-input-container"],[1,"form-input"],["for","email",1,"input-label"],["id","email","placeholder","Email","name","email","type","text",1,"input-box",3,"formControl"],[1,"input-errors"],[4,"ngIf"],["placeholder","Password","type","text","required","",1,"input-box",3,"formControl"],[1,"btn-container"],["type","submit",1,"submit-btn"],[1,"login-form"],["size","medium","template","<img src='../../../assets/bluedots-transparent.gif' />","bdColor","transparent",1,"spinner",3,"fullScreen"]],template:function(n,s){1&n&&(t.TgZ(0,"div",0),t.YNc(1,w,21,17,"form",1)(2,C,2,5,"div",2),t.qZA()),2&n&&(t.xp6(1),t.Q6J("ngIf",!s.loadingState),t.xp6(1),t.Q6J("ngIf",s.loadingState))},dependencies:[r._Y,r.Fj,r.JJ,r.JL,r.Q7,r.oH,r.sg,m.O5,l.Ro]})}return e})()}];let x=(()=>{class e{static#t=this.\u0275fac=function(n){return new(n||e)};static#i=this.\u0275mod=t.oAB({type:e});static#e=this.\u0275inj=t.cJS({imports:[a.Bz.forChild(Z),a.Bz]})}return e})(),_=(()=>{class e{static#t=this.\u0275fac=function(n){return new(n||e)};static#i=this.\u0275mod=t.oAB({type:e});static#e=this.\u0275inj=t.cJS({imports:[r.UX,r.u5,m.ez,x,l.ef]})}return e})()}}]);