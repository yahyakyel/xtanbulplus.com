function AdminIndex() {
    $.ajax({
        type: "POST",
        url: '/Home/TableControl',
        success: function (data) {
            debugger
            $('#AllAnnouncement').text(data['data']);
            $('#PrivateAnnouncement').text(data['data2']);
            $('#UserCount').text(data['data3']);//Danışman 
        },
        error: function (request, status, error) {
            swal.fire("Hata!", "Bir sorun ile karşılaşıldı!", "error");
        }
    });
};

