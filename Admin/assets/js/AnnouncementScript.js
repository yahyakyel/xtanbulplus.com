function GetAnnouncement() {
    debugger

    var table = $('#kt_table_AnnouncementList');
    var t = table.DataTable({
        ajax: {
            url: '/Announcement/GetAnnouncement',
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
                data: 'Title',
                className: 'font-weight-bold ',
            },
            {
                data: 'Status',
                className: 'font-weight-bold ',
            },
            {
                data: 'Price',
                className: 'font-weight-bold ',
            },
            {
                data: 'City',
                className: 'font-weight-bold ',
            },
            {
                data: 'District',
                className: 'font-weight-bold ',
            },
            {
                data: 'İşlemler',
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
                    var result = `<img src="` + full['Image'][0]['Data1'] + `" width="auto;" height="70" >`;
                    return result;
                }
            },
            {
                targets: 2,
                render: function (data, type, full, meta) {
                    debugger
                    var result = full['Title'];
                    return result;
                }
            },
            {
                targets: 3,
                render: function (data, type, full, meta) {
                    debugger
                    if (full['Status'] == 0) {
                        var result = "Satılık";
                    }
                    else if (full['Status'] == 1) {
                        var result = "Satıldı";
                    }
                    return result;
                }
            },
            {
                targets: 4,
                render: function (data, type, full, meta) {
                    debugger
                    var result = full['Price'];
                    return result;
                }
            },
            {
                targets: 5,
                render: function (data, type, full, meta) {
                    debugger
                    var result = full['CitiesID'][0]['CityName'];
                    return result;
                }
            },
            {
                targets: 6,
                render: function (data, type, full, meta) {
                    debugger
                    var result = full['DistrictID'][0]['DistrictName'];
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
                    if (full['Status'] == 0) {
                        result = `
                              <a onclick="UpdateStatusForAnnouncement(` + full['ID'] + `,1)"  class="btn btn-sm btn-light btn-text-primary btn-icon mr-2" title="Satıldı"><span class="svg-icon svg-icon-md">
                                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                            <g transform="translate(12.000000, 12.000000) rotate(-45.000000) translate(-12.000000, -12.000000) translate(4.000000, 4.000000)" fill="#000000">
                                                <rect x="0" y="7" width="16" height="2" rx="1"/>
                                                <rect transform="translate(8.000000, 8.000000) rotate(-270.000000) translate(-8.000000, -8.000000) " x="0" y="7" width="16" height="2" rx="1"/>
                                            </g>
                                        </g>
                                    </svg>
                                </span>
                              </a>
                              <a href="/Announcement/CheckAnnouncementPage?id=` + full['ID'] + `" class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1" title="Detay" >
                                    <i class="fa fa-eye" aria-hidden="true"></i>
                                  </a>
                                   <a href="/Announcement/EditAnnouncementPage?id=` + full['ID'] + `" class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1" title="Düzenle" >
                                    <span class="svg-icon svg-icon-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <path opacity="0.3" d="M21.4 8.35303L19.241 10.511L13.485 4.755L15.643 2.59595C16.0248 2.21423 16.5426 1.99988 17.0825 1.99988C17.6224 1.99988 18.1402 2.21423 18.522 2.59595L21.4 5.474C21.7817 5.85581 21.9962 6.37355 21.9962 6.91345C21.9962 7.45335 21.7817 7.97122 21.4 8.35303ZM3.68699 21.932L9.88699 19.865L4.13099 14.109L2.06399 20.309C1.98815 20.5354 1.97703 20.7787 2.03189 21.0111C2.08674 21.2436 2.2054 21.4561 2.37449 21.6248C2.54359 21.7934 2.75641 21.9115 2.989 21.9658C3.22158 22.0201 3.4647 22.0084 3.69099 21.932H3.68699Z" fill="black"></path>
                                            <path d="M5.574 21.3L3.692 21.928C3.46591 22.0032 3.22334 22.0141 2.99144 21.9594C2.75954 21.9046 2.54744 21.7864 2.3789 21.6179C2.21036 21.4495 2.09202 21.2375 2.03711 21.0056C1.9822 20.7737 1.99289 20.5312 2.06799 20.3051L2.696 18.422L5.574 21.3ZM4.13499 14.105L9.891 19.861L19.245 10.507L13.489 4.75098L4.13499 14.105Z" fill="black"></path>
                                        </svg>
                                     </span>
                                  </a>  
                                  <a onclick="DeleteAnnouncement(` + full['ID'] + `)" class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm" title="Sil">
                                    <span class="svg-icon svg-icon-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <path d="M5 9C5 8.44772 5.44772 8 6 8H18C18.5523 8 19 8.44772 19 9V18C19 19.6569 17.6569 21 16 21H8C6.34315 21 5 19.6569 5 18V9Z" fill="black"></path>
                                            <path opacity="0.5" d="M5 5C5 4.44772 5.44772 4 6 4H18C18.5523 4 19 4.44772 19 5V5C19 5.55228 18.5523 6 18 6H6C5.44772 6 5 5.55228 5 5V5Z" fill="black"></path>
                                            <path opacity="0.5" d="M9 4C9 3.44772 9.44772 3 10 3H14C14.5523 3 15 3.44772 15 4V4H9V4Z" fill="black"></path>
                                        </svg>
                                     </span>
                                   </a>`;
                    }
                    else if (full['Status'] == 1) {
                        result = `<a onclick="UpdateStatusForAnnouncement(` + full['ID'] + `,0)"  class="btn btn-sm btn-light btn-text-primary btn-icon mr-2" title="Satılık"  value="` + full['ID'] + `"><span class="svg-icon svg-icon-md"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                        <polygon points="0 0 24 0 24 24 0 24"/>
                                        <path d="M6.26193932,17.6476484 C5.90425297,18.0684559 5.27315905,18.1196257 4.85235158,17.7619393 C4.43154411,17.404253 4.38037434,16.773159 4.73806068,16.3523516 L13.2380607,6.35235158 C13.6013618,5.92493855 14.2451015,5.87991302 14.6643638,6.25259068 L19.1643638,10.2525907 C19.5771466,10.6195087 19.6143273,11.2515811 19.2474093,11.6643638 C18.8804913,12.0771466 18.2484189,12.1143273 17.8356362,11.7474093 L14.0997854,8.42665306 L6.26193932,17.6476484 Z" fill="#000000" fill-rule="nonzero" transform="translate(11.999995, 12.000002) rotate(-180.000000) translate(-11.999995, -12.000002) "/>
                                    </g>
                                 </svg></span>
                              </a>                       
                              <a href="/Announcement/CheckAnnouncementPage?id=` + full['ID'] + `" class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1" title="Detay" >
                                    <i class="fa fa-eye" aria-hidden="true"></i>
                                  </a>
                                   <a href="/Announcement/EditAnnouncementPage?id=` + full['ID'] + `" class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1" title="Düzenle" >
                                    <span class="svg-icon svg-icon-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <path opacity="0.3" d="M21.4 8.35303L19.241 10.511L13.485 4.755L15.643 2.59595C16.0248 2.21423 16.5426 1.99988 17.0825 1.99988C17.6224 1.99988 18.1402 2.21423 18.522 2.59595L21.4 5.474C21.7817 5.85581 21.9962 6.37355 21.9962 6.91345C21.9962 7.45335 21.7817 7.97122 21.4 8.35303ZM3.68699 21.932L9.88699 19.865L4.13099 14.109L2.06399 20.309C1.98815 20.5354 1.97703 20.7787 2.03189 21.0111C2.08674 21.2436 2.2054 21.4561 2.37449 21.6248C2.54359 21.7934 2.75641 21.9115 2.989 21.9658C3.22158 22.0201 3.4647 22.0084 3.69099 21.932H3.68699Z" fill="black"></path>
                                            <path d="M5.574 21.3L3.692 21.928C3.46591 22.0032 3.22334 22.0141 2.99144 21.9594C2.75954 21.9046 2.54744 21.7864 2.3789 21.6179C2.21036 21.4495 2.09202 21.2375 2.03711 21.0056C1.9822 20.7737 1.99289 20.5312 2.06799 20.3051L2.696 18.422L5.574 21.3ZM4.13499 14.105L9.891 19.861L19.245 10.507L13.489 4.75098L4.13499 14.105Z" fill="black"></path>
                                        </svg>
                                     </span>
                                  </a>  
                                  <a onclick="DeleteAnnouncement(` + full['ID'] + `)" class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm" title="Sil">
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
        var PageInfo = $('#kt_table_AnnouncementList').DataTable().page.info();
        t.column(0, { page: 'current' }).nodes().each(function (cell, i) {
            cell.innerHTML = i + 1 + PageInfo.start;
        });
    });

};
function GetUserAnnouncement() {
    debugger

    var table = $('#kt_table_AnnouncementList');
    var t = table.DataTable({
        ajax: {
            url: '/Announcement/GetUserAnnouncement',
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
                data: 'Title',
                className: 'font-weight-bold ',
            },
            {
                data: 'Status',
                className: 'font-weight-bold ',
            },
            {
                data: 'UserName',
                className: 'font-weight-bold ',
            },
            {
                data: 'UserTitle',
                className: 'font-weight-bold ',
            },
            {
                data: 'Price',
                className: 'font-weight-bold ',
            },
            {
                data: 'City',
                className: 'font-weight-bold ',
            },
            {
                data: 'District',
                className: 'font-weight-bold ',
            },
            {
                data: 'İşlemler',
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
                    var result = `<img src="` + full['Image'][0]['Data1'] + `" width="auto;" height="70" >`;
                    return result;
                }
            },
            {
                targets: 2,
                render: function (data, type, full, meta) {
                    debugger
                    var result = full['Title'];
                    return result;
                }
            },
            {
                targets: 3,
                render: function (data, type, full, meta) {
                    debugger
                    if (full['Status'] == 0) {
                        var result = "Satılık";
                    }
                    else if (full['Status'] == 1) {
                        var result = "Satıldı";
                    }
                    return result;
                }
            },
            {
                targets: 4,
                render: function (data, type, full, meta) {
                    debugger
                    var result = full['AnnouncementUser'][0]['UserName'];
                    return result;
                }
            },
            {
                targets: 5,
                render: function (data, type, full, meta) {
                    debugger
                    var result = full['AnnouncementUser'][0]['UserTitle'];
                    return result;
                }
            },
            {
                targets: 6,
                render: function (data, type, full, meta) {
                    debugger
                    var result = full['Price'];
                    return result;
                }
            },
            {
                targets: 7,
                render: function (data, type, full, meta) {
                    debugger
                    var result = full['CitiesID'][0]['CityName'];
                    return result;
                }
            },
            {
                targets: 8,
                render: function (data, type, full, meta) {
                    debugger
                    var result = full['DistrictID'][0]['DistrictName'];
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
                    if (full['Status'] == 0) {
                        result = `
                              <a onclick="UpdateStatusForAnnouncement(` + full['ID'] + `,1)"  class="btn btn-sm btn-light btn-text-primary btn-icon mr-2" title="Satıldı"><span class="svg-icon svg-icon-md">
                                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                            <g transform="translate(12.000000, 12.000000) rotate(-45.000000) translate(-12.000000, -12.000000) translate(4.000000, 4.000000)" fill="#000000">
                                                <rect x="0" y="7" width="16" height="2" rx="1"/>
                                                <rect transform="translate(8.000000, 8.000000) rotate(-270.000000) translate(-8.000000, -8.000000) " x="0" y="7" width="16" height="2" rx="1"/>
                                            </g>
                                        </g>
                                    </svg>
                                </span>
                              </a>
                              <a href="/Announcement/CheckAnnouncementPage?id=` + full['ID'] + `" class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1" title="Detay" >
                                    <i class="fa fa-eye" aria-hidden="true"></i>
                                  </a>
                                   <a href="/Announcement/EditAnnouncementPage?id=` + full['ID'] + `" class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1" title="Düzenle" >
                                    <span class="svg-icon svg-icon-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <path opacity="0.3" d="M21.4 8.35303L19.241 10.511L13.485 4.755L15.643 2.59595C16.0248 2.21423 16.5426 1.99988 17.0825 1.99988C17.6224 1.99988 18.1402 2.21423 18.522 2.59595L21.4 5.474C21.7817 5.85581 21.9962 6.37355 21.9962 6.91345C21.9962 7.45335 21.7817 7.97122 21.4 8.35303ZM3.68699 21.932L9.88699 19.865L4.13099 14.109L2.06399 20.309C1.98815 20.5354 1.97703 20.7787 2.03189 21.0111C2.08674 21.2436 2.2054 21.4561 2.37449 21.6248C2.54359 21.7934 2.75641 21.9115 2.989 21.9658C3.22158 22.0201 3.4647 22.0084 3.69099 21.932H3.68699Z" fill="black"></path>
                                            <path d="M5.574 21.3L3.692 21.928C3.46591 22.0032 3.22334 22.0141 2.99144 21.9594C2.75954 21.9046 2.54744 21.7864 2.3789 21.6179C2.21036 21.4495 2.09202 21.2375 2.03711 21.0056C1.9822 20.7737 1.99289 20.5312 2.06799 20.3051L2.696 18.422L5.574 21.3ZM4.13499 14.105L9.891 19.861L19.245 10.507L13.489 4.75098L4.13499 14.105Z" fill="black"></path>
                                        </svg>
                                     </span>
                                  </a>  
                                  <a onclick="DeleteAnnouncement(` + full['ID'] + `)" class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm" title="Sil">
                                    <span class="svg-icon svg-icon-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <path d="M5 9C5 8.44772 5.44772 8 6 8H18C18.5523 8 19 8.44772 19 9V18C19 19.6569 17.6569 21 16 21H8C6.34315 21 5 19.6569 5 18V9Z" fill="black"></path>
                                            <path opacity="0.5" d="M5 5C5 4.44772 5.44772 4 6 4H18C18.5523 4 19 4.44772 19 5V5C19 5.55228 18.5523 6 18 6H6C5.44772 6 5 5.55228 5 5V5Z" fill="black"></path>
                                            <path opacity="0.5" d="M9 4C9 3.44772 9.44772 3 10 3H14C14.5523 3 15 3.44772 15 4V4H9V4Z" fill="black"></path>
                                        </svg>
                                     </span>
                                   </a>`;
                    }
                    else if (full['Status'] == 1) {
                        result = `<a onclick="UpdateStatusForAnnouncement(` + full['ID'] + `,0)"  class="btn btn-sm btn-light btn-text-primary btn-icon mr-2" title="Satılık"  value="` + full['ID'] + `"><span class="svg-icon svg-icon-md"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                        <polygon points="0 0 24 0 24 24 0 24"/>
                                        <path d="M6.26193932,17.6476484 C5.90425297,18.0684559 5.27315905,18.1196257 4.85235158,17.7619393 C4.43154411,17.404253 4.38037434,16.773159 4.73806068,16.3523516 L13.2380607,6.35235158 C13.6013618,5.92493855 14.2451015,5.87991302 14.6643638,6.25259068 L19.1643638,10.2525907 C19.5771466,10.6195087 19.6143273,11.2515811 19.2474093,11.6643638 C18.8804913,12.0771466 18.2484189,12.1143273 17.8356362,11.7474093 L14.0997854,8.42665306 L6.26193932,17.6476484 Z" fill="#000000" fill-rule="nonzero" transform="translate(11.999995, 12.000002) rotate(-180.000000) translate(-11.999995, -12.000002) "/>
                                    </g>
                                 </svg></span>
                              </a>                       
                              <a href="/Announcement/CheckAnnouncementPage?id=` + full['ID'] + `" class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1" title="Detay" >
                                    <i class="fa fa-eye" aria-hidden="true"></i>
                                  </a>
                                   <a href="/Announcement/EditAnnouncementPage?id=` + full['ID'] + `" class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1" title="Düzenle" >
                                    <span class="svg-icon svg-icon-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <path opacity="0.3" d="M21.4 8.35303L19.241 10.511L13.485 4.755L15.643 2.59595C16.0248 2.21423 16.5426 1.99988 17.0825 1.99988C17.6224 1.99988 18.1402 2.21423 18.522 2.59595L21.4 5.474C21.7817 5.85581 21.9962 6.37355 21.9962 6.91345C21.9962 7.45335 21.7817 7.97122 21.4 8.35303ZM3.68699 21.932L9.88699 19.865L4.13099 14.109L2.06399 20.309C1.98815 20.5354 1.97703 20.7787 2.03189 21.0111C2.08674 21.2436 2.2054 21.4561 2.37449 21.6248C2.54359 21.7934 2.75641 21.9115 2.989 21.9658C3.22158 22.0201 3.4647 22.0084 3.69099 21.932H3.68699Z" fill="black"></path>
                                            <path d="M5.574 21.3L3.692 21.928C3.46591 22.0032 3.22334 22.0141 2.99144 21.9594C2.75954 21.9046 2.54744 21.7864 2.3789 21.6179C2.21036 21.4495 2.09202 21.2375 2.03711 21.0056C1.9822 20.7737 1.99289 20.5312 2.06799 20.3051L2.696 18.422L5.574 21.3ZM4.13499 14.105L9.891 19.861L19.245 10.507L13.489 4.75098L4.13499 14.105Z" fill="black"></path>
                                        </svg>
                                     </span>
                                  </a>  
                                  <a onclick="DeleteAnnouncement(` + full['ID'] + `)" class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm" title="Sil">
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
        var PageInfo = $('#kt_table_AnnouncementList').DataTable().page.info();
        t.column(0, { page: 'current' }).nodes().each(function (cell, i) {
            cell.innerHTML = i + 1 + PageInfo.start;
        });
    });

};
function UpdateStatusForAnnouncement(UsersRequestID, AnnouncementStatus) {
    var formData = new FormData();
    formData.append('UsersRequestID', UsersRequestID);
    formData.append('AnnouncementStatus', AnnouncementStatus);
    var table = $('#kt_table_AnnouncementList');

    $.ajax({
        type: "POST",
        url: '/Announcement/UpdateStatusForAnnouncement',
        data: formData,
        processData: false,
        contentType: false,
        success: function (data) {
            table.DataTable().ajax.reload();
        },
        error: function (request, status, error) {
            swal.fire("Hata!", "Bir sorun ile karşılaşıldı!", "error");
        }
    });
};



function SaveAnnouncement() {
    debugger
    var Title = $('#Title').val();
    var Price = $('#Price').val();
    var CategoriesID = $('#CategoriesID').val();
    var SubCategoriesID = $('#SubCategoriesID').val();
    var CitiesID = $('#CitiesID').val();
    var DistrictID = $('#DistrictID').val();
    var NeighbourhoodID = $('#NeighbourhoodID').val();
    var AreaBrüt = $('#AreaBrüt').val();
    var AreaGross = $('#AreaGross').val();
    var RoomCount = $('#RoomCount').val();
    var BathroomsCount = $('#BathroomsCount').val();
    var SaloonCount = $('#SaloonCount').val();
    var BuildingAge = $('#BuildingAge').val();
    var FloorLocation = $('#FloorLocation').val();
    var FloorCount = $('#FloorCount').val();
    var Heating = $('#Heating').val();
    var Balcony = document.querySelector('input[name="flexRadioDefault"]:checked').value;
    var Furnished = document.querySelector('input[name="flexRadioDefault2"]:checked').value;
    var UsingStatus = $('#UsingStatus').val();
    var InsideSite = document.querySelector('input[name="flexRadioDefault3"]:checked').value;
    var SiteName = $('#SiteName').val();
    var North = document.querySelector('input[name="flexRadioDefault4"]:checked').value;;
    var South = document.querySelector('input[name="flexRadioDefault5"]:checked').value;;
    var East = document.querySelector('input[name="flexRadioDefault6"]:checked').value;;
    var West = document.querySelector('input[name="flexRadioDefault7"]:checked').value;;
    //    var West = document.querySelector('#West').checked;
    var LocationIFrameLink = $('#LocationIFrameLink').val();
    var Description = [];
    Description.push($('#Description').val());

    if (imgArrayForRealEstate.length == 0) {
        swal.fire("Hata!", "Fotoğraf Giriniz!", "error");
    }
    else if (Title == "") {
        swal.fire("Hata!", "Başlık Giriniz!", "error");
    }
    else if (Price == "") {
        swal.fire("Hata!", "Fiyat Giriniz!", "error");
    }
    else if (CategoriesID == "") {
        swal.fire("Hata!", "Kategori Giriniz!", "error");
    }
    else if (SubCategoriesID == "") {
        swal.fire("Hata!", "Alt Kategori Giriniz!", "error");
    }
    else if (CitiesID == "") {
        swal.fire("Hata!", "İl Giriniz!", "error");
    }
    else if (DistrictID == "") {
        swal.fire("Hata!", "İlçe Giriniz!", "error");
    }
    else if (NeighbourhoodID == "") {
        swal.fire("Hata!", "Mahalle Giriniz!", "error");
    }
    else if (AreaBrüt == 0) {
        swal.fire("Hata!", "Brüt Alanı Giriniz!", "error");
    }
    else if (AreaGross == 0) {
        swal.fire("Hata!", "Net Alanı Giriniz!", "error");
    }
    else if (RoomCount == 0) {
        swal.fire("Hata!", "Oda Sayısını Giriniz!", "error");
    }
    else if (SaloonCount == 0) {
        swal.fire("Hata!", "Salon Sayısını Giriniz!", "error");
    }
    else if (BuildingAge == 0) {
        swal.fire("Hata!", "Bina Yaşını Giriniz!", "error");
    }
    else if (FloorLocation == 0) {
        swal.fire("Hata!", "Bulunduğu Katın Sayısını Giriniz!", "error");
    }
    else if (FloorCount == 0) {
        swal.fire("Hata!", "Kat Sayısı Giriniz!", "error");
    }
    else if (Heating == "") {
        swal.fire("Hata!", "Isıtma Şeklini Giriniz!", "error");
    }
    else if (BathroomsCount == 0) {
        swal.fire("Hata!", "Banyo Sayısı Giriniz!", "error");
    }
    else if (UsingStatus == "") {
        swal.fire("Hata!", "Kullanım Durumunu Giriniz!", "error");
    }
    else if (InsideSite == 0) {
        swal.fire("Hata!", "Site Özeliğini Seçiniz!", "error");

    }
    else if (InsideSite == "true" && SiteName== "") {
            swal.fire("Hata!", "Site Adını Giriniz!", "error");
    }


    else if (Balcony == 0) {
        swal.fire("Hata!", "Balkon Özelliğini Seçiniz!", "error");
    }
    else if (Furnished == 0) {
        swal.fire("Hata!", "Eşya Özelliğini Seçiniz!", "error");
    }
    else if (North == 0) {
        swal.fire("Hata!", "Kuzey Cephe Özelliğini Seçiniz!", "error");
    }
    else if (South == 0) {
        swal.fire("Hata!", "Güney Cephe Özelliğini Seçiniz!", "error");
    }
    else if (East == 0) {
        swal.fire("Hata!", "Doğu Cephe Özelliğini Seçiniz!", "error");
    }
    else if (West == 0) {
        swal.fire("Hata!", "Batı Cephe Özelliğini Seçiniz!", "error");
    }
    else if (LocationIFrameLink == "") {
        swal.fire("Hata!", "Lokasyon Linkini Giriniz!", "error");
    }
    else if (Description[0] == "") {
        swal.fire("Hata!", "Açıklama Giriniz!", "error");
    }
    else {
        var formData = new FormData();
        formData.append('Title', Title);
        formData.append('Price', Price);
        formData.append('CategoryID', SubCategoriesID);
        formData.append('CitiesID', CitiesID);
        formData.append('DistrictID', DistrictID);
        formData.append('NeighbourhoodID', NeighbourhoodID);
        formData.append('AreaBrüt', AreaBrüt);
        formData.append('AreaGross', AreaGross);
        formData.append('RoomCount', RoomCount);
        formData.append('SaloonCount', SaloonCount);
        formData.append('BuildingAge', BuildingAge);
        formData.append('FloorLocation', FloorLocation);
        formData.append('FloorCount', FloorCount);
        formData.append('Heating', Heating);
        formData.append('BathroomsCount', BathroomsCount);
        formData.append('UsingStatus', UsingStatus);
        formData.append('SiteName', SiteName);
        formData.append('Balcony', Balcony);
        formData.append('Furnished', Furnished);
        formData.append('InsideSite', InsideSite);
        formData.append('North', North);
        formData.append('South', South);
        formData.append('East', East);
        formData.append('West', West);
        formData.append('LocationIFrameLink', LocationIFrameLink);
        formData.append('Description', Description);
        $.ajax({
            type: "POST",
            url: '/Announcement/SaveAnnouncement',
            processData: false,
            contentType: false,
            data: formData,
            success: function (data) {

                var RealEstateID = data;
                //var RealEstateID = $(data).val();
                var formData2 = new FormData();
                for (var i = 0; i < imgArrayForRealEstate.length; i++) {
                    debugger
                    formData2.append('MultiImage', imgArrayForRealEstate[i]);
                }
                formData2.append("RealEstateID", RealEstateID);
                $.ajax({
                    type: "POST",
                    url: '/Announcement/ImageUploaderForRealEstate',
                    processData: false,
                    contentType: false,
                    data: formData2,
                    success: function (data) {
                    },
                    error: function (request, status, error) {
                        swal.fire("Hata!", "Bir sorun ile karşılaşıldı!", "error");
                    }
                });
                window.location.href = '/Announcement/Index';
            },
            error: function (request, status, error) {
                swal.fire("Hata!", "Bir sorun ile karşılaşıldı!", "error");
            }
        });
    }
};
function UpdateAnnouncement(Id) {
    debugger
    var Title = $('#Title').val();
    var Price = $('#Price').val();
    var CitiesID = $('#Cities').val();
    var DistrictID = $('#District').val();
    var NeighbourhoodID = $('#NeighbourhoodID').val();
    var AreaBrüt = $('#AreaBrüt').val();
    var AreaGross = $('#AreaGross').val();
    var RoomCount = $('#RoomCount').val();
    var BathroomsCount = $('#BathroomsCount').val();
    var SaloonCount = $('#SaloonCount').val();
    var BuildingAge = $('#BuildingAge').val();
    var FloorLocation = $('#FloorLocation').val();
    var FloorCount = $('#FloorCount').val();
    var Heating = $('#Heating').val();
    var Balcony = document.querySelector('input[name="flexRadioDefault"]:checked').value;
    var Furnished = document.querySelector('input[name="flexRadioDefault2"]:checked').value;
    var UsingStatus = $('#UsingStatus').val();
    var InsideSite = document.querySelector('input[name="flexRadioDefault3"]:checked').value;
    var SiteName = $('#SiteName').val();
    var North = document.querySelector('input[name="flexRadioDefault4"]:checked').value;;
    var South = document.querySelector('input[name="flexRadioDefault5"]:checked').value;;
    var East = document.querySelector('input[name="flexRadioDefault6"]:checked').value;;
    var West = document.querySelector('input[name="flexRadioDefault7"]:checked').value;;
    //    var West = document.querySelector('#West').checked;
    var LocationIFrameLink = $('#LocationIFrameLink').val();
    var Description = [];
    Description.push($('#Description').val());


    if (Title == "") {
        swal.fire("Hata!", "Başlık Giriniz!", "error");
    }
    else if (Price == "") {
        swal.fire("Hata!", "Fiyat Giriniz!", "error");
    }
    else if (CitiesID == "") {
        swal.fire("Hata!", "İl Giriniz!", "error");
    }
    else if (DistrictID == "") {
        swal.fire("Hata!", "İlçe Giriniz!", "error");
    }
    else if (NeighbourhoodID == "") {
        swal.fire("Hata!", "Mahalle Giriniz!", "error");
    }
    else if (AreaBrüt == 0) {
        swal.fire("Hata!", "Brüt Alanı Giriniz!", "error");
    }
    else if (AreaGross == 0) {
        swal.fire("Hata!", "Net Alanı Giriniz!", "error");
    }
    else if (RoomCount == 0) {
        swal.fire("Hata!", "Oda Sayısını Giriniz!", "error");
    }
    else if (SaloonCount == 0) {
        swal.fire("Hata!", "Salon Sayısını Giriniz!", "error");
    }
    else if (BuildingAge == 0) {
        swal.fire("Hata!", "Bina Yaşını Giriniz!", "error");
    }
    else if (FloorLocation == 0) {
        swal.fire("Hata!", "Bulunduğu Katın Sayısını Giriniz!", "error");
    }
    else if (FloorCount == 0) {
        swal.fire("Hata!", "Kat Sayısı Giriniz!", "error");
    }
    else if (Heating == "") {
        swal.fire("Hata!", "Isıtma Şeklini Giriniz!", "error");
    }
    else if (BathroomsCount == 0) {
        swal.fire("Hata!", "Banyo Sayısı Giriniz!", "error");
    }
    else if (UsingStatus == "") {
        swal.fire("Hata!", "Kullanım Durumunu Giriniz!", "error");
    }
    else if (InsideSite == 0) {
        swal.fire("Hata!", "Site Özeliğini Seçiniz!", "error");
    }
    else if (Balcony == 0) {
        swal.fire("Hata!", "Balkon Özelliğini Seçiniz!", "error");
    }
    else if (Furnished == 0) {
        swal.fire("Hata!", "Eşya Özelliğini Seçiniz!", "error");
    }
    else if (North == 0) {
        swal.fire("Hata!", "Kuzey Cephe Özelliğini Seçiniz!", "error");
    }
    else if (South == 0) {
        swal.fire("Hata!", "Güney Cephe Özelliğini Seçiniz!", "error");
    }
    else if (East == 0) {
        swal.fire("Hata!", "Doğu Cephe Özelliğini Seçiniz!", "error");
    }
    else if (West == 0) {
        swal.fire("Hata!", "Batı Cephe Özelliğini Seçiniz!", "error");
    }
    else if (LocationIFrameLink == "") {
        swal.fire("Hata!", "Lokasyon Linkini Giriniz!", "error");
    }
    else if (Description[0] == "") {
        swal.fire("Hata!", "Açıklama Giriniz!", "error");
    }
    else {
        var formData = new FormData();
        formData.append('Id', Id);
        formData.append('Title', Title);
        formData.append('Price', Price);
        formData.append('CitiesID', CitiesID);
        formData.append('DistrictID', DistrictID);
        formData.append('NeighbourhoodID', NeighbourhoodID);
        formData.append('AreaBrüt', AreaBrüt);
        formData.append('AreaGross', AreaGross);
        formData.append('RoomCount', RoomCount);
        formData.append('SaloonCount', SaloonCount);
        formData.append('BuildingAge', BuildingAge);
        formData.append('FloorLocation', FloorLocation);
        formData.append('FloorCount', FloorCount);
        formData.append('Heating', Heating);
        formData.append('BathroomsCount', BathroomsCount);
        formData.append('UsingStatus', UsingStatus);
        formData.append('SiteName', SiteName);
        formData.append('Balcony', Balcony);
        formData.append('Furnished', Furnished);
        formData.append('InsideSite', InsideSite);
        formData.append('North', North);
        formData.append('South', South);
        formData.append('East', East);
        formData.append('West', West);
        formData.append('LocationIFrameLink', LocationIFrameLink);
        formData.append('Description', Description);
        $.ajax({
            type: "POST",
            url: '/Announcement/UpdateAnnouncement',
            processData: false,
            contentType: false,
            data: formData,
            success: function (data) {

                var RealEstateID = data;
                //var RealEstateID = $(data).val();
                var formData2 = new FormData();
                for (var i = 0; i < imgArrayForRealEstate.length; i++) {
                    debugger
                    formData2.append('MultiImage', imgArrayForRealEstate[i]);
                }
                for (var i = 0; i < imgArrayForRealEstateArr.length; i++) {
                    debugger
                    formData2.append('imgArrayForRealEstateArr', imgArrayForRealEstateArr[i]);
                }
                debugger
                formData2.append("RealEstateID", RealEstateID);
                $.ajax({
                    type: "POST",
                    url: '/Announcement/ImageUploaderForRealEstate',
                    processData: false,
                    contentType: false,
                    data: formData2,
                    success: function (data) {
                        debugger
                    },
                    error: function (request, status, error) {
                        swal.fire("Hata!", "Bir sorun ile karşılaşıldı!", "error");
                    }
                });
                window.location.href = '/Announcement/Index';
            },
            error: function (request, status, error) {
                swal.fire("Hata!", "Bir sorun ile karşılaşıldı!", "error");
            }
        });
    }
};

function CitiesForAnnouncement() {
    $.ajax({
        type: "POST",
        url: '/Announcement/CitiesForAnnouncement',
        success: function (data) {
            $('#DistrictID').prop('disabled', true);
            $('#NeighbourhoodID').prop('disabled', true);
            debugger
            var list1 = `<option value="0">İl Seçiniz..</option>`;
            for (var i = 0; i < data['data'].length; i++) {
                list1 += `<option value="` + data['data'][i]['CityKey'] + `">` + data['data'][i]['CityName'] + `</option>`;
            }
            $('#CitiesID').empty();
            $('#CitiesID').append(list1);
            $('#DistrictID').prop('', true);

        },
        error: function (request, status, error) {
            swal.fire("Hata!", "Bir sorun ile karşılaşıldı!", "error");
        }
    });
};
$('#CitiesID').change(function myfunction() {
    var CityKey = $('#CitiesID').val();
    $.ajax({
        type: "POST",
        url: '/Announcement/DistrictForCities?CityKey=' + CityKey,
        success: function (data) {
            debugger
            $('#DistrictID').prop('disabled', false);
            $('#NeighbourhoodID').prop('disabled', true);
            var list1 = "";
            for (var i = 0; i < data['data'].length; i++) {
                list1 += `<option value="` + data['data'][i]['DistrictKey'] + `">` + data['data'][i]['DistrictName'] + `</option>`;
            }
            $('#DistrictID').empty();
            $('#DistrictID').append(list1);
        },
        error: function (request, status, error) {
            swal.fire("Hata!", "Bir sorun ile karşılaşıldı!", "error");
        }
    });
});
$('#DistrictID').change(function myfunction() {
    var DistrictKey = $('#DistrictID').val();
    $.ajax({
        type: "POST",
        url: '/Announcement/NeighbourhoodsForDistrict?DistrictKey=' + DistrictKey,
        success: function (data) {
            debugger
            $('#NeighbourhoodID').prop('disabled', false);
            var list1 = "";
            for (var i = 0; i < data['data'].length; i++) {
                list1 += `<option value="` + data['data'][i]['NeighbourhoodKey'] + `">` + data['data'][i]['NeighbourhoodName'] + `</option>`;
            }
            $('#NeighbourhoodID').empty();
            $('#NeighbourhoodID').append(list1);
        },
        error: function (request, status, error) {
            swal.fire("Hata!", "Bir sorun ile karşılaşıldı!", "error");
        }
    });
});

function EditAnnouncement(id) {
    $.ajax({
        type: "POST",
        url: '/Announcement/EditAnnouncement?id=' + id,
        success: function (data) {
            debugger
            $('#Title').val(data['data'][0]['Title']);
            $('#Title').text(data['data'][0]['Title']);
            if (data['data'][0]['Status'] == 0) {
                $('#Status').text("Satılık");
            }
            else if (data['data'][0]['Status'] == 1) {
                $('#Status').text("Satıldı");
            }
            $('#Price').val(data['data'][0]['Price']);
            //$('#Cities').text(data['data'][0]['NeighbourhoodID'][0]['CityName']);
            //$('#District').text(data['data'][0]['NeighbourhoodID'][0]['DistrictName']);
            //$('#NeighbourhoodID').text(data['data'][0]['NeighbourhoodID'][0]['NeighbourhoodName']);
            var Cities = `<option value="` + data['data'][0]['CitiesID'][0]['CityKey'] + `">` + data['data'][0]['CitiesID'][0]['CityName'] + `</option>`;
            for (var i = 0; i < data['NotCitiesID'].length; i++) {
                Cities += `<option value="` + data['NotCitiesID'][i]['CityKey'] + `">` + data['NotCitiesID'][i]['CityName'] + `</option>`
            }
            $('#Cities').empty;
            $('#Cities').append(Cities);

            var District = `<option value="` + data['data'][0]['DistrictID'][0]['DistrictKey'] + `">` + data['data'][0]['DistrictID'][0]['DistrictName'] + `</option>`;
            for (var i = 0; i < data['NotDistrictID'].length; i++) {
                District += `<option value="` + data['NotDistrictID'][i]['DistrictKey'] + `">` + data['NotDistrictID'][i]['DistrictName'] + `</option>`
            }
            $('#District').empty;
            $('#District').append(District);

            var NeighbourhoodID = `<option value="` + data['data'][0]['NeighbourhoodID'][0]['NeighbourhoodKey'] + `">` + data['data'][0]['NeighbourhoodID'][0]['NeighbourhoodName'] + `</option>`;
            for (var i = 0; i < data['NotNeighbourhoodID'].length; i++) {
                NeighbourhoodID += `<option value="` + data['NotNeighbourhoodID'][i]['NeighbourhoodKey'] + `">` + data['NotNeighbourhoodID'][i]['NeighbourhoodName'] + `</option>`
            }
            $('#NeighbourhoodID').empty;
            $('#NeighbourhoodID').append(NeighbourhoodID);



            $('#AreaBrüt').val(data['data'][0]['AreaBrüt']);
            $('#AreaGross').val(data['data'][0]['AreaGross']);
            $('#RoomCount').val(data['data'][0]['RoomCount']);
            $('#SaloonCount').val(data['data'][0]['SaloonCount']);
            $('#BuildingAge').val(data['data'][0]['BuildingAge']);
            $('#FloorLocation').val(data['data'][0]['FloorLocation']);
            $('#FloorCount').val(data['data'][0]['FloorCount']);
            $('#Heating').val(data['data'][0]['Heating']);
            $('#BathroomsCount').val(data['data'][0]['BathroomsCount']);
            $('#Heating').val(data['data'][0]['Heating']);
            if (data['data'][0]['Balcony'] == true) {
                $('#flexRadioDefault1').prop('checked', true);
            }
            else if (data['data'][0]['Balcony'] == false) {
                $(' #flexRadioDefault2').prop('checked', true);
            }
            if (data['data'][0]['Furnished'] == true) {
                $('#flexRadioDefault3').prop('checked', true);
            }
            else if (data['data'][0]['Furnished'] == false) {
                $('#flexRadioDefault4').prop('checked', true);
            }
            $('#UsingStatus').val(data['data'][0]['UsingStatus']);

            if (data['data'][0]['InsideSite'] == true) {
                $('#flexRadioDefault5').prop('checked', true);
                $('#SiteName').val(data['data'][0]['SiteName']);
            }
            else if (data['data'][0]['InsideSite'] == false) {
                $('#flexRadioDefault6').prop('checked', true);
                $('#SiteNameDiv').hide();
            }
            if (data['data'][0]['North'] == true) {
                $(' #North').prop('checked', true);
            }
            else if (data['data'][0]['North'] == false) {
                $(' #North2').prop('checked', true);
            }
            if (data['data'][0]['South'] == true) {
                $(' #South').prop('checked', true);
            }
            else if (data['data'][0]['South'] == false) {
                $(' #South2').prop('checked', true);
            }
            if (data['data'][0]['East'] == true) {
                $(' #East').prop('checked', true);
            }
            else if (data['data'][0]['East'] == false) {
                $(' #East2').prop('checked', true);
            }
            if (data['data'][0]['West'] == true) {
                $(' #West').prop('checked', true);
            }
            else if (data['data'][0]['West'] == false) {
                $(' #West2').prop('checked', true);
            }
            debugger

            $(' #LocationIFrameLink').val(data['data'][0]['LocationIFrameLink']);
            $('#Description').summernote('code', data['data'][0]['Description']);
            //document.getElementById("UserImageEdit").src = data['data'][0]['Image'];
            //$('#EditUserModal').modal();
        },
        error: function (request, status, error) {
            swal.fire("Hata!", "Bir sorun ile karşılaşıldı!", "error");
        }
    });
};

function CheckAnnouncement(id) {
    $.ajax({
        type: "POST",
        url: '/Announcement/CheckAnnouncement/' + id,
        success: function (data) {
            debugger

            $('#Description').val(data['data'][0]['Description']);
            $('#Description').summernote('code', data['data'][0]['Description']);

            $('#Title').text(data['data'][0]['Title']);
            if (data['data'][0]['Status'] == 0) {
                $('#Status').text("Satılık");
            }
            else if (data['data'][0]['Status'] == 1) {
                $('#Status').text("Satıldı");
            }
            $('#Price').text(data['data'][0]['Price']);
            $('#Cities').text(data['data'][0]['CitiesID'][0]['CityName']);
            $('#District').text(data['data'][0]['DistrictID'][0]['DistrictName']);
            $('#NeighbourhoodID').text(data['data'][0]['NeighbourhoodID'][0]['NeighbourhoodName']);
            $('#AreaBrüt').text(data['data'][0]['AreaBrüt']);
            $('#AreaGross').text(data['data'][0]['AreaGross']);
            $('#RoomCount').text(data['data'][0]['RoomCount']);
            $('#SaloonCount').text(data['data'][0]['SaloonCount']);
            $('#BuildingAge').text(data['data'][0]['BuildingAge']);
            $('#FloorLocation').text(data['data'][0]['FloorLocation']);
            $('#FloorCount').text(data['data'][0]['FloorCount']);
            $('#Heating').text(data['data'][0]['Heating']);
            $('#BathroomsCount').text(data['data'][0]['BathroomsCount']);
            $('#Heating').text(data['data'][0]['Heating']);
            if (data['data'][0]['Balcony'] == true) {
                $('#flexRadioDefault1').prop('checked', true);
                $('#flexRadioDefault2').hide();
                $('#flexRadioDefault2text').hide();
            }
            else if (data['data'][0]['Balcony'] == false) {
                $('#flexRadioDefault2').prop('checked', true);
                $('#flexRadioDefault1').hide();
                $('#flexRadioDefault1text').hide();
            }

            if (data['data'][0]['Furnished'] == true) {
                $('#flexRadioDefault3').prop('checked', true);
                $('#flexRadioDefault4').hide();
                $('#flexRadioDefault4text').hide();
            }
            else if (data['data'][0]['Furnished'] == false) {
                $('#flexRadioDefault4').prop('checked', true);
                $('#flexRadioDefault3').hide();
                $('#flexRadioDefault3text').hide();
            }
            $('#UsingStatus').text(data['data'][0]['UsingStatus']);

            if (data['data'][0]['InsideSite'] == true) {
                $('#flexRadioDefault5').prop('checked', true);
                $('#flexRadioDefault6').hide();
                $('#flexRadioDefault6text').hide();
                $('#SiteName').text(data['data'][0]['SiteName']);

            }
            else if (data['data'][0]['InsideSite'] == false) {
                $('#flexRadioDefault6').prop('checked', true);
                $('#flexRadioDefault5').hide();
                $('#flexRadioDefault5text').hide();
                $('#sitenamediv').hide();
            }
            if (data['data'][0]['North'] == true) {
                $('#North').prop('checked', true);
                $('#North2').hide();
                $('#North2text').hide();
            }
            else if (data['data'][0]['North'] == false) {
                $('#North2').prop('checked', true);
                $('#North').hide();
                $('#Northtext').hide();
            }
            if (data['data'][0]['South'] == true) {
                $('#South').prop('checked', true);
                $('#South2').hide();
                $('#South2text').hide();
            }
            else if (data['data'][0]['South'] == false) {
                $('#South2').prop('checked', true);
                $('#South').hide();
                $('#Southtext').hide();
            }
            if (data['data'][0]['East'] == true) {
                $('#East').prop('checked', true);
                $('#East2').hide();
                $('#East2text').hide();
            }
            else if (data['data'][0]['East'] == false) {
                $('#East2').prop('checked', true);
                $('#East').hide();
                $('#Easttext').hide();
            }
            if (data['data'][0]['West'] == true) {
                $('#West').prop('checked', true);
                $('#West2').hide();
                $('#West2text').hide();
            }
            else if (data['data'][0]['West'] == false) {
                $('#West2').prop('checked', true);
                $('#West').hide();
                $('#Westtext').hide();
            }
            $('#LocationIFrameLink').text(data['data'][0]['LocationIFrameLink']);
        },
        error: function (request, status, error) {
            swal.fire("Hata!", "Bir sorun ile karşılaşıldı!", "error");
        }
    });
};

function CategoriesForAnnouncement() {
    $.ajax({
        type: "POST",
        url: '/Announcement/CategoriesForAnnouncement',
        success: function (data) {
            debugger
            $('#SubCategoriesID').prop('disabled', true);
            var list1 = `<option value="0">Kategori Seçiniz</option>`;
            for (var i = 0; i < data['data'].length; i++) {
                list1 += `<option value="` + data['data'][i]['CategoryID'] + `">` + data['data'][i]['CategoryName'] + `</option>`;
            }
            $('#CategoriesID').empty();
            $('#CategoriesID').append(list1);

        },
        error: function (request, status, error) {
            swal.fire("Hata!", "Bir sorun ile karşılaşıldı!", "error");
        }
    });
};
$('#CategoriesID').change(function myfunction() {
    var CategoryID = $('#CategoriesID').val();
    $.ajax({
        type: "POST",
        url: '/Announcement/SubCategoriesForAnnouncement?CategoryID=' + CategoryID,
        success: function (data) {
            debugger
            $('#SubCategoriesID').prop('disabled', false);
            var list1 = "";
            for (var i = 0; i < data['data'].length; i++) {
                list1 += `<option value="` + data['data'][i]['SubCategoriesID'] + `">` + data['data'][i]['SubCategoriesName'] + `</option>`;
            }
            $('#SubCategoriesID').empty();
            $('#SubCategoriesID').append(list1);
        },
        error: function (request, status, error) {
            swal.fire("Hata!", "Bir sorun ile karşılaşıldı!", "error");
        }
    });
});
function DeleteAnnouncement(id) {
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
                url: '/Announcement/DeleteAnnouncement',
                processData: false,
                contentType: false,
                data: formdata,
                success: function (data) {
                    window.location.href = '/Announcement/Index';
                },
            });

        } else if (result.dismiss === 'cancel') {
            swal.fire(
                "İptal!", "Silme İşlemi İptal Edildi!", "error"
            )
        }
    });
};


