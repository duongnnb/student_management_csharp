$(document).ready(function () {
    createControl();
    loadAutocomplete();
})
function createControl() {
    $('#semester').selectpicker();
    $('#Year').selectpicker();
    
    $('#student').DataTable({
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
                { 'data': 'StudentID', "visible": false },
                { 'data': 'FullName', "width": "20%", "visible": false },
                { 'data': 'SubjectName' },
                { 'data': 'Test15Minutes' },
                { 'data': 'Test45Minutes' },
                { 'data': 'TestSemester' },
                { 'data': 'Average' },
        ]
    });

}
function ViewDetail() {
    var id = $('#txtIDName').val();
    var sr = $('#semester').val();
    var year = $('#Year').val();
    $.ajax({
        type: "GET",
        dataType: "json",
        url: "/Classes/GetStudentPointDetail",
        data: { ID: id, semester: sr, year: year },
        success: function (data) {
            var obj = JSON.parse(data);
            var dataTable = $('#student').DataTable();
            dataTable.clear().draw();
            dataTable.rows.add(obj).draw();
        }
    });
}
function loadAutocomplete() {
    var options = {
        //data: [
        //    { "FullName": "Cyclops", "StudentID": "Scott Summers" },
        //    { "FullName": "Professor X", "StudentID": "Charles Francis Xavier" },
        //    { "FullName": "Mystique", "StudentID": "Raven Darkholme" },
        //    { "FullName": "Magneto", "StudentID": "Max Eisenhardt" }
        //],
        url: "GetAllStudent",
        getValue: "FullName",
        list: {
            onSelectItemEvent: function () {
                var value = $("#IDShow").getSelectedItemData().StudentID;
                $("#txtIDName").val(value).trigger("change");
            },
            match: {
                enabled: true
            }
        }
    };
    $("#IDShow").easyAutocomplete(options);
}