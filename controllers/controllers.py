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
        orders_domain = [('delivery_partner_id', '=', int(courier_id)),
                         ('date_order', '>=', day_start),
                         ('date_order', '<=', day_end)]
        courier_info = http.request.env['res.partner'].sudo().search([('id', '=', int(courier_id))], limit=1)
        orders = http.request.env['sale.order'].sudo().search(orders_domain)

        orders_list = []
        for order in orders:
            orders_list.append(
                {
                    'order_id': order.id,
                    'order_number': order.name,
                    'client_name': order.partner_id.name,
                    'client_phone': order.partner_id.phone,
                    'delivery_address': order.partner_id.contact_address,
                    # TODO: where is delivery state?
                    'delivery_status': 'Delivered' if order.commitment_date else 'Awaiting delivery'
                }
            )
        response_data = {
            'courier_info':
                {
                    'courier_id': courier_info.id,
                    'name': courier_info.name,
                    'phone': courier_info.phone,
                    'email': courier_info.email
                },
            'orders': orders_list
        }
        print(response_data)
        return 'response_data'

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
