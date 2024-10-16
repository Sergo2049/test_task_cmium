from odoo import api, fields, models
from dateutil.relativedelta import relativedelta


class DeliverySchedule(models.Model):
    _name = "shift.schedule"
    _description = "Delivery Schedule"

    courier_id = fields.Many2one(
        "res.partner", required=True, domain=[("iam_delivery_partner", "=", True)]
    )
    shift_date = fields.Date(required=True)

    shift = fields.Selection(
        selection=[
            ("8_18", "8:00 - 18:00"),
            ("9_19", "9:00 - 19:00"),
            ("10_20", "10:00 - 20:00"),
        ],
        required=True,
    )

    display_name = fields.Char(compute="_compute_display_name")

    orders_sum = fields.Monetary(
        compute="_compute_orders_sum", currency_field="currency_id"
    )

    currency_id = fields.Many2one(
        "res.currency",
        "Currency",
        default=lambda self: self.env.company.currency_id,
        readonly=True,
    )

    @api.depends("courier_id", "shift_date", "shift")
    def _compute_display_name(self):
        for rec in self:
            rec.display_name = "{} - {} - {}".format(
                rec.courier_id.name, rec.shift_date, rec.shift
            )

    @api.depends("courier_id", "shift_date")
    def _compute_orders_sum(self):
        for rec in self:
            if rec.shift_date:
                start_date = rec.shift_date.replace(day=1)
                end_date = (
                    rec.shift_date.replace(day=1) + relativedelta(months=1)
                ) - relativedelta(days=1)
                orders = self.env["sale.order"].search(
                    [
                        ("delivery_partner_id", "=", rec.courier_id.id),
                        ("date_order", ">=", start_date),
                        ("date_order", "<=", end_date),
                    ]
                )
                rec.orders_sum = sum(orders.mapped("amount_total"))
            else:
                rec.orders_sum = 0
