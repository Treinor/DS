(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-register-register-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/register/register.component.html":
/*!**********************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/register/register.component.html ***!
  \**********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"d-flex justify-content-center align-items-center w-100 h-100 register-container\">\r\n    <div class=\"col-xl-4 col-md-6 col-10\">\r\n        <div class=\"card border-0 box-shadow rounded-0\">\r\n            <div class=\"card-header d-flex justify-content-center align-items-center border-0 box-shadow\">\r\n                <i class=\"fa fa-registered\" aria-hidden=\"true\"></i>\r\n            </div>\r\n            <div class=\"card-body text-center pb-1\">\r\n                <h2>Register member</h2>\r\n                <a routerLink=\"/login\" class=\"transition\">Already have an account? Sign in!</a>\r\n\r\n                <form [formGroup]=\"form\" (ngSubmit)=\"onSubmit(form.value)\" class=\"text-left mt-4\">\r\n                    <div class=\"form-group\">\r\n                        <input [formControl]=\"name\" class=\"form-control validation-field\" placeholder=\"Full Name\" type=\"text\"> \r\n                        <small class=\"text-danger\" *ngIf=\"form.get('name').touched\">\r\n                            <span *ngIf=\"form.get('name').hasError('required')\">Full Name is required</span>\r\n                            <span *ngIf=\"form.get('name').hasError('minlength')\">Minimum of 3 characters</span>\r\n                        </small>       \r\n                    </div>\r\n                    <div class=\"form-group\">\r\n                        <input [formControl]=\"email\" class=\"form-control validation-field\" placeholder=\"Email\" type=\"text\"> \r\n                        <small class=\"text-danger\" *ngIf=\"form.get('email').touched\">\r\n                            <span *ngIf=\"form.get('email').hasError('required')\">Email is required</span>\r\n                            <span *ngIf=\"form.get('email').hasError('invalidEmail')\">Invalid email address</span>\r\n                        </small> \r\n                    </div>\r\n                    <div class=\"form-group\">\r\n                        <input [formControl]=\"password\" class=\"form-control validation-field\" placeholder=\"Password\" type=\"password\" minlength=\"6\">\r\n                         <small class=\"text-danger\" *ngIf=\"form.get('password').touched\">\r\n                            <span *ngIf=\"form.get('password').hasError('required')\">Password is required</span>\r\n                            <span *ngIf=\"form.get('password').hasError('minlength')\">Password isn't long enough, minimum of 6 characters</span>\r\n                        </small>                     \r\n                    </div>\r\n                    <div class=\"form-group\">\r\n                        <input [formControl]=\"confirmPassword\" class=\"form-control validation-field\" placeholder=\"Confirm Password\" type=\"password\">\r\n                        <small class=\"text-danger\" *ngIf=\"form.get('confirmPassword').touched\">\r\n                            <span *ngIf=\"form.get('confirmPassword').hasError('required')\">Confirm Password is required</span>\r\n                            <span *ngIf=\"form.get('confirmPassword').hasError('mismatchedPasswords')\">Passwords do not match</span>\r\n                        </small> \r\n                    </div>\r\n                    <div class=\"form-group\">\r\n                        <p class=\"terms\">By creating an account, you agree our <a class=\"transition terms\" href=\"javascript:void(0);\">Terms & Privacy Policy</a></p>                  \r\n                    </div>             \r\n                    <div class=\"form-group\">\r\n                        <button [disabled]=\"!form.valid\" class=\"btn btn-block\" type=\"submit\">Sign up</button>\r\n                    </div>\r\n                </form>  \r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>");

/***/ }),

/***/ "./src/app/pages/register/register.component.scss":
/*!********************************************************!*\
  !*** ./src/app/pages/register/register.component.scss ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".register-container {\n  position: absolute;\n}\n.register-container .card .card-header {\n  width: 80px;\n  height: 80px;\n  margin: 0 auto;\n  margin-top: -40px;\n  border-radius: 50%;\n  font-size: 36px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcGFnZXMvcmVnaXN0ZXIvQzpcXFVzZXJzXFxicnlhblxcT25lRHJpdmVcXEVzY3JpdG9yaW9cXHRlc2lzXFxzdWJpZGFcXHN0YXJ0bmctc2VlZC9zcmNcXGFwcFxccGFnZXNcXHJlZ2lzdGVyXFxyZWdpc3Rlci5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvcGFnZXMvcmVnaXN0ZXIvcmVnaXN0ZXIuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxrQkFBQTtBQ0NKO0FEQ1E7RUFDSSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGNBQUE7RUFDQSxpQkFBQTtFQUNBLGtCQUFBO0VBQ0EsZUFBQTtBQ0NaIiwiZmlsZSI6InNyYy9hcHAvcGFnZXMvcmVnaXN0ZXIvcmVnaXN0ZXIuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIucmVnaXN0ZXItY29udGFpbmVye1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgLmNhcmR7XHJcbiAgICAgICAgLmNhcmQtaGVhZGVye1xyXG4gICAgICAgICAgICB3aWR0aDogODBweDtcclxuICAgICAgICAgICAgaGVpZ2h0OiA4MHB4O1xyXG4gICAgICAgICAgICBtYXJnaW46IDAgYXV0bztcclxuICAgICAgICAgICAgbWFyZ2luLXRvcDogLTQwcHg7XHJcbiAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcclxuICAgICAgICAgICAgZm9udC1zaXplOiAzNnB4O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsIi5yZWdpc3Rlci1jb250YWluZXIge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG59XG4ucmVnaXN0ZXItY29udGFpbmVyIC5jYXJkIC5jYXJkLWhlYWRlciB7XG4gIHdpZHRoOiA4MHB4O1xuICBoZWlnaHQ6IDgwcHg7XG4gIG1hcmdpbjogMCBhdXRvO1xuICBtYXJnaW4tdG9wOiAtNDBweDtcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xuICBmb250LXNpemU6IDM2cHg7XG59Il19 */");

/***/ }),

/***/ "./src/app/pages/register/register.component.ts":
/*!******************************************************!*\
  !*** ./src/app/pages/register/register.component.ts ***!
  \******************************************************/
/*! exports provided: RegisterComponent, emailValidator, matchingPasswords */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegisterComponent", function() { return RegisterComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "emailValidator", function() { return emailValidator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "matchingPasswords", function() { return matchingPasswords; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");




let RegisterComponent = class RegisterComponent {
    constructor(router, fb) {
        this.router = router;
        this.form = fb.group({
            name: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].minLength(3)])],
            email: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required, emailValidator])],
            password: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            confirmPassword: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]
        }, { validator: matchingPasswords('password', 'confirmPassword') });
        this.name = this.form.controls['name'];
        this.email = this.form.controls['email'];
        this.password = this.form.controls['password'];
        this.confirmPassword = this.form.controls['confirmPassword'];
    }
    onSubmit(values) {
        if (this.form.valid) {
            console.log(values);
            this.router.navigate(['/login']);
        }
    }
    ngAfterViewInit() {
        document.getElementById('preloader').classList.add('hide');
    }
};
RegisterComponent.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormBuilder"] }
];
RegisterComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-register',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./register.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/register/register.component.html")).default,
        encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewEncapsulation"].None,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./register.component.scss */ "./src/app/pages/register/register.component.scss")).default]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormBuilder"]])
], RegisterComponent);

function emailValidator(control) {
    var emailRegexp = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
    if (control.value && !emailRegexp.test(control.value)) {
        return { invalidEmail: true };
    }
}
function matchingPasswords(passwordKey, passwordConfirmationKey) {
    return (group) => {
        let password = group.controls[passwordKey];
        let passwordConfirmation = group.controls[passwordConfirmationKey];
        if (password.value !== passwordConfirmation.value) {
            return passwordConfirmation.setErrors({ mismatchedPasswords: true });
        }
    };
}


/***/ }),

/***/ "./src/app/pages/register/register.module.ts":
/*!***************************************************!*\
  !*** ./src/app/pages/register/register.module.ts ***!
  \***************************************************/
/*! exports provided: routes, RegisterModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "routes", function() { return routes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegisterModule", function() { return RegisterModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _register_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./register.component */ "./src/app/pages/register/register.component.ts");






const routes = [
    { path: '', component: _register_component__WEBPACK_IMPORTED_MODULE_5__["RegisterComponent"], pathMatch: 'full' }
];
let RegisterModule = class RegisterModule {
};
RegisterModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ReactiveFormsModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"].forChild(routes)
        ],
        declarations: [
            _register_component__WEBPACK_IMPORTED_MODULE_5__["RegisterComponent"]
        ]
    })
], RegisterModule);



/***/ })

}]);
//# sourceMappingURL=pages-register-register-module-es2015.js.map