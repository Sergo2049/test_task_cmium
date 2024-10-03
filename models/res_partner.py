from odoo import models, fields
from dateutil.relativedelta import relativedelta

class Partner(models.Model):
    _inherit = 'res.partner'

    iam_delivery_partner = fields.Boolean(string='Is courier')

    def _get_monthly_deliveries(self):

        # docs = self.env['res.partner'].browse(docids)
        today = fields.Date.today()
        start_date = today.replace(day=1)
        end_date = (today.replace(day=1) + relativedelta(months=1)) - relativedelta(days=1)
        domain = [('date_order', '>=', start_date),
                  ('date_order', '<=', end_date),
                  ('delivery_partner_id', '=', self.id),
                  ('state', '=', 'sale')]
        deliveries = self.env['sale.order'].sudo().search(domain)

        total_sum = sum(order.amount_total for order in deliveries)

        deliveries_data = {
            'start_date': start_date,
            'end_date': end_date,
            'deliveries': deliveries,
            'total_sum': total_sum
        }
        return deliveries_data