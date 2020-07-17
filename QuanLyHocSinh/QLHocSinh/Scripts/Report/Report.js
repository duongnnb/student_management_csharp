$(document).ready(function () {
    createControl();
});

function createControl() {
    $('#subject').selectpicker();
    $('#semester').selectpicker();
    $('#Year').selectpicker();
    
    $.ajax({
        type: "GET",
        url: '/Subjects/getListSubject',
        contentType: "application/json; charset=utf-8",
        data: { idLevel: '0' },
        dataType: "json",
        success: function (data) {
            $('#subject').find('option').remove().end();
            var jsonData = JSON.stringify(data);
            $.each(JSON.parse(jsonData), function (idx, obj) {
                $("#subject").append('<option value="' + obj.SubjectID + '">' + obj.SubjectName + '</option>').selectpicker('refresh');
            });
        },
        error: function (xhr, status, error) {
            alert('Error789:');
        }
    });

    $('#table-reportbysubject').DataTable({
        "paging": true,
        "ordering": false,
        "info": false,
        "searching": false,
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
               {
                   "data": "id",
                   render: function (data, type, row, meta) {
                       return meta.row + meta.settings._iDisplayStart + 1;
                   }
               },
                { 'data': 'ClassName' },
                { 'data': 'SiSo' },
                { 'data': 'SlOk' },
                { 'data': 'scale' },

        ]
    });

}

function ViewReportBySubject() {
    $.ajax({
        type: "GET",
        dataType: "json",
        data: {
            semester: $('#semester').val(),
            subjectid: $('#subject').val(),
            Year: $('#Year').val()
        },
        url: "/Report/GetReportBySubject",
        success: function (data) {
            var obj = JSON.parse(data);
            var dataTable = $('#table-reportbysubject').DataTable();
            dataTable.clear().draw();
            dataTable.rows.add(obj).draw();
        }
    });
}


function ViewReportBySemester() {
    $.ajax({
        type: "GET",
        dataType: "json",
        data: {
            semester: $('#semester').val(),
            Year: $('#Year').val()
        },
        url: "/Report/GetReportBySemester",
        success: function (data) {
            var obj = JSON.parse(data);
            var dataTable = $('#table-reportbysubject').DataTable();
            dataTable.clear().draw();
            dataTable.rows.add(obj).draw();
        }
    });
}

