

"use strict";

var KTCalendarExternalEvents = function () {
    debugger
    var initExternalEvents = function () {
        $('#kt_calendar_external_events .fc-event').each(function () {

            // store data so the calendar knows to render an event upon drop
            $(this).data('event', {
                title: $.trim($(this).text()), // use the element's text as the event title
                stick: true, // maintain when user navigates (see docs on the renderEvent method)
                className: $(this).data('color'),
                description: 'Lorem ipsum dolor eius mod tempor labore'
            });

            // make the event draggable using jQuery UI
            $(this).draggable({
                zIndex: 999,
                revert: true, // will cause the event to go back to its
                revertDuration: 0 //  original position after the drag
            });
        });
    }
    var initCalendar = function () {
        debugger
        var calendar = $('#kt_calendar');

        calendar.fullCalendar({
            isRTL: KTUtil.isRTL(),
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,agendaDay,listWeek'
            },
            eventLimit: true, // allow "more" link when too many events
            navLinks: true,
            events: '/Calendar/GetCalendarData',
            contentHeight: 1000,
            monthNames: ['Ocak', 'Subat', 'Mart', 'Nisan', 'Mayis', 'Haziran', 'Temmuz', 'Agustos', 'Eylul', 'Ekim', 'Kasim', 'Aralik'],
            monthNamesShort: ['Ocak', 'Subat', 'Mart', 'Nisan', 'Mayis', 'Haziran', 'Temmuz', 'Agustos', 'Eylul', 'Ekim', 'Kasim', 'Aralik'],
            dayNames: ['Pazar', 'Pazartesi', 'Sali', 'Carsamba', 'Persembe', 'Cuma', 'Cumartesi'],
            dayNamesShort: ['Pazar', 'Pazartesi', 'Sali', 'Carsamba', 'Persembe', 'Cuma', 'Cumartesi'],

            editable: true,           
            buttonText: {
                today: 'Bugun',
                month: 'Ay',
                week: 'Hafta',
                day: 'Gun',
                list: 'Liste',
                listMonth: 'Aylik Liste',
                listYear: 'Yillik Liste',
                listWeek: 'Haftalik Liste',
                listDay: 'Gunluk Liste'
            },
            editable: true,
            droppable: true, // this allows things to be dropped onto the calendar

            drop: function (date, jsEvent, ui, resourceId) {
                var sdate = $.fullCalendar.moment(date.format());  // Create a clone of the dropped date.
                sdate.stripTime();        // The time should already be stripped but lets do a sanity check.
                sdate.time('08:00:00');   // Set a default start time.

                var edate = $.fullCalendar.moment(date.format());  // Create a clone.
                edate.stripTime();        // Sanity check.
                edate.time('12:00:00');   // Set a default end time.

                $(this).data('event').start = sdate;
                $(this).data('event').end = edate;

                // is the "remove after drop" checkbox checked?
                if ($('#kt_calendar_external_events_remove').is(':checked')) {
                    // if so, remove the element from the "Draggable Events" list
                    $(this).remove();
                }
            },

            eventRender: function (event, element) {
                // default render
                if (element.hasClass('fc-day-grid-event')) {
                    element.data('content', event.description);
                    element.data('placement', 'top');
                    KTApp.initPopover(element);
                } else if (element.hasClass('fc-time-grid-event')) {
                    element.find('.fc-title').append('<div class="fc-description">' + event.description + '</div>');
                } else if (element.find('.fc-list-item-title').lenght !== 0) {
                    element.find('.fc-list-item-title').append('<div class="fc-description">' + event.description + '</div>');
                }
            }
        });
    }

    return {
        //main function to initiate the module
        init: function () {
            initExternalEvents();
            initCalendar();
        }
    };
}();

jQuery(document).ready(function () {
    KTCalendarExternalEvents.init();
});