# -*- coding: utf-8 -*-
from odoo import http
import json
from datetime import datetime

class TestTasks(http.Controller):
    @http.route('/test_tasks/courier', auth='public')
    def courier_info(self, **kw):
        day_start = datetime.today().strftime('%Y-%m-%d 00:00:00')
        day_end = datetime.today().strftime('%Y-%m-%d 23:59:59')
        courier_id = kw.get('courier_id')
        orders_domain = [('id', '=', int(courier_id)),
                          ('date_order', '>=', day_start),
                          ('date_order', '<=', day_end)]
        courier_info = http.request.env['res.partner'].sudo().search_read([('id', '=', int(courier_id))],
                                                                          ['name', 'phone', 'email'])
        orders = http.request.env['sale.order'].sudo().search_read([('delivery_partner_id', '=', int(courier_id))],
                                                                        ['name', 'partner_id', 'commitment_date'])

        response_data = {
            'courier_info':
                {'courier_id': courier_info.id,
                 'name': courier_info.name,
                 'phone': courier_info.phone,
                 'email': courier_info.email
                 },
            'orders':
                {
                    'order_id': orders.order_id

                }
        }
        print(res)
        return "http.request.render(res)"

#     @http.route('/test_tasks/test_tasks/objects', auth='public')
#     def list(self, **kw):
#         return http.request.render('test_tasks.listing', {
#             'root': '/test_tasks/test_tasks',
#             'objects': http.request.env['test_tasks.test_tasks'].search([]),
#         })

#     @http.route('/test_tasks/test_tasks/objects/<model("test_tasks.test_tasks"):obj>', auth='public')
#     def object(self, obj, **kw):
#         return http.request.render('test_tasks.object', {
#             'object': obj
#         })
