# -*- coding: utf-8 -*-
{
    'name': "test_tasks",

    'summary': """
        Short (1 phrase/line) summary of the module's purpose, used as
        subtitle on modules listing or apps.openerp.com""",

    'description': """
        Long description of module's purpose
    """,

    'author': "My Company",
    'website': "https://www.yourcompany.com",

    # Categories can be used to filter modules in modules listing
    # Check https://github.com/odoo/odoo/blob/16.0/odoo/addons/base/data/ir_module_category_data.xml
    # for the full list
    'category': 'Uncategorized',
    'version': '0.1',

    # any module necessary for this one to work correctly
    'depends': ['base', 'crm', 'sale', 'web'],

    # always loaded
    'data': [
        # 'security/ir.model.access.csv',
        'views/res_partner_views.xml',
        'views/crm_lead_views.xml',
        'views/sale_order_views.xml',
        'views/delivery_statistics_views.xml',
        'report/courier_delivery_report.xml',
        'views/delivery_schedule_views.xml',
    ],
    # only loaded in demonstration mode
    'demo': [
        'demo/demo.xml',
    ],
    'assets': {
        'web.assets_backend': [
                    # 'test_tasks/static/src/delivery_schedule/js/delivery_schedule_view.js',
            'test_tasks/static/src/customize_field/customize_field.js',
            'test_tasks/static/src/customize_field/customize_field_view.xml',
            'test_tasks/static/src/custom_view/beautiful_controller.js',
            'test_tasks/static/src/custom_view/beautiful_controller.xml',
            'test_tasks/static/src/custom_view/beautiful_renderer.js',
            'test_tasks/static/src/custom_view/beautiful_renderer.xml',
            'test_tasks/static/src/custom_view/beautiful_arch_parser.js',
            'test_tasks/static/src/custom_view/beautiful_model.js',
            'test_tasks/static/src/custom_view/beautiful_view.js',
            # 'test_tasks/static/src/custom_view/delivery_schedule.js',
            # 'test_tasks/static/src/custom_view/delivery_schedule_template.xml'
            # 'test_tasks/static/src/custom_view/cohort_view.js',
            # 'test_tasks/static/src/custom_view/cohort_view_template.xml'

        ],
    },
}
