from odoo import models, fields


class Partner(models.Model):
    _inherit = 'res.partner'

    iam_delivery_partner = fields.Boolean(string='Is courier')
