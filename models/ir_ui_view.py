from odoo import fields, models


class Viev(models.Model):
    _inherit = 'ir.ui.view'
    type = fields.Selection(selection_add=[('delivery_schedule', 'Delivery Schedule')])
