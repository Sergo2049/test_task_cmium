/** @odoo-module **/

import { Component } from "@odoo/owl";
import { registry } from "@web/core/registry";

class CohortView extends Component {
    setup() {
        this.model = this.props.model;  // Получаем модель из props
        this.records = this.model.load();  // Загружаем записи модели (можно заменить на вызов API)
    }

    static template = "cohort_view_template";  // Связываем с XML-шаблоном
}

// Регистрируем новое кастомное представление в реестре
registry.category("views").add("cohort", {
    Component: CohortView,
    props: {
        model: Object,  // Модель, с которой будет работать представление
    },
});
//registry.category("views").add("cohort", CohortView)
console.log("cohort view add");
