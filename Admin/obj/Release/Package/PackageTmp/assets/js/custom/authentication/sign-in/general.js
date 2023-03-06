"use strict"; var KTSigninGeneral = function () {
    var t, e, i; return {
        init: function () {
            t = document.querySelector("#kt_sign_in_form"), e = document.querySelector("#kt_sign_in_submit"), i = FormValidation.formValidation(t, { fields: { email: { validators: { notEmpty: { message: "Email adresi giriniz" }, emailAddress: { message: "Deger gecerli bir e-posta adresi degil" } } }, password: { validators: { notEmpty: { message: "Sifrenizi giriniz" } } } }, plugins: { trigger: new FormValidation.plugins.Trigger, bootstrap: new FormValidation.plugins.Bootstrap5({ rowSelector: ".fv-row" }) } }), e.addEventListener("click", (function (n) {
                n.preventDefault(), i.validate().then((function (i) {
                    debugger
                    var btn = e;
                    e.setAttribute("data-kt-indicator", "on");
                    var form = e.closest('form');
                    var Email = form.email.value;
                    var Password = form.password.value;
                    if (i != "Valid") {

                        Swal.fire({
                            text: "Emailinizde veya sifrenizde hata var, tekrar deneyin.",
                            icon: "error", buttonsStyling: !1, confirmButtonText: "Tamam, anladim!",
                            customClass: { confirmButton: "btn btn-primary" }
                        });
                        e.setAttribute("data-kt-indicator", "off");
                    }
                    else {
                        $.ajax({
                            url: '/Login/CheckLogin?Email=' + Email + "&Password=" + Password,
                            success: function (response, status, xhr, $form) {
                                debugger
                                var Control = response['Control'];
                                if (Control == "") {
                                    Swal.fire({
                                        text: "Emailinizde veya sifrenizde hata var, tekrar deneyin.",
                                        icon: "error", buttonsStyling: !1, confirmButtonText: "Tamam, anladim!",
                                        customClass: { confirmButton: "btn btn-primary" }
                                    });
                                    e.setAttribute("data-kt-indicator", "off");
                                }
                                else if (Control == "User") {
                                    window.location.href = "/Home/Index";
                                    e.setAttribute("data-kt-indicator", "off");
                                }
                                else if (Control == "Admin") {
                                    window.location.href = "/Home/Index";
                                    e.setAttribute("data-kt-indicator", "off");
                                }
                            }
                        })
                    }
                }))
            }))
        }
    }
}(); KTUtil.onDOMContentLoaded((function () { KTSigninGeneral.init() }));