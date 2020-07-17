$(document).ready(function () {
    createControl();
    hideError();
    
    loadClass();

    $('#fullName').change(function () {
        if(this.value!=''){
            $('#fmfullname').removeClass('has-danger row');
            $('#fmfullname').addClass('row');
            $('#spfullname').hide()
        }
           
    });
    
    $('#address').change(function () {
        if(this.value!=''){
            $('#fmaddress').removeClass('has-danger row');
            $('#fmaddress').addClass('row');
            $('#spaddress').hide();
        }
    });
    
    $('#birthDay').change(function () {
        if(checkvalidDate()){
            $('#fmbirthday').removeClass('has-danger row');
            $('#fmbirthday').addClass('row');
            $('#spbirthday').hide()
        }
    });
    $('#note').change(function(e){
        if(checkvalidPhone()){
            $('#fmnote').removeClass('has-danger row');
            $('#fmnote').addClass('row');
            $('#spnote').hide()
        }
    });
    $('#email').change(function(e){
        if(checkvalidPhone() || this.value == ""){
            $('#fmemail').removeClass('has-danger row');
            $('#fmemail').addClass('row');
            $('#spemail').hide()
        }
    });
    
});

function createControl() {
    $('#block').selectpicker(); 
    $('#grade').selectpicker();      
    $('#birthDay').datepicker({
        autoclose: true,
        todayHighlight: true,
        format: 'dd/mm/yyyy'
    });
    $('#birthDay').datepicker('update', new Date());
    $.ajax({
        type: "GET",
        url: '/Classes/getClassLevel',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async:false,
        success: function (data) {
            var jsonData = JSON.stringify(data);
            $.each(JSON.parse(jsonData), function (idx, obj) {
                $("#block").append('<option value="' + obj.value + '">' + obj.text + '</option>').selectpicker('refresh');
            });
        },
        error: function (xhr, status, error) {
            alert('err or seleccct 2222:');
        }
    });

    $('#block').on('change', function(e){
        // console.log(this.value);
        $.ajax({
            type: "GET",
            url: '/Classes/getClassByLevel',
            contentType: "application/json; charset=utf-8",
            data: { idLevel: this.value },
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
    });

}
$("#btnClearForm").click(function () {
    clearfilter();
});

function checkvalidPhone(){
    var a = $('#note').val()
    var filter = /^((\+[1-9]{1,4}[ \-]*)|(\([0-9]{2,3}\)[ \-]*)|([0-9]{2,4})[ \-]*)*?[0-9]{3,4}?[ \-]*[0-9]{3,4}?$/;
    if(a=="")
        return true;

    if (filter.test(a) && a.length>=10) {
        return true
    }
    else {
        return false
    }
    
   
}

function checkvalidDate(){
    var c = $('#birthDay').val().split('/');
    if(c[2]>1900 && moment($('#birthDay').val().split('/'), ["MM-DD-YYYY", "DD-MM", "DD-MM-YYYY"]).isValid())
        return true;
    return false;
}  

function checkvalidEmail() {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    return regex.test($("#email").val());
}

function clearfilter(){
    
    $("#fullName").val('');
    $('#birthDay').datepicker('update', new Date());
    $("#address").val('');
    $("#email").val('');
    $("#note").val('');
}

function loadClass() {
    var idLevel = $("#block").val();
    if (idLevel == null)
        return;
    $.ajax({
        type: "GET",
        url: '/Classes/getClassByLevel',
        contentType: "application/json; charset=utf-8",
        data: { idLevel: idLevel },
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
}

function addStudent() {
    var sfullname = $("#fullName").val();
    var sbirthday = $("#birthDay").val();
    var c = sbirthday.split('/');
    sbirthday =c[1]+'/'+c[0]+'/'+c[2];
    var saddress = $("#address").val();
    var sgender = $("#gender").val();
    var semail = $("#email").val();
    var snote = $("#note").val();

    var sblock = $("#block").val();
    var sgrade = $("#grade").val();
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
    if (sblock == ""||sblock == null) {
        $('#fmblock').removeClass('row');
        $('#fmblock').addClass('has-danger row');
        $('#spblock').show()
        i++;
    }
    else {
        $('#fmblock').removeClass('has-danger row');
        $('#fmblock').addClass('row');
        $('#spblock').hide()

    }
    if (sgrade == "" || sgrade == null) {
        $('#fmgrade').removeClass('row');
        $('#fmgrade').addClass('has-danger row');
        $('#spgrade').show()
        i++;
    }
    else {
        $('#fmgrade').removeClass('has-danger row');
        $('#fmgrade').addClass('row');
        $('#spgrade').hide()

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
    if (!checkvalidEmail() && semail!="") {
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

    var stu = studentdetail = {
        FullName: sfullname,
        BirthDay: sbirthday,
        Gender: sgender,
        Email: semail,
        PhoneNumber: snote,
        Address: saddress,
        ClassLevel: sblock,
        Class:sgrade
    }; 

    $.ajax({
        type: "POST",
        url: '/Students/AddNewStudent',
        contentType: "application/json; charset=utf-8",
        //data: stu,
        data: JSON.stringify(stu),
        dataType: "json",
        success: function (result)
        {
            if (result[0].value == 1){
                swal("Thêm thành công", "success", "success");
                clearfilter();
            }
            else{
                
                swal("Thêm thất bại",result[0].message, "error");
                //clearfilter();
            }
        },
        error: function (xhr, status, error) { alert('Có lỗi xảy ra!!'); }
    });
}
function load_table() {
    $(document).ready(function () {
        $.ajax({
            type: "GET",
            dataType: "json",
            url: "/Students/GetStudents",
            //url: "/GetStudents",
            success: function (data) {
                var datatableVariable = $('#studentTable').DataTable({
                    "paging": true,
                    "ordering": false,
                    "info": false,
                    "searching": true,
                    data: data,
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
                        "lengthMenu": "thể _MENU_ entries",
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
                        { 'data': 'STT' },
                        { 'data': 'StudentID' },
                        { 'data': 'FullName' },
                        {
                            'data': 'BirthDay', 'render': function (date) {
                                var date = new Date(parseInt(date.substr(6)));
                                var month = date.getMonth() + 1;
                                return date.getDate() + "/" + month + "/" + date.getFullYear();
                            }
                        },
                        { 'data': 'Gender' },
                        { 'data': 'Email' },
                        { 'data': 'PhoneNumber' },
                        { 'data': 'Address' },                        
                         {
                             "render": function (data, type, row) {
                                 return '<button type="button" onclick="edit(' + row.StudentID + ')" class="btn btn-danger waves-effect waves-light">Sửa</button>';
                             }
                         }
                    ]
                });
                $('#studentTable tfoot th').each(function () {
                    var placeHolderTitle = $('#studentTable thead th').eq($(this).index()).text();
                    $(this).html('<input type="text" class="form-control input input-sm" placeholder = "Tìm ' + placeHolderTitle + '" />');
                });
                datatableVariable.columns().every(function () {
                    var column = this;
                    $(this.footer()).find('input').on('keyup change', function () {
                        column.search(this.value).draw();
                    });
                });
                $('.showHide').on('click', function () {
                    var tableColumn = datatableVariable.column($(this).attr('data-columnindex'));
                    tableColumn.visible(!tableColumn.visible());
                });
            }
        });
    })
};
function hideError() {
    $('#spfullname').hide()
    $('#spbirthday').hide()
    $('#spaddress').hide()
    $('#spemail').hide()
    $('#spblock').hide()
    $('#spgrade').hide()
    $('#spnote').hide()
    
    $("div.form-group").removeClass('has-error');
}
function loadClassLevel() {
    $.ajax({
        type: "GET",
        url: '/Classes/getClassLevel',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $("#block").select2({
                data: data,
                minimumResultsForSearch: -1
            })
        },
        error: function (xhr, status, error) {
            alert('err or seleccct 2222:');
        }
    });
}
function loadClass2() {
    var idLevel = $("#block2").val();
    if (idLevel == null)
        idLevel = 1;
    $.ajax({
        type: "GET",
        url: '/Classes/getClassByLevel2',
        contentType: "application/json; charset=utf-8",
        data: { idLevel: idLevel },
        dataType: "json",
        success: function (data) {
            var ddl = $('#grade2').data("kendoDropDownList");
            ddl.setDataSource(data);
            ddl.refresh();
            ddl.select(0);
            ddl.trigger("change");
        },
        error: function (xhr, status, error) {
            alert('Error789:');
        }
    });
}
function setDataEdit(s) {
    $("#block").data("kendoDropDownList").select(function (dataItem) {
        return dataItem.value === s.ClassLevel;
    });
    loadClass();
    $("#fullName").val(s.FullName);
    $("#gender").val(s.Gender);
    $("#address").val(s.Address);
    $("#email").val(s.Email);

    var date = new Date(parseInt(s.BirthDay.substr(6)));
    var month = date.getMonth() + 1;
    var d= date.getDate() + "/" + month + "/" + date.getFullYear();

    $("#birthDay").val(d);
    $("#note").val(s.PhoneNumber);
    //$("#fullName").val(s.FullName);
    // $("#fullName").val(s.FullName);
    

    $("#gender").data("kendoDropDownList").select(function (dataItem) {
        return dataItem.value === `${s.Gender}`;
    });
    
    $("#grade").data("kendoDropDownList").select(function (dataItem) {
        return dataItem.value === s.Class;
    });

    $("#idstudent").val(s.StudentID);
    
}
function edit(id) {
    //alert("edit:_" + id);

    $.ajax({
        type: "GET",
        url: '/Students/getStudentByID',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: {id : id},
        success: function (data) {
            //alert('Success');
            setDataEdit(data[0]);
            $("#window").data("kendoWindow").center().open();

        },
        error: function (xhr, status, error) {
            alert('Error456:');
        }
    });


}

function HideModify() {
    if (permission != 1) {
        var table = $('#studentTable').DataTable();
        table.columns([9]).visible(false);
    }
}