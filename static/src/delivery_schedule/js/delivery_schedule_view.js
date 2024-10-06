odoo.define('test_tasks.DeliveryScheduleView', function (require) {
    "use strict";
    console.log('%c[define] test_taks.DeliverySchedule', 'background: green; color: white');
    var AbstractController = require('web.AbstractController');
    var AbstractModel = require('web.AbstractModel');
    var AbstractRenderer = require('web.AbstractRenderer');
    var AbstractView = require('web.AbstractView');
    var viewRegistry = require('web.view_registry');
    var core = require('web.core');

    var DeliveryScheduleController = AbstractController.extend({});
    var DeliveryScheduleRenderer = AbstractRenderer.extend({
        className: "o_delivery_schedule_view",

        // Функция рендера таблицы
        _render: function () {
            var self = this;
            this.$el.empty(); // Очищаем перед рендерингом

            // Добавление заголовка
            this.$el.append('<h1>Delivery Schedule</h1>');

            // Формируем таблицу
            var table = $('<table>').addClass('table table-striped');
            var thead = $('<thead>');
            var tbody = $('<tbody>');

            // Формируем заголовки столбцов (даты)
            var headerRow = $('<tr>');
            headerRow.append('<th>Курьер</th>');
            _.each(this.state.dates, function (date) {
                headerRow.append('<th>' + date + '</th>');
            });
            thead.append(headerRow);

            // Формируем строки с курьерами и доставками
            _.each(this.state.couriers, function (courier) {
                var row = $('<tr>');
                row.append('<td>' + courier.name + '</td>');

                _.each(self.state.dates, function (date) {
                    var delivery = self.state.deliveries[courier.id][date] || '-';
                    row.append('<td>' + delivery + '</td>');
                });

                tbody.append(row);
            });

            table.append(thead).append(tbody);
            this.$el.append(table);

            return $.when();
        }
    });

    var DeliveryScheduleModel = AbstractModel.extend({
        // Загрузка данных для графика доставок
        load: function (params) {
            return this._rpc({
                model: 'your.model',
                method: 'get_delivery_schedule_data',
                args: [],
            }).then(function (result) {
                return {
                    couriers: result.couriers,
                    dates: result.dates,
                    deliveries: result.deliveries
                };
            });
        }
    });

    var DeliveryScheduleView = AbstractView.extend({
        config: {
            Model: DeliveryScheduleModel,
            Controller: DeliveryScheduleController,
            Renderer: DeliveryScheduleRenderer,
        },
        viewType: 'delivery_schedule',
    });

    // Регистрация действия в action_registry
    core.action_registry.add('delivery_schedule_action', DeliveryScheduleView);

    viewRegistry.add('delivery_schedule', DeliveryScheduleView);
    console.log('%c[add view registry] test_taks.DeliverySchedule', 'background: green; color: white');
    return DeliveryScheduleView;
});
