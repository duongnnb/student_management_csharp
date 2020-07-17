$(document).ready(function () {
    
    getClassLevel();
});


function getClassLevel() {
    $('#ctest').selectpicker();
    $.ajax({
        type: "GET",
        url: '/Classes/getClassLevel',
        contentType: "application/json; charset=utf-8",
        //data: stu,
        dataType: "json",
        success: function (msg)
        {
            alert('Success');
            $.each(msg, function (idx, obj) {
                $("#ctest").append('<option value="' + obj.iD + '">' + obj.levelName + '</option>').selectpicker('refresh');
            });
        },
        error: function (xhr, status, error)
        {
            alert('Error:');
        }
    });
}