$(document).ready(function () {
    init();

});
function init() {
    $('#Year').selectpicker();
    $('#detailtable').DataTable({
        "paging": true,
        "ordering": false,
        "info": false,
        "searching": false,
        //data: data,
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
                {
                    'data': 'StudentID',
                    "render": function (data, type, row) {
                        return '<a href= "/Students/ViewDetail?ID=' + row.StudentID + '">' + row.StudentID + '</a>';
                    }
                },
                { 'data': 'FullName' },
                { 'data': 'ClassName' },
                { 'data': 'TBHK1',
                render: function (data, type, row, meta) {
                    if (row.TBHK1<5)
                        return "<span id='total' class='badge badge-danger'>" + row.TBHK1 + " </span>"
                    else
                        return "<span id='total' class='badge badge-success'>" + row.TBHK1 + " </span>"
                    } },
                {
                    'data': 'TBHK2',
                    render: function (data, type, row, meta) {
                        if (row.TBHK2 < 5)
                            return "<span id='total' class='badge badge-danger'>" + row.TBHK2 + " </span>"
                        else
                            return "<span id='total' class='badge badge-success'>" + row.TBHK2 + " </span>"
                    }
                },
        ]
    });
}
function ViewDetailStudent() {
    var year = $('#Year').val();
    $.ajax({
        type: "GET",
        dataType: "json",
        url: "/Classes/GetStudentDetail",
        data: { year: year, content: $('#txtIDName').val() },
        success: function (data) {
            var obj = JSON.parse(data);
            var dataTable = $('#detailtable').DataTable();
            dataTable.clear().draw();
            dataTable.rows.add(obj).draw();
        }
    });
};
