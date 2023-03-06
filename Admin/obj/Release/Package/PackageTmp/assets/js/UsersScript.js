function GetUsersAdmin() {
    debugger
    var UserType = $('#UserType').val();
    var visiblity = false;
    if (UserType == 2) {
        visiblity = true;
    }
    var table = $('#kt_table_UserList');
    var t = table.DataTable({
        ajax: {
            url: '/Users/GetUsers',
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            dataType: "json",
            data: {
                pagination: {
                    perpage: 50,
                },
            },
        },
        "pageLength": 50,
        'stripeClasses': ['stripe1', 'stripe2'],
        dom: `<'row'<'col-sm-3 text-left'f><'col-sm-9 text-right'B>>
			<'row'<'col-sm-12'tr>>
			<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7 dataTables_pager'lp>>`,


        columns: [
            {
                data: 'SN',
                searchable: false,
                orderable: false,
                width: '4%',
                className: 'dt-center ml-3',
            },
            {
                data: 'Image',
                className: 'font-weight-bold ',
            },
            {
                data: 'FirstName',
                className: 'font-weight-bold ',
            },
            {
                data: 'LastName',
                className: 'font-weight-bold ',
            },
            {
                data: 'Phone',
                className: 'font-weight-bold ',
            },
            {
                data: 'Email',
                className: 'font-weight-bold ',
            },
            {
                data: 'Password',
                className: 'font-weight-bold ',
            },
            {
                data: 'Title',
                className: 'font-weight-bold ',
            },
            {
                data: 'İşlemler',
                "visible": visiblity
            },
        ],

        columnDefs: [
            {
                targets: 0,
                render: function (data, type, full, meta) {
                    result = ``;
                    return result;
                }
            },
            {
                targets: 1,
                render: function (data, type, full, meta) {
                    debugger
                    var result = `<img src="`+"https://admin.xtanbulplus.com/" + full['Image'] + `" width="auto;" height="70" >`;
                    return result;
                }
            },
            {
                targets: 2,
                render: function (data, type, full, meta) {
                    debugger
                    var result = full['FirstName'];
                    return result;
                }
            },
            {
                targets: 3,
                render: function (data, type, full, meta) {
                    debugger
                    var result = full['LastName'];
                    return result;
                }
            },
            {
                targets: 4,
                render: function (data, type, full, meta) {
                    debugger
                    var result = full['Phone'];
                    return result;
                }
            },
            {
                targets: 5,
                render: function (data, type, full, meta) {
                    debugger
                    var result = full['Email'];
                    return result;
                }
            },
            {
                targets: 6,
                render: function (data, type, full, meta) {
                    debugger
                    var result = full['Password'];
                    return result;
                }
            },
            {
                targets: 7,
                render: function (data, type, full, meta) {
                    debugger
                    var result = full['Title'];
                    return result;
                }
            },
            {
                targets: -1,
                title: 'İşlemler',
                orderable: false,
                "width": "30%",
                render: function (data, type, full, meta) {
                    var result = '';
                    if (UserType == 2) {
                        result = `<a onclick="EditUser(` + full['ID'] + `)" class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1" title="Düzenle" data-bs-target="#EditUserModal" data-bs-toggle="modal">
                                    <span class="svg-icon svg-icon-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <path opacity="0.3" d="M21.4 8.35303L19.241 10.511L13.485 4.755L15.643 2.59595C16.0248 2.21423 16.5426 1.99988 17.0825 1.99988C17.6224 1.99988 18.1402 2.21423 18.522 2.59595L21.4 5.474C21.7817 5.85581 21.9962 6.37355 21.9962 6.91345C21.9962 7.45335 21.7817 7.97122 21.4 8.35303ZM3.68699 21.932L9.88699 19.865L4.13099 14.109L2.06399 20.309C1.98815 20.5354 1.97703 20.7787 2.03189 21.0111C2.08674 21.2436 2.2054 21.4561 2.37449 21.6248C2.54359 21.7934 2.75641 21.9115 2.989 21.9658C3.22158 22.0201 3.4647 22.0084 3.69099 21.932H3.68699Z" fill="black"></path>
                                            <path d="M5.574 21.3L3.692 21.928C3.46591 22.0032 3.22334 22.0141 2.99144 21.9594C2.75954 21.9046 2.54744 21.7864 2.3789 21.6179C2.21036 21.4495 2.09202 21.2375 2.03711 21.0056C1.9822 20.7737 1.99289 20.5312 2.06799 20.3051L2.696 18.422L5.574 21.3ZM4.13499 14.105L9.891 19.861L19.245 10.507L13.489 4.75098L4.13499 14.105Z" fill="black"></path>
                                        </svg>
                                     </span>
                                  </a>
                                  <a onclick="DeleteUser(` + full['ID'] + `)" class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm" title="Sil">
                                    <span class="svg-icon svg-icon-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <path d="M5 9C5 8.44772 5.44772 8 6 8H18C18.5523 8 19 8.44772 19 9V18C19 19.6569 17.6569 21 16 21H8C6.34315 21 5 19.6569 5 18V9Z" fill="black"></path>
                                            <path opacity="0.5" d="M5 5C5 4.44772 5.44772 4 6 4H18C18.5523 4 19 4.44772 19 5V5C19 5.55228 18.5523 6 18 6H6C5.44772 6 5 5.55228 5 5V5Z" fill="black"></path>
                                            <path opacity="0.5" d="M9 4C9 3.44772 9.44772 3 10 3H14C14.5523 3 15 3.44772 15 4V4H9V4Z" fill="black"></path>
                                        </svg>
                                     </span>
                                   </a>`;
                    }
                    return result;
                }
            },
        ],
        order: [[1, 'asc']],
        responsive: false,
        "scrollX": true,
        orderCellsTop: true,
        "destroy": true,
    });
    t.on('draw.dt', function () {
        var PageInfo = $('#kt_table_UserList').DataTable().page.info();
        t.column(0, { page: 'current' }).nodes().each(function (cell, i) {
            cell.innerHTML = i + 1 + PageInfo.start;
        });
    });

};
function EditUser(id) {
    $.ajax({
        type: "POST",
        url: '/Users/EditUser/' + id,
        success: function (data) {
            debugger
            $('#EditUserModal #ID').val(data['data'][0]['ID']);
            $('#EditUserModal #FirstName').val(data['data'][0]['FirstName']);
            $('#EditUserModal #LastName').val(data['data'][0]['LastName']);
            $('#EditUserModal #Phone').val(data['data'][0]['Phone']);
            $('#EditUserModal #Mail').val(data['data'][0]['Email']);
            $('#EditUserModal #Password').val(data['data'][0]['Password']);
            $('#EditUserModal #Title').val(data['data'][0]['Title']);
            //$('#EditUserModal #UserImageInput').src(data['data'][0]['Image']);
            $('#UserImageEdit').attr('src', "https://admin.xtanbulplus.com/"+data['data'][0]['Image'])
            $('#EditUserModal').modal();
        },
        error: function (request, status, error) {
            swal.fire("Hata!", "Bir sorun ile karşılaşıldı!", "error");
        }
    });
};
function UpdateUser() {
    var FirstName = $('#EditUserModal #FirstName').val();
    var LastName = $('#EditUserModal #LastName').val();
    var Phone = $('#EditUserModal #Phone').val();
    var Email = $('#EditUserModal #Mail').val();
    var Password = $('#EditUserModal #Password').val();
    var Title = $('#EditUserModal #Title').val();
    var ID = $('#EditUserModal #ID').val();
    debugger
    if (FirstName == "") {
        swal.fire("Hata!", "Ad Ekleyiniz!", "error");
    }
    else if (LastName == '') {
        swal.fire("Hata!", "Soyad Ekleyiniz!", "error");
    }
    else if (Phone == '') {
        swal.fire("Hata!", "Telefon Numarası Ekleyiniz!", "error");
    }
    else if (Email == '') {
        swal.fire("Hata!", "E-Mail Giriniz!", "error");
    }
    else if (Password == '') {
        swal.fire("Hata!", "Şifre Giriniz!", "error");
    }
    else if (Title == '') {
        swal.fire("Hata!", "Ünvan Giriniz!", "error");
    }
    else {
        debugger
        var formdata = new FormData();
        formdata.append("ID", ID);
        formdata.append("FirstName", FirstName);
        formdata.append("LastName", LastName);
        formdata.append("Phone", Phone);
        formdata.append("Email", Email);
        formdata.append("Password", Password);
        formdata.append("Title", Title);
        if (newImageForUserEdit != null) {
            formdata.append("Image", newImageForUserEdit, FirstName + ".jpg");
        }        
        $.ajax({
            type: "POST",
            url: '/Users/UpdateUser',
            processData: false,
            contentType: false,
            data: formdata,
            success: function (data) {
                window.location.href = '/Users/Index';
            },
            error: function (request, status, error) {
                swal.fire("Hata!", "Bir sorun ile karşılaşıldı!", "error");
            }
        });
    }
};
function SaveUsers() {
    debugger
    var FirstName = $('#NewUserModal #FirstName').val();
    var LastName = $('#NewUserModal #LastName').val();
    var Phone = $('#NewUserModal #Phone').val();
    var Email = $('#NewUserModal #Mail').val();
    var Password = $('#NewUserModal #Password').val();
    var Title = $('#NewUserModal #Title').val();
    debugger

    if (FirstName == '') {
        swal.fire("Hata!", "Ad Ekleyiniz!", "error"); 
    }
    else if (LastName == '') {
        swal.fire("Hata!", "Soyad Ekleyiniz!", "error");
    }
    else if (Phone == '') {
        swal.fire("Hata!", "Telefon Numarası Ekleyiniz!", "error");
    }
    else if (Email == '') {
        swal.fire("Hata!", "E-Mail Giriniz!", "error");
    }
    else if (Password == '') {
        swal.fire("Hata!", "Şifre Giriniz!", "error");
    }
    else if (Title == '') {
        swal.fire("Hata!", "Ünvan Giriniz!", "error");
    }
    else {
        debugger
        var formdata = new FormData();
        formdata.append("FirstName", FirstName);
        formdata.append("LastName", LastName);
        formdata.append("Phone", Phone);
        formdata.append("Email", Email);
        formdata.append("Password", Password);
        formdata.append("Title", Title);
        if (updateImageForNewUser != null) {
            formdata.append("Image", updateImageForNewUser, FirstName + ".jpg");
        }   

        $.ajax({
            type: "POST",
            url: '/Users/AddUser',
            processData: false,
            contentType: false,
            data: formdata,
            success: function (data) {
                window.location.href = '/Users/Index';
            },
            error: function (request, status, error) {
                swal.fire("Hata!", "Bir sorun ile karşılaşıldı!", "error");
            }
        });
    }
};
function DeleteUser(id) {
    var formdata = new FormData();
    formdata.append("ID", id);
    swal.fire({
        title: 'Silmek istediğinizden emin misiniz?',
        text: "Bu İşlem Geri Alınamaz!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Evet, Sil!',
        cancelButtonText: 'Hayır, İptal Et!',
        reverseButtons: true
    }).then(function (result) {
        if (result.value) {

            $.ajax({
                type: "POST",
                url: '/Users/DeleteUser',
                processData: false,
                contentType: false,
                data: formdata,
                success: function (data) {
                    window.location.href = '/Users/Index';
                },
            });

        } else if (result.dismiss === 'cancel') {
            swal.fire(
                "İptal!", "Silme İşlemi İptal Edildi!", "error"
            )
        }
    });
};
