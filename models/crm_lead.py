from odoo import models, fields


class Lead(models.Model):
    _inherit = 'crm.lead'

    operator_id = fields.Many2one(comodel_name='res.partner',
                                  check_company=True, string='Operator')

    delivery_partner_id = fields.Many2one(comodel_name='res.partner',
                                   string='Delivery partner',
                                   check_company=True,
                                   domain=[('iam_delivery_partner', '=', True)])

    lead_source = fields.Selection([('advertising', 'Advertasing'),
                                    ('recommendation', 'Recommendation')],
                                   required=True)

    communication_channel = fields.Selection([('email', 'E-mail'),
                                              ('phone', 'Phone'),
                                              ('telegram', 'Telegram'), ],
                                             required=True)
