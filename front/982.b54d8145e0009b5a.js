"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[982],{982:(C,d,s)=>{s.r(d),s.d(d,{RegisterModule:()=>h});var a=s(6814),u=s(1759),r=s(95),e=s(6689),c=s(1154);function g(t,i){1&t&&(e.TgZ(0,"div"),e._uU(1,"Email is required "),e.qZA())}function m(t,i){1&t&&(e.TgZ(0,"div"),e._uU(1,"Password is required "),e.qZA())}const p=[{path:"",component:(()=>{var t;class i{constructor(o,n){this.authServ=o,this.formBuilder=n,this.registerForm=this.formBuilder.group({email:new r.NI("",[r.kI.required]),password:new r.NI("",[r.kI.required])})}get emailControl(){return this.registerForm.get("email")}get passwordControl(){return this.registerForm.get("password")}registerUser(){this.authServ.register(this.emailControl.value,this.passwordControl.value).subscribe(o=>{console.log("USer created: ",o)})}}return(t=i).\u0275fac=function(o){return new(o||t)(e.Y36(c.e),e.Y36(r.qu))},t.\u0275cmp=e.Xpm({type:t,selectors:[["app-register"]],decls:22,vars:5,consts:[[1,"register-page"],["action","",1,"register-form",3,"formGroup","ngSubmit"],[1,"form-input-container"],[1,"form-input"],["for","email",1,"input-label"],["id","email","placeholder","Email","name","email","type","text",1,"input-box",3,"formControl"],[1,"input-errors"],[4,"ngIf"],["placeholder","Password","type","text","required","",1,"input-box",3,"formControl"],[1,"btn-container"],["type","submit",1,"submit-btn"]],template:function(o,n){1&o&&(e.TgZ(0,"div",0)(1,"form",1),e.NdJ("ngSubmit",function(){return n.registerUser()}),e.TgZ(2,"div")(3,"h1"),e._uU(4," Register "),e.qZA()(),e.TgZ(5,"div",2)(6,"div",3)(7,"label",4),e._uU(8,"Email"),e.qZA(),e._UZ(9,"input",5),e.qZA(),e.TgZ(10,"div",6),e.YNc(11,g,2,0,"div",7),e.qZA()(),e.TgZ(12,"div",2)(13,"div",3)(14,"label",4),e._uU(15,"Password"),e.qZA(),e._UZ(16,"input",8),e.qZA(),e.TgZ(17,"div",6),e.YNc(18,m,2,0,"div",7),e.qZA()(),e.TgZ(19,"div",9)(20,"button",10),e._uU(21,"Register"),e.qZA()()()()),2&o&&(e.xp6(1),e.Q6J("formGroup",n.registerForm),e.xp6(8),e.Q6J("formControl",n.emailControl),e.xp6(2),e.Q6J("ngIf",n.emailControl.invalid&&(n.emailControl.dirty||n.emailControl.touched)),e.xp6(5),e.Q6J("formControl",n.passwordControl),e.xp6(2),e.Q6J("ngIf",n.passwordControl.invalid&&(n.passwordControl.dirty||n.passwordControl.touched)))},dependencies:[r._Y,r.Fj,r.JJ,r.JL,r.Q7,r.oH,r.sg,a.O5],styles:[".register-page[_ngcontent-%COMP%]{height:90vh;width:100%;background-color:#414b56;display:flex;flex-direction:column;align-items:center;justify-content:center}.register-form[_ngcontent-%COMP%]{height:50%;width:50%;background-color:#000;color:#fff;display:flex;flex-direction:column;align-items:center;justify-content:space-around;border-radius:1rem;border-style:solid;border-width:thin;border-color:#00f}.form-input-container[_ngcontent-%COMP%]{height:20%;width:50%;display:flex;flex-direction:column;align-items:center;justify-content:center}.form-input[_ngcontent-%COMP%]{height:80%;width:90%;display:flex;flex-direction:row;align-items:center;justify-content:space-around}.input-label[_ngcontent-%COMP%]{height:100%;width:25%;display:flex;flex-direction:column;align-items:center;justify-content:center}.input-errors[_ngcontent-%COMP%]{height:20%;width:90%;display:flex;flex-direction:column;align-items:center;justify-content:space-around}.input-box[_ngcontent-%COMP%]{height:50%;width:75%}.btn-container[_ngcontent-%COMP%]{height:20%;width:50%;display:flex;flex-direction:row;align-items:center;justify-content:center}.submit-btn[_ngcontent-%COMP%]{height:2rem;width:5rem;background-color:#0c0c2c;color:#add8e6;border-radius:1rem;border-style:solid;border-width:thin;border-color:#00f}"]}),i})()}];let f=(()=>{var t;class i{}return(t=i).\u0275fac=function(o){return new(o||t)},t.\u0275mod=e.oAB({type:t}),t.\u0275inj=e.cJS({imports:[u.Bz.forChild(p),u.Bz]}),i})(),h=(()=>{var t;class i{}return(t=i).\u0275fac=function(o){return new(o||t)},t.\u0275mod=e.oAB({type:t}),t.\u0275inj=e.cJS({imports:[r.UX,r.u5,a.ez,f]}),i})()}}]);