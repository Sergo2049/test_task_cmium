/** @odoo-module */

import { registry } from '@web/core/registry'
import { KpiCard } from './kpi_card/kpi_card'
const { Component } = owl

export class CustomDashboard extends Component {

    
}

CustomDashboard.template = "test_tasks.CustomDashboard"
CustomDashboard.components = { KpiCard }

registry.category('actions').add('test_tasks.custom_dashboard', CustomDashboard)
console.log('%c[custom dashboard component added]', 'background: yellow; color: black')