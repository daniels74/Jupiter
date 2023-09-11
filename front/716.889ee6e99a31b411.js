"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[716],{1716:(y,d,l)=>{l.r(d),l.d(d,{LoginModule:()=>v});var a=l(6814),u=l(1759),e=l(95),c=l(8180),n=l(6689),m=l(1154);function g(t,r){1&t&&(n.TgZ(0,"div"),n._uU(1,"Email is required"),n.qZA())}function p(t,r){1&t&&(n.TgZ(0,"div"),n._uU(1,"Password is required "),n.qZA())}const f=[{path:"",component:(()=>{var t;class r{constructor(i,o){this.formBuilder=i,this.authServ=o,this.loginForm=this.formBuilder.group({email:new e.NI("",[e.kI.required,e.kI.email]),password:new e.NI("",[e.kI.required])})}get emailInput(){return this.loginForm.get("email")}get passwordInput(){return this.loginForm.get("password")}loginUser(){this.authServ.login(this.emailInput.value,this.passwordInput.value).pipe((0,c.q)(1)).subscribe(i=>{this.authServ.setPermissions(i.access_token)})}}return(t=r).\u0275fac=function(i){return new(i||t)(n.Y36(e.qu),n.Y36(m.e))},t.\u0275cmp=n.Xpm({type:t,selectors:[["app-login"]],decls:23,vars:6,consts:[[1,"login-page"],["action","",1,"login-form",3,"formGroup","ngSubmit"],[1,"form-input-container"],[1,"form-input"],["for","email",1,"input-label"],["id","email","placeholder","Email","name","email","type","text","required","",1,"input-box",3,"formControl"],[1,"input-errors"],[4,"ngIf"],["placeholder","Password","type","text","required","",1,"input-box",3,"formControl"],[1,"btn-container"],["type","submit",1,"submit-btn"]],template:function(i,o){1&i&&(n.TgZ(0,"div",0)(1,"form",1),n.NdJ("ngSubmit",function(){return o.loginUser()}),n.TgZ(2,"div")(3,"h1"),n._uU(4," Login "),n.qZA()(),n.TgZ(5,"div",2)(6,"div",3)(7,"label",4),n._uU(8,"Email"),n.qZA(),n._UZ(9,"input",5),n.qZA(),n.TgZ(10,"div",6),n.YNc(11,g,2,0,"div",7),n.qZA()(),n.TgZ(12,"div",2)(13,"div",3)(14,"label",4),n._uU(15,"Password"),n.qZA(),n._UZ(16,"input",8),n.qZA(),n.TgZ(17,"div",6),n.YNc(18,p,2,0,"div",7),n.qZA()(),n.TgZ(19,"div",9)(20,"button",10),n._uU(21,"Login"),n.qZA()()(),n._uU(22),n.qZA()),2&i&&(n.xp6(1),n.Q6J("formGroup",o.loginForm),n.xp6(8),n.Q6J("formControl",o.emailInput),n.xp6(2),n.Q6J("ngIf",o.emailInput.invalid&&(o.emailInput.dirty||o.emailInput.touched)),n.xp6(5),n.Q6J("formControl",o.passwordInput),n.xp6(2),n.Q6J("ngIf",o.passwordInput.invalid&&(o.passwordInput.dirty||o.passwordInput.touched)),n.xp6(4),n.hij(" ",o.emailInput.value,"\n"))},dependencies:[a.O5,e._Y,e.Fj,e.JJ,e.JL,e.Q7,e.oH,e.sg],styles:[".login-page[_ngcontent-%COMP%]{height:90vh;width:100%;background-color:#414b56;display:flex;flex-direction:column;align-items:center;justify-content:center}.login-form[_ngcontent-%COMP%]{height:50%;width:50%;background-color:#000;color:#fff;display:flex;flex-direction:column;align-items:center;justify-content:space-around;border-radius:1rem;border-style:solid;border-width:thin;border-color:#00f}.form-input-container[_ngcontent-%COMP%]{height:20%;width:50%;display:flex;flex-direction:column;align-items:center;justify-content:center}.form-input[_ngcontent-%COMP%]{height:80%;width:90%;display:flex;flex-direction:row;align-items:center;justify-content:space-around}.input-label[_ngcontent-%COMP%]{height:100%;width:25%;display:flex;flex-direction:column;align-items:center;justify-content:center}.input-errors[_ngcontent-%COMP%]{height:20%;width:90%;display:flex;flex-direction:column;align-items:center;justify-content:space-around}.input-box[_ngcontent-%COMP%]{height:50%;width:75%}.btn-container[_ngcontent-%COMP%]{height:20%;width:50%;display:flex;flex-direction:row;align-items:center;justify-content:center}.submit-btn[_ngcontent-%COMP%]{height:2rem;width:5rem;background-color:#0c0c2c;color:#add8e6;border-radius:1rem;border-style:solid;border-width:thin;border-color:#00f}"]}),r})()}];let h=(()=>{var t;class r{}return(t=r).\u0275fac=function(i){return new(i||t)},t.\u0275mod=n.oAB({type:t}),t.\u0275inj=n.cJS({imports:[u.Bz.forChild(f),u.Bz]}),r})(),v=(()=>{var t;class r{}return(t=r).\u0275fac=function(i){return new(i||t)},t.\u0275mod=n.oAB({type:t}),t.\u0275inj=n.cJS({imports:[a.ez,h,e.UX,u.Bz]}),r})()}}]);