$(document).ready(function () {
    createcontrol()
    init();
    loadtable();
    HideModify()
    initSP()
});
function initSP() {

    $.ajax({
        type: "GET",
        url: '/Classes/getClassByLevel',
        async: false,
        contentType: "application/json; charset=utf-8",
        data: { idLevel: $('#block').val() },
        dataType: "json",
        success: function (data) {
            $('#grade').find('option').remove().end();
            var jsonData = JSON.stringify(data);
            $.each(JSON.parse(jsonData), function (idx, obj) {
                $("#grade").append('<option value="' + obj.value + '">' + obj.text + '</option>').selectpicker('refresh');
            });
        },
        error: function (xhr, status, error) {
            alert('Error789:');
        }
    });
   loadtotal();

}
function createcontrol() {
    $('#block').selectpicker();
    $('#grade').selectpicker();
    $.ajax({
        type: "GET",
        url: '/Classes/getClassLevel',
        contentType: "application/json; charset=utf-8",
        async: false,
        dataType: "json",
        success: function (data) {
            var jsonData = JSON.stringify(data);
            $.each(JSON.parse(jsonData), function (idx, obj) {
                $("#block").append('<option value="' + obj.value + '">' + obj.text + '</option>').selectpicker('refresh');
            });
        },
        error: function (xhr, status, error) {
            //alert('err or seleccct 2222:');
        }
    });
    $('#block').on('change', function (e) {
        // console.log(this.value);
        $.ajax({
            type: "GET",
            url: '/Classes/getClassByLevel',
            async: false,
            contentType: "application/json; charset=utf-8",
            data: { idLevel: this.value },
            dataType: "json",
            success: function (data) {
                $('#grade').find('option').remove().end();
                var jsonData = JSON.stringify(data);
                $.each(JSON.parse(jsonData), function (idx, obj) {
                    $("#grade").append('<option value="' + obj.value + '">' + obj.text + '</option>').selectpicker('refresh');
                });
                loadtotal();
            },
            error: function (xhr, status, error) {
                //alert('Error789:');
            }
        });
    });

    $('#grade').on('change', function (e) {
        // console.log(this.value);
        $.ajax({
            type: "GET",
            url: '/Classes/getTotalInClass',
            async: false,
            contentType: "application/json; charset=utf-8",
            data: { ID: this.value },
            dataType: "json",
            success: function (data) {
                $('#total').html(data.Total + '/' + data.MaxTotal)
            },
            error: function (xhr, status, error) {
                //alert('Error789:');
            }
        });
    });

}
function HideModify() {
    var a = GetPermission();
    if (permission!=1) {
        var table = $('#liststudent').DataTable();
        table.columns([10]).visible(false);
    }
}
function init() {
    hideError();
    $('#liststudent').DataTable({
        "paging": true,
        "ordering": false,
        "info": false,
        "searching": true,
        //data: data,
        //"scrollX": true,
        //"sScrollX": '110%',
        "sScrollX": '100%',
        destroy: true,
        retrieve: true,
        buttons: [
            'copy', 'excel', 'pdf'
        ],
        "language": {
            "decimal": "",
            "emptyTable": "No data available in table",
            "info": "Showing _START_ to _END_ of _TOTAL_ entries",
            "infoEmpty": "Showing 0 to 0 of 0 entries",
            "infoFiltered": "(filtered from _MAX_ total entries)",
            "infoPostFix": "",
            "thousands": ",",
            "lengthMenu": "Hiển thị  _MENU_  dòng",
            "loadingRecords": "Loading...",
            "processing": "Processing...",
            "search": "Tìm :",
            "zeroRecords": "No matching records found",
            "paginate": {
                "first": "Đầu",
                "last": "Cuối",
                "next": "Sau",
                "previous": "Trước"
            },
            "emptyTable": "Không có dữ liệu",
            "aria": {
                "sortAscending": ": activate to sort column ascending",
                "sortDescending": ": activate to sort column descending"
            }
        },
        columns: [
                 {
                     "data": "id",
                     render: function (data, type, row, meta) {
                         return meta.row + meta.settings._iDisplayStart + 1;
                     }
                 },
                {
                    'data': 'StudentID',
                    "render": function (data, type, row) {
                        return '<a href= "/Students/ViewDetail?ID=' + row.StudentID + '">' + row.StudentID + '</a>';
                    }
                },
                {
                    'data': 'FullName'
                },
                { 'data': 'Class', "visible": false },

                { 'data': 'ClassName' },
                {
                    'data': 'BirthDay', 'render': function (date) {
                        var date = new Date(parseInt(date.toString().substr(6)));
                        var month = date.getMonth() + 1;
                        return date.getDate() + "/" + month + "/" + date.getFullYear();
                    }
                },
                {
                    'data': 'Gender', 'render': function (g) {
                        if (g == 1)
                            return 'Nam';
                        else
                            return 'Nữ';

                    }
                },
                { 'data': 'Email' },
                { 'data': 'PhoneNumber' },
                { 'data': 'Address' },
                 {
                     "render": function (data, type, row) {
                         return '<button type="button" data-toggle="modal" data-target="#exampleModal" onclick="edit(' + "'" + row.StudentID + "'" + ',' + "'" + row.FullName + "'" + ',' + row.Gender + ',' + row.BirthDay + ',' + "'" + row.Address + "','" + row.Email + "','" + row.PhoneNumber + "'," + row.Class + ')" class="btn btn-warning waves-effect waves-light"><i class="fa fa-pencil-square-o" ></i></button>' +
                             '<button onclick="DeleteStudent(' + "'" + row.StudentID + "'" + ')" style="margin-left: 5px;" type="button" class="btn btn-danger waves-effect waves-light"><i class="fa fa-times" aria-hidden="true"></i></button>';
                     }
                 }
        ]
    });
}
function loadtotal() {
    $.ajax({
        type: "GET",
        url: '/Classes/getTotalInClass',
        async: false,
        contentType: "application/json; charset=utf-8",
        data: { ID: $('#grade').val() },
        dataType: "json",
        success: function (data) {
            $('#total').html(data.Total + '/' + data.MaxTotal)
        },
        error: function (xhr, status, error) {
            alert('Error789:');
        }
    });
}
function loadtable() {
    $.ajax({
        type: "GET",
        dataType: "json",
        url: "/Students/GetListStudent",
        success: function (data) {
            var dataTable = $('#liststudent').DataTable();
            dataTable.clear().draw();
            dataTable.rows.add(data).draw();
        }
    });
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
//function hideError() {
//    $('#spfullname').hide()
//    $('#spbirthday').hide()
//    $('#spaddress').hide()
//    $('#spemail').hide()
//    $('#spgrade').hide()
//    $('#spnote').hide()

//    $("div.form-group").removeClass('has-error');
//}
function btnclose() {
    $("#exampleModal").modal("hide")
    hideError()
}
function edit(fid, fname, fgender, fbirthday, faddress, femail, fphonenumber, fclass) {

    $('#sid').val(fid);
    $('#fullName').val(fname);
    $('#address').val(faddress);

    var date = new Date(parseInt(fbirthday.toString().substr(6)));
    var month = date.getMonth() + 1;
    $('#birthDay').val(date.getDate() + "/" + month + "/" + date.getFullYear());


    $('#gender').val(fgender);
    $('#gender').selectpicker('refresh')

    $('#grade2').val(fclass);
    $('#grade2').selectpicker('refresh')

    $('#email').val(femail);
    $('#phonenumber').val(fphonenumber);
}
function hideError() {
    $('#spfullname').hide()
    $('#spbirthday').hide()
    $('#spaddress').hide()
    $('#spemail').hide()
    $('#spblock').hide()
    $('#spgrade').hide()
    $('#spnote').hide()

    $("#email").val('');
    $("#note").val('');

    $("div.form-group").removeClass('has-danger row');
    $('div.form-group').addClass('row');
}
function clearfilter() {

    $("#fullName").val('');
    $('#birthDay').datepicker('update', new Date());
    $("#address").val('');
    $("#email").val('');
    $("#note").val('');
}
function updateinfo() {
    var a = $('#birthDay').val().split('/');
    var b = a[2] + '/' + a[1] + '/' + a[0];

    var sid = $('#sid').val();
    var sfullname = $("#fullName").val();
    var sbirthday = $("#birthDay").val();
    var c = sbirthday.split('/');
    sbirthday = c[1] + '/' + c[0] + '/' + c[2];
    var saddress = $("#address").val();
    var sgender = $("#gender").val();
    var semail = $("#email").val();
    var sphonenumber = $("#note").val();
    var sclass = $("#grade2").val();

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
        //alert(i);
        return;
    }




    var s = {
        StudentID: $('#sid').val(),
        FullName: $('#fullName').val(),
        BirthDay: b,
        Gender: $('#gender').val(),
        Email: $('#email').val(),
        PhoneNumber: $('#phonenumber').val(),
        Address: $('#address').val(),
        Class: $('#grade2').val()
    };


    $.ajax({
        type: "POST",
        url: '/Students/UpdateInfoStudent',
        contentType: "application/json; charset=utf-8",
        //data: stu,
        data: JSON.stringify(s),
        dataType: "json",
        success: function (result) {
            if (result[0].value == 1) {
                swal("Cập nhật thành công", "success", "success");
                loadtable();
            } else {

                swal("Cập nhật thất bại", result[0].message, "error");
            }
            btnclose();
        }
    });

}

function DeleteStudent(id) {
    swal({
        title: "Xác nhận xóa học sinh này?",
        //text: "You will not be able to recover this imaginary file!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Đồng ý",
        cancelButtonText: "Hủy",
        closeOnConfirm: false
    }, function () {
        //var form = new FormData();
        //form.append("id", id);
        $.ajax({
            type: "GET",
            url: '/Students/DeleteStudent',
            contentType: "application/json; charset=utf-8",
            //data: stu,
            data: { id: id },
            dataType: "json",
            success: function (result) {
                if (result[0].value == 1) {
                    swal("Thành công!", "", "success");
                    loadtable();
                }
            }
        });
    });
}

function ViewListStudent() {
    var gr = $('#grade').val();
    $.ajax({
        type: "GET",
        dataType: "json",
        url: "/Students/GetStudentsByClass",
        data: { grade: gr },
        success: function (data) {
            var dataTable = $('#liststudent').DataTable();
            dataTable.clear().draw();
            dataTable.rows.add(data).draw();
        }
    });
}