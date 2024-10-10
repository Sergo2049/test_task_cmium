/** @odoo-module */

import { registry } from "@web/core/registry"
//import { Component } from "@odoo/owl"
import { Layout } from "@web/search/layout"
import { getDefaultConfig } from "@web/views/view"
import { useService } from "@web/core/utils/hooks"


const { Component, useSubEnv, useState } = owl

export class DeliveryScheduleServices extends Component{
    setup(){
        this.display = {
            controlPanel: {"top-right": false, "bottom-right": false}
        }
        useSubEnv({
            config: {
                ...getDefaultConfig(),
                ...this.env.config,
            }
        })
        this.orm = useService("orm");

        this.state = useState({
            orm_data: [],
            current_date: moment(),

        })
        console.log("%c[class DeliveryScheduleServices]", "background: green");
        console.log("%c[this]:", "background: green", this);
    }
    showNotification(){
        console.log("Show notification");
    }

    //getPeriods(){
        //let current_date = moment();
        //let periods = [];
        //for (let i = 0; i < 7; i++) {
        //    periods.push(current_date.startOf('week').add(i, 'days').format('dddd'));
        //}
       // console.log('periods', periods);
      // console.log('AAA')


    async getDataTable(){
//        Get periods
        let current_date = this.state.current_date;
        let periods = [];
        for (let i = 0; i < 7; i++) {
            periods.push(current_date.startOf('week').add(i, 'days').format('YYYY-MM-DD'));
        }
        console.log('periods', periods);

        let week_start = this.state.current_date.startOf('isoweek').format('YYYY-MM-DD');
        let week_end = this.state.current_date.endOf('isoweek').format('YYYY-MM-DD');
        console.log("week_start", week_start, "week_end",  week_end);

        const data = await this.orm.searchRead("res.partner", [['create_date', '>=', week_start],
        ['create_date', '<=', week_end]], ['create_date', 'name', 'email']);
//        console.log("DATA: ", week_start);
        this.state.orm_data = data;
    }



}

DeliveryScheduleServices.template = "test_tasks.DeliveryScheduleServicesTemplate";
DeliveryScheduleServices.components = { Layout }

registry.category("actions").add("test_tasks.DeliveryScheduleServices", DeliveryScheduleServices);
console.log("%c[add registry action] DeliveryScheduleServices", "background: green");