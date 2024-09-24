# -*- coding: utf-8 -*-
# from odoo import http


# class TestTasks(http.Controller):
#     @http.route('/test_tasks/test_tasks', auth='public')
#     def index(self, **kw):
#         return "Hello, world"

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
