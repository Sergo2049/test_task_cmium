/** @odoo-module */

import { XMLParser } from "@web/core/utils/xml";

export class BeautifulArchParser extends XMLParser {
    parse(arch) {
        const xmlDoc = this.parseXML(arch);
        const fieldFromTheArch = xmlDoc.getAttribute("fieldFromTheArch");
        return {
            fieldFromTheArch,
        };
    }
}

/** @odoo-module */

export class BeautifulArchParser {
    /**
     * Метод для разбора архитектуры (arch) вида.
     * @param {Object} arch - XML-архитектура вида.
     * @param {Object} relatedModels - Связанные модели (если есть).
     * @param {string} resModel - Основная модель для представления.
     * @returns {Object} - Данные для рендеринга вида.
     */
    parse(arch, relatedModels = {}, resModel = '') {
        const fields = [];

        // Проходим по всем дочерним элементам архитектуры (например, <field>)
        arch.children.forEach((node) => {
            if (node.tag === 'field') {
                fields.push(node.attrs.name);  // Извлекаем имена полей
            }
        });

        // Возвращаем объект, который будет содержать информацию для рендеринга
        return {
            fields,
            relatedModels,
            resModel,
        };
    }
}
