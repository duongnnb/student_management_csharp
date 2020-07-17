$(document).ready(function () {    
    $('#blockadd').selectpicker();
    init();
    
 
    load_table()
});
function init() {
    $('#listclass').DataTable({
        "paging": false,
        "ordering": false,
        "info": false,
        "searching": false,
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
            { 'data': 'ID' },
            { 'data': 'ClassName' },
            { 'data': 'Level' },
            { 'data': 'Total' },
            { 'data': 'MaxTotal' },
           {
               "render": function (data, type, row) {
                   return '<button type="button" onclick="edit(' + "'" + row.ID + "','" + row.ClassName + "'," + row.MaxTotal + ')" data-toggle="modal" data-target="#exampleModal" class="btn btn-warning waves-effect waves-light"><i class="fa fa-pencil" aria-hidden="true"></i></button>';
               }
           }
        ]
    });
    
    $.ajax({
        type: "GET",
        url: '/Classes/getClassLevel',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (data) {
            var jsonData = JSON.stringify(data);
            $.each(JSON.parse(jsonData), function (idx, obj) {
                $("#blockadd").append('<option value="' + obj.value + '">' + obj.text + '</option>').selectpicker('refresh');
            });
        },
        error: function (xhr, status, error) {
            alert('err or seleccct 2222:');
        }
    });
}
function load_table() {
    $.ajax({
        type: "GET",
        dataType: "json",
        url: "/Classes/GetListClass",
        success: function (data) {
            var dataTable = $('#listclass').DataTable();
            dataTable.clear().draw();
            dataTable.rows.add(data).draw();
        }
    });

};
function clearmodal() {
    $('#classnameadd').val('')
    $('#blockadd').val('')
    $('#maxtotaladd').val('')
}
function edit(id,name,max) {
    $('#classid').val(id)
    $('#classname').val(name)
    $('#maxtotal').val(max)  
}
function updateclass() {
    var c = {
        ID: $('#classid').val(),
        ClassName: $('#classname').val(),
        MaxTotal: $('#maxtotal').val(),
    }

    $.ajax({
        type: "POST",
        url: '/Classes/UpdateClass',
        contentType: "application/json; charset=utf-8",
        //data: stu,
        data: JSON.stringify(c),
        dataType: "json",
        success: function (result) {
            if (result[0].value == 1) {
                swal("Cập nhật thành công", "success", "success");
                load_table();
            }
        },
        error: function (xhr, status, error) { alert('Có lỗi xảy ra!!'); }
    });
}
function addclass() {
    var c = {
        ClassName: $('#classnameadd').val(),
        ClassLevel: $('#blockadd').val(),
        MaxTotal: $('#maxtotaladd').val(),
    }

    $.ajax({
        type: "POST",
        url: '/Classes/AddClass',
        contentType: "application/json; charset=utf-8",
        //data: stu,
        data: JSON.stringify(c),
        dataType: "json",
        success: function (result) {
            if (result[0].value == 1) {
                swal("Thêm thành công", "success", "success");
                load_table();
                clearmodal();
            }
        },
        error: function (xhr, status, error) { alert('Có lỗi xảy ra!!'); }
    });
}