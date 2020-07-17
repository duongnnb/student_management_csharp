$(document).ready(function () {
    $('#datasubject').DataTable({
        "paging": false,
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
                    "data": "id",//,"width": "20%",
                    render: function (data, type, row, meta) {
                        return meta.row + meta.settings._iDisplayStart + 1;
                    }
                },
                { 'data': 'Semester', "width": "15%" },
                { 'data': 'SubjectName', "width": "25%" },
                {
                    'data': 'Test15Minutes', "width": "15%",
                    render: function (data, type, row, meta) {
                        if (row.Test15Minutes < 5)
                            return "<span id='total' class='badge badge-danger'>" + row.Test15Minutes + " </span>"
                        else
                            return "<span id='total' class='badge badge-success'>" + row.Test15Minutes + " </span>"
                    }
                },
                {
                    'data': 'Test45Minutes',"width": "15%",
                    render: function (data, type, row, meta) {
                        if (row.Test45Minutes < 5)
                            return "<span id='total' class='badge badge-danger'>" + row.Test45Minutes + " </span>"
                        else
                            return "<span id='total' class='badge badge-success'>" + row.Test45Minutes + " </span>"
                    }
                },
                {
                    'data': 'TestSemester',"width": "15%",
                    render: function (data, type, row, meta) {
                        if (row.Test45Minutes < 5)
                            return "<span id='total' class='badge badge-danger'>" + row.Test45Minutes + " </span>"
                        else
                            return "<span id='total' class='badge badge-success'>" + row.Test45Minutes + " </span>"
                    }
                }
                ,{
                    'data': 'Average', "width": "15%",
                    render: function (data, type, row, meta) {
                        if (row.Average < 5)
                            return "<span id='total' class='badge badge-danger'>" + row.Average + " </span>"
                        else
                            return "<span id='total' class='badge badge-success'>" + row.Average + " </span>"
                    }
                }
        ]
    });
    loadpanel();
    loadInfo();
    loadScore();
});
function loadInfo() {
    $.ajax({
        type: "GET",
        dataType: "json",
        url: "/Students/getStudentByID",
        data: { id: $('#studentid').val() },
        success: function (dataAll) {
            var data = dataAll.s
            $('#fstudent').html(data.StudentID)
            $('#fname').html(data.FullName)

            var date = new Date(parseInt(data.BirthDay.toString().substr(6)));
            var month = date.getMonth() + 1;
            date= date.getDate() + "/" + month + "/" + date.getFullYear();
            $('#fbirthday').html(date)

            if (data.Gender == 1)
                $('#fgender').html("Nam")
            else
                $('#fgender').html("Nữ")

            $('#femail').html(data.Email)
            $('#fphonenumber').html(data.PhoneNumber)
            $('#faddress').html(data.Address)
            if (data.State==-1){
                $('#fstate').html("Đã nghỉ")
                $('#fstate').addClass('badge badge-danger')
            }
            else{
                $('#fstate').html("Đang học")
                $('#fstate').addClass('badge badge-success')
            }
            
            $('#classname').html("Lớp:" + dataAll.c.ClassName)
           
        },
        error: function (data) {

            alert(321);
        }
    });
}

function loadScore() {
    $.ajax({
        type: "GET",
        dataType: "json",
        url: "/Students/GetListPoint",
        data: { id: $('#studentid').val() },
        success: function (data) {
            
            var dataTable = $('#datasubject').DataTable();
            dataTable.clear().draw();
            dataTable.rows.add(data).draw();
        }
    });
}
function loadpanel()
{
    $.ajax({
        type: "GET",
        dataType: "json",
        url: "/Students/GetPointTB",
        data: { StudentID: $('#studentid').val() },
        success: function (data) {
            var vdata = (data == [] || !data) ? [] : JSON.parse(data);
            if (!!vdata && vdata != [])
            {
                $('#HK1').html(vdata[0].TB1);
                $('#HK2').html(vdata[0].TB2);
                $('#HK').html(vdata[0].TB);
            }
        },

    });
}