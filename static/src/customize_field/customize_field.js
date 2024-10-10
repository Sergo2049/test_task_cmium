/** @odoo-module */

import { registry } from "@web/core/registry";
import { BooleanField } from "@web/views/fields/boolean/boolean_field";
import { Component, xml } from "@odoo/owl";

class LateOrderBooleanField extends BooleanField {}
LateOrderBooleanField.template = "test_tasks.LateOrderBooleanField";

registry.category("fields").add("late_boolean", LateOrderBooleanField);