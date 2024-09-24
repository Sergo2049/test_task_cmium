from odoo import models, fields


class Order(models.Model):
    _inherit = 'sale.order'

    operator_id = fields.Many2one('res.partner', 'Operator id',
    related='opportunity_id.operator_id')

