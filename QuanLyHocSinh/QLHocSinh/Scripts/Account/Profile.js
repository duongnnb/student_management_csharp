$(document).ready(function () {
    createControl();
    hideError();

    $('#fullName').change(function () {
        if (this.value != '') {
            $('#fmfullname').removeClass('has-danger row');
            $('#fmfullname').addClass('row');
            $('#spfullname').hide()
        }

    });

    $('#address').change(function () {
        if (this.value != '') {
            $('#fmaddress').removeClass('has-danger row');
            $('#fmaddress').addClass('row');
            $('#spaddress').hide();
        }
    });

    $('#birthDay').change(function () {
        if (checkvalidDate()) {
            $('#fmbirthday').removeClass('has-danger row');
            $('#fmbirthday').addClass('row');
            $('#spbirthday').hide()
        }
    });
    $('#note').change(function (e) {
        if (checkvalidPhone()) {
            $('#fmnote').removeClass('has-danger row');
            $('#fmnote').addClass('row');
            $('#spnote').hide()
        }
    });
    $('#email').change(function (e) {
        if (checkvalidPhone() || this.value == "") {
            $('#fmemail').removeClass('has-danger row');
            $('#fmemail').addClass('row');
            $('#spemail').hide()
        }
    });
    GetProfile();

    $('#password').change(function () {
        if (this.value != '') {
            $('#fmpassword').removeClass('has-danger row');
            $('#fmpassword').addClass('row');
            $('#sppassword').hide()
        }

    });
    $('#npassword').change(function () {
        if (this.value != '') {
            $('#fmnpassword').removeClass('has-danger row');
            $('#fmnpassword').addClass('row');
            $('#spnpassword').hide()
        }

    });
    $('#cpassword').change(function () {
        if (this.value != '') {
            $('#fmcpassword').removeClass('has-danger row');
            $('#fmcpassword').addClass('row');
            $('#spcpassword').hide()
        }

    });
});

function createControl() {
    $('#birthDay').datepicker({
        autoclose: true,
        todayHighlight: true,
        format: 'dd/mm/yyyy'
    });
    $('#birthDay').datepicker('update', new Date());


}

function checkvalidPhone() {
    var a = $('#note').val()
    var filter = /^((\+[1-9]{1,4}[ \-]*)|(\([0-9]{2,3}\)[ \-]*)|([0-9]{2,4})[ \-]*)*?[0-9]{3,4}?[ \-]*[0-9]{3,4}?$/;
    if (a == "")
        return true;

    if (filter.test(a) && a.length >= 10) {
        return true
    }
    else {
        return false
    }


}

function checkvalidDate() {
    var c = $('#birthDay').val().split('/');
    if (c[2] > 1900 && moment($('#birthDay').val().split('/'), ["MM-DD-YYYY", "DD-MM", "DD-MM-YYYY"]).isValid())
        return true;
    return false;
}

function checkvalidEmail() {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    return regex.test($("#email").val());
}

function UpdateProfile() {
    var sfullname = $("#fullName").val();
    var sbirthday = $("#birthDay").val();
    var c = sbirthday.split('/');
    sbirthday = c[1] + '/' + c[0] + '/' + c[2];
    var saddress = $("#address").val();
    var sgender = $("#gender").val();
    var semail = $("#email").val();
    var snote = $("#note").val();

    var i = 0;
    if (sfullname == "") {
        $('#fmfullname').removeClass('row');
        $('#fmfullname').addClass('has-danger row');
        $('#spfullname').show()
        i++;
    }
    else {
        $('#fmfullname').removeClass('has-danger row');
        $('#fmfullname').addClass('row');
        $('#spfullname').hide()

    }
    if (!checkvalidDate()) {
        $('#fmbirthday').removeClass('row');
        $('#fmbirthday').addClass('has-danger row');
        $('#spbirthday').show()
        i++;
    }
    else {
        $('#fmbirthday').removeClass('has-danger row');
        $('#fmbirthday').addClass('row');
        $('#spbirthday').hide()

    }
    if (saddress == "") {
        $('#fmaddress').removeClass('row');
        $('#fmaddress').addClass('has-danger row');
        $('#spaddress').show()
        i++;
    }
    else {
        $('#fmaddress').removeClass('has-danger row');
        $('#fmaddress').addClass('row');
        $('#spaddress').hide();

    }

    if (!checkvalidPhone()) {
        $('#fmnote').removeClass('row');
        $('#fmnote').addClass('has-danger row');
        $('#spnote').show()
        i++;
    }
    else {
        $('#fmnote').removeClass('has-danger row');
        $('#fmnote').addClass('row');
        $('#spnote').hide()
    }
    if (!checkvalidEmail() && semail != "") {
        $('#fmemail').removeClass('row');
        $('#fmemail').addClass('has-danger row');
        $('#spemail').show()
        i++;
    }
    else {
        $('#fmemail').removeClass('has-danger row');
        $('#fmemail').addClass('row');
        $('#spemail').hide()
    }



    if (i != 0) {
        return;
    }

    var user = {
        FullName: sfullname,
        birthday: sbirthday,
        gender: sgender,
        email: semail,
        phonenumber: snote,
        address: saddress
    };

    $.ajax({
        type: "POST",
        url: '/Account/UpdateProfile',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(user),
        dataType: "json",
        success: function (result) {
            if (result[0].value == 1) {
                swal("Cập nhật thành công", "success", "success");
                clearfilter();
            }
            else {
                swal("Cập nhật thất bại", result[0].message, "error");

            }
        },
        error: function (xhr, status, error) { alert('Có lỗi xảy ra!!'); }
    });
}


function hideError() {
    $('#spfullname').hide()
    $('#spbirthday').hide()
    $('#spaddress').hide()
    $('#spemail').hide()
    $('#spblock').hide()
    $('#spgrade').hide()
    $('#spnote').hide()

    $('#sppassword').hide()
    $('#spnpassword').hide()
    $('#spcpassword').hide()

    $("div.form-group").removeClass('has-error');
}

function GetProfile() {
    $.ajax({
        type: "GET",
        url: '/Account/GetProfile',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            $('#fullName').val(result.FullName);
            var date = new Date(parseInt(result.birthday.toString().substr(6)));
            var month = date.getMonth() + 1;
            $('#birthDay').val(date.getDate() + "/" + month + "/" + date.getFullYear());
            $("#address").val(result.address);
            $("#gender").val(result.gender);
            $("#email").val(result.email);
            $("#note").val(result.phonenumber);
        },
        error: function (xhr, status, error) {
            console.log("error GetProfile")
        }
    });
}

function ChangePass() {
    var spassword = $("#password").val();
    var snpassword = $("#npassword").val();
    var scpassword = $("#cpassword").val();

    var i = 0;
    if (spassword == "") {
        $('#fmpassword').removeClass('row');
        $('#fmpassword').addClass('has-danger row');
        $('#sppassword').show()
        i++;
    }
    else {
        $('#fmpassword').removeClass('has-danger row');
        $('#fmpassword').addClass('row');
        $('#sppassword').hide()

    }
    if (snpassword == "") {
        $('#fmnpassword').removeClass('row');
        $('#fmnpassword').addClass('has-danger row');
        $('#spnpassword').show()
        i++;
    }
    else {
        $('#fmnpassword').removeClass('has-danger row');
        $('#fmnpassword').addClass('row');
        $('#spnpassword').hide()

    }
    if (scpassword == "" || scpassword != snpassword) {
        $('#fmcpassword').removeClass('row');
        $('#fmcpassword').addClass('has-danger row');
        $('#spcpassword').show()
        i++;
    }
    else {
        $('#fmcpassword').removeClass('has-danger row');
        $('#fmcpassword').addClass('row');
        $('#spcpassword').hide();

    }

    if (i != 0) {
        return;
    }

    $.ajax({
        type: "GET",
        url: '/Account/UpdateProfile',
        contentType: "application/json; charset=utf-8",
        data: { password: spassword, npassword: snpassword },
        dataType: "json",
        success: function (result) {
            if (result[0].value == 1) {
                swal("Thay đổi mật khẩu thành công", "success", "success");
                clearfilter();
            }
            else {
                swal("Thay đổi mật khẩu thất bại", result[0].message, "error");

            }
        },
        error: function (xhr, status, error) { alert('Có lỗi xảy ra!!'); }
    });
}