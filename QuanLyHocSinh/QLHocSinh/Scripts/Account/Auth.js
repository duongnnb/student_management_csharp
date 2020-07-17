$(document).ready(function () {
    $('#username').change(function () {
        if (this.value != '') {
            $('#fmusername').removeClass('has-danger');
            $('#spusername').hide()
        }
    });

    $('#password').change(function () {
        if (this.value != '') {
            $('#fmpassword').removeClass('has-danger');
            $('#sppassword').hide()
        }
    });

    $('#fname').change(function () {
        if (this.value != '') {
            $('#fmfname').removeClass('has-danger');
            $('#spfname').hide()
        }
    });

    $('#fmfusername').change(function () {
        if (this.value != '') {
            $('#fmusername').removeClass('has-danger');
            $('#spusername').hide()
        }
    });
    $('#fmfpassword').change(function () {
        if (this.value != '') {
            $('#fmfpassword').removeClass('has-danger');
            $('#spfpassword').hide()
        }
    });
    $('#fmfcpassword').change(function () {
        if (this.value != '') {
            $('#fmfcpassword').removeClass('has-danger');
            $('#spfcpassword').hide()
        }
    });
    $('#fmfemail').change(function () {
        if (checkvalidEmail()) {
            $('#fmfemail').removeClass('has-danger');
            $('#spfemail').hide()
        }
    });

    $('#spusername').hide()
    $('#sppassword').hide()

    $('#spfname').hide()
    $('#spfusername').hide()
    $('#spfpassword').hide()
    $('#spfcpassword').hide()
    $('#spfemail').hide()

    $('form#loginform').submit(function () {
        if (!checkValidForm())
            return false;
    });

    $('form#registerform').submit(function () {
        if (!checkValidFormReg())
            return false;
    });
})
function checkvalidEmail() {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    return regex.test($("#femail").val());
}
function checkValidForm() {
    var username = $('#username').val();
    var password = $('#password').val();
    var i = 0;
    if (username == "") {
        $('#fmusername').addClass('has-danger');
        $('#spusername').show()
        i++;
    }
    else {
        $('#fmusername').removeClass('has-danger');
        $('#spusername').hide()
    }
    if (password == "") {
        $('#fmpassword').addClass('has-danger');
        $('#sppassword').show()
        i++;
    }
    else {
        $('#fmpassword').removeClass('has-danger');
        $('#sppassword').hide()
    }
    if (i != 0)
        return false;
    return true;

}
function checkValidFormReg() {

    var fname = $('#fname').val();
    var fusername = $('#fusername').val();
    var fpassword = $('#fpassword').val();
    var fcpassword = $('#fcpassword').val();
    var femail = $('#femail').val();
    var i = 0;
    if (fname == "") {
        $('#fmfname').addClass('has-danger');
        $('#spfname').show()
        i++;
    }
    else {
        $('#fmfname').removeClass('has-danger');
        $('#spfname').hide()
    }
    if (fusername == "") {
        $('#fmfusername').addClass('has-danger');
        $('#spfusername').show()
        i++;
    }
    else {
        $('#fmfusername').removeClass('has-danger');
        $('#spfusername').hide()
    }
    if (fpassword == "") {
        $('#fmfpassword').addClass('has-danger');
        $('#spfpassword').show()
        i++;
    }
    else {
        $('#fmfpassword').removeClass('has-danger');
        $('#spfpassword').hide()
    }
    if (fcpassword == "" || fpassword != fcpassword) {
        $('#fmfcpassword').addClass('has-danger');
        $('#spfcpassword').show()
        i++;
    }
    else {
        $('#fmfcpassword').removeClass('has-danger');
        $('#spfcpassword').hide()
    }
    if (!checkvalidEmail()) {
        $('#fmfemail').addClass('has-danger');
        $('#spfemail').show()
        i++;
    }
    else {
        $('#fmfemail').removeClass('has-danger');
        $('#spfemail').hide()
    }
    if (i != 0)
        return false;
    return true;
}