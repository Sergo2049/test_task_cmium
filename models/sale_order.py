from odoo import models, fields, api


class Order(models.Model):
    _inherit = 'sale.order'

    operator_id = fields.Many2one('res.partner', 'Operator id',
                                  related='opportunity_id.operator_id',
                                  readonly=False)

    delivery_partner_id = fields.Many2one(
        'res.partner',
        related='opportunity_id.delivery_partner_id')

    lead_source = fields.Selection(related='opportunity_id.lead_source')

    communication_channel = fields.Selection(
        related='opportunity_id.communication_channel')

    paid_invoices_amount = fields.Monetary(compute='_compute_paid_invoices_amount', currency_field='currency_id', store=True)

    payment_progress = fields.Float(compute='_compute_payment_progress')

    @api.depends('invoice_ids', 'invoice_ids.payment_state')
    def _compute_paid_invoices_amount(self):
        for order in self:
            paid_invoices = order.invoice_ids.filtered(lambda inv: inv.payment_state == 'paid')
            order.paid_invoices_amount = sum(paid_invoices.mapped('amount_total'))

    @api.depends('invoice_ids', 'invoice_ids.payment_state')
    def _compute_payment_progress(self):
        for order in self:
            if order.amount_total:
                order.payment_progress = 100 * order.paid_invoices_amount / order.amount_total
            else:
                order.payment_progress = 0
