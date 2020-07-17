$(document).ready(function () {
    createControl();
    hideError();
    createclasslist();
    //HideModify();
});
function createControl() {
   
    initSP();
    var t = $('#classtable').DataTable({
        "paging": true,
        //"ordering": false,
        "info": false,
        "searching": false,
        //data: data,
        destroy: true,
        retrieve: true,
        buttons: [
            'copy', 'excel', 'pdf'
        ],
        "language": {
            //"url": "//cdn.datatables.net/plug-ins/1.10.19/i18n/Vietnamese.json",
            "decimal": "",
            "emptyTable": "Không có dữ liệu",
            "info": "Showing _START_ to _END_ of _TOTAL_ entries",
            "infoEmpty": "Showing 0 to 0 of 0 entries",
            "infoFiltered": "(filtered from _MAX_ total entries)",
            "infoPostFix": "",
            "thousands": ",",
            "lengthMenu": "Hiển thị  _MENU_  dòng",
            "loadingRecords": "Loading...",
            "processing": "Processing...",
            "search": "Tìm nè:",
            "zeroRecords": "No matching records found",
            "paginate": {
                "first": "Đầu",
                "last": "Cuối",
                "next": "Sau",
                "previous": "Trước"
            },
            "aria": {
                "sortAscending": ": activate to sort column ascending",
                "sortDescending": ": activate to sort column descending"
            }
        },
        columns: [
                //{ 'data': 'STT' },
                {
                    "data": "id",
                    render: function (data, type, row, meta) {
                        return meta.row + meta.settings._iDisplayStart + 1;
                    }
                },
                { 'data': 'StudentID', "visible": false },
                {
                    'data': 'FullName', "width": "20%",
                    "render": function (data, type, row) {
                        return '<a href= "/Students/ViewDetail?ID=' + row.StudentID + '">' + row.FullName + '</a>';
                    }
                },
                 {
                     'data': 'Gender', "width": "15%"
                     , 'render': function (g) {
                         if (g == 1)
                             return 'Nam';
                         else
                             return 'Nữ';

                     }
                 },
                {
                    'data': 'BirthDay', 'render': function (date) {
                        var date = new Date(parseInt(date.substr(6)));
                        var month = date.getMonth() + 1;
                        return date.getDate() + "/" + month + "/" + date.getFullYear();
                    }
                },
                { 'data': 'Email', "visible": false },
                { 'data': 'PhoneNumber', "visible": false },
                { 'data': 'Address', "width": "20%", },
                 {
                     "render": function (data, type, row) {
                         return '<button type="button" data-toggle="modal" data-target="#exampleModal" onclick="edit(' + "'" + row.StudentID + "'" + ',' + "'" + row.FullName + "'" + ',' + row.Gender + ',' + row.BirthDay + ',' + "'" + row.Address + "'" + ')" class="btn btn-warning waves-effect waves-light"><i class="fa fa-pencil-square-o" ></i></button>' +
                             '<button onclick="DeleteStudent(' + "'" + row.StudentID + "'" + ')" style="margin-left: 5px;" type="button" class="btn btn-danger waves-effect waves-light"><i class="fa fa-times" aria-hidden="true"></i></button>';
                     }
                 }
        ]
    });

    t.on('order.dt search.dt', function () {
        t.column(0, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
            cell.innerHTML = i + 1;
        });
    }).draw();

}
function createclasslist() {
    var t = $('#listclass').DataTable({
        "paging": true,
        //"ordering": false,
        "info": false,
        "searching": false,
        //data: data,
        destroy: true,
        retrieve: true,
        buttons: [
            'copy', 'excel', 'pdf'
        ],
        "language": {
            //"url": "//cdn.datatables.net/plug-ins/1.10.19/i18n/Vietnamese.json",
            "decimal": "",
            "emptyTable": "Không có dữ liệu",
            "info": "Showing _START_ to _END_ of _TOTAL_ entries",
            "infoEmpty": "Showing 0 to 0 of 0 entries",
            "infoFiltered": "(filtered from _MAX_ total entries)",
            "infoPostFix": "",
            "thousands": ",",
            "lengthMenu": "Hiển thị  _MENU_  dòng",
            "loadingRecords": "Loading...",
            "processing": "Processing...",
            "search": "Tìm nè:",
            "zeroRecords": "No matching records found",
            "paginate": {
                "first": "Đầu",
                "last": "Cuối",
                "next": "Sau",
                "previous": "Trước"
            },
            "aria": {
                "sortAscending": ": activate to sort column ascending",
                "sortDescending": ": activate to sort column descending"
            }
        },
        columns: [
                //{ 'data': 'STT' },
                {
                    "data": "id",
                    render: function (data, type, row, meta) {
                        return meta.row + meta.settings._iDisplayStart + 1;
                    }
                },
                { 'data': 'ClassID' },
                { 'data': 'ClassName' },
                { 'data': 'ClassLevelName' },
                { 'data': 'Total' },
                { 'data': 'MaxTotal' },

                 {
                     "render": function (data, type, row) {

                         return ''//'<button type="button" data-toggle="modal" data-target="#exampleModal" onclick="editclass(' + "'" + row.ClassID + "'" + ',' + "'" + row.ClassName + "'" + ',' + "'" + row.ClassLevel + "'" + ',' + "'" + row.ClassLevelName + "'" + ')" class="btn btn-warning waves-effect waves-light"><i class="fa fa-pencil-square-o" ></i></button>';
                     }
                 }
        ]
    });
    // +'<button onclick="DeleteClass(' + "'" + row.ClassID + "'" + ')" style="margin-left: 5px;" type="button" class="btn btn-danger waves-effect waves-light"><i class="fa fa-times" aria-hidden="true"></i></button>'
    t.on('order.dt search.dt', function () {
        t.column(0, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
            cell.innerHTML = i + 1;
        });
    }).draw();
    LoadListClass();
}

function initSP() {


}
function updateinfoclass()
{
    var IDClass = $('#hidClassID').val();
    var cla = classes = {
        ID: IDClass,
        ClassName: $('#ClassName').val(),
        ClassLevel: $('#block3').val()
    };
    $.ajax({
        type: "POST",
        url: '/Classes/UpdateClass',
        contentType: "application/json; charset=utf-8",
        data: cla,
        dataType: "json",
        success: function (result) {
            if (result[0].value == 1) {
                swal("Cập nhật công", "success", "success");
                LoadListClass();
            }
            else {
                swal("Cập nhật thất bại", result[0].message, "error");
                //clearfilter();
            }
        },
        error: function (xhr, status, error) { alert('Có lỗi xảy ra!!'); }
    });
    
}
function DeleteClass(Id)
{

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
                    ViewListStudent();
                }
            }
        });
    });
}
function btnclose() {
    $("#exampleModal").modal("hide")
    hideError()
}
function closeAddClass() {
    $("#ModelAddClass").modal("hide")
    clearfilter()
    hideError()
}
function closeModifyStudent() {
    $("#exampleModal").modal("hide")
    hideError()
}
function hideError() {
    $('#spsubjectname').hide()
    $('#spsubjectperiod').hide()
    $('#spsubjecttype').hide()
    $('#spclassname').hide()

    $('#spfullname').hide()
    $('#spbirthday').hide()
    $('#spaddress').hide()
    $('#spemail').hide()

    $("div.form-group").removeClass('has-danger row');
    //$('#fmemail').removeClass('has-danger row');
    $('div.form-group').addClass('row');
}
function clearfilter() {

    $("#classnameadd").val('');
}
function editclass(ClassID, ClassName, Classlevel, ClassLevelName)
{
    //$('#ClassID').val(ClassID);
    $('#hidClassID').val(0);
    $('#hidClassID').val(ClassID);
    $('#ClassName').val(ClassName);
    $('#block3').val(Classlevel);
    
}
function edit(fid, fname, fgender, fbirthday, faddress) {
    $('#fullName').val(fname);
    $('#address').val(faddress);

    var date = new Date(parseInt(fbirthday.toString().substr(6)));
    var month = date.getMonth() + 1;
    $('#birthDay').val(date.getDate() + "/" + month + "/" + date.getFullYear());


    $('#gender').val(fgender);
    $('#gender').selectpicker('refresh')

    $('#grade2').val($('#grade').val());
    $('#grade2').selectpicker('refresh')

    $('#sid').val(fid);

}

function ViewListStudent() {
    var gr = $('#grade').val();

    $.ajax({
        type: "GET",
        dataType: "json",
        url: "/Students/GetStudentsByClass",
        data: { grade: gr },
        success: function (data) {
            var dataTable = $('#classtable').DataTable();
            dataTable.clear().draw();
            dataTable.rows.add(data).draw();
        }
    });
}

function LoadListClass() {
    $.ajax({
        type: "GET",
        dataType: "json",
        url: "/Classes/GetListAllClass",
        success: function (data) {
            var dataTable = $('#listclass').DataTable();
            dataTable.clear().draw();
            dataTable.rows.add(data).draw();
        }
    });
}
//editclass
function HideModify() {
    if (permission != 1) {
        var table = $('#listclass').DataTable();
        table.columns([6]).visible(false);
    }
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
function updateinfo() {
    var sid = $('#sid').val();
    var sfullname = $("#fullName").val();
    var sbirthday = $("#birthDay").val();
    var c = sbirthday.split('/');
    sbirthday = c[1] + '/' + c[0] + '/' + c[2];
    var saddress = $("#address").val();
    var sgender = $("#gender").val();
    var semail = $("#email").val();

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

    if (i != 0) {
        //alert(i);
        return;
    }

    var a = $('#birthDay').val().split('/');
    var b = a[2] + '/' + a[1] + '/' + a[0];

    var s = studentdetail = {
        StudentID: $('#sid').val(),
        FullName: $('#fullName').val(),
        BirthDay: b,
        Gender: $('#gender').val(),
        //Email: semail,
        //PhoneNumber: snote,
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

function addclass() {
    var sclassname = $('#classnameadd').val();
    var i = 0;
    if (sclassname == "") {
        $('#fmclassname').removeClass('row');
        $('#fmclassname').addClass('has-danger row');
        $('#spclassname').show()
        i++;
    }
    else {
        $('#fmclassname').removeClass('has-danger row');
        $('#fmclassname').addClass('row');
        $('#spclassname').hide()

    }
    if (i != 0) {
        return;
    }

    var classn = {
        ClassName: sclassname,
        ClassLevel: $('#block2').val()
    }

    $.ajax({
        type: "POST",
        url: '/Classes/AddClass',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(classn),
        dataType: "json",
        success: function (result) {
            if (result[0].value == 1) {
                swal("Thêm thành công", "success", "success");
                $('#classnameadd').val('')
                loadclass();
                closeAddClass();
            }
            else {
                swal("Thêm thất bại", result[0].message, "error");
            }
        },
        error: function (xhr, status, error) { alert('Có lỗi xảy ra!!'); }
    });
}