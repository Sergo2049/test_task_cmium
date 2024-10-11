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

        let current_date = this.state.current_date;
        let periods = [];
        for (let i = 0; i < 7; i++) {
            periods.push(current_date.startOf('week').add(i, 'days').format('YYYY-MM-DD'));
        }
        console.log('periods', periods);

        let week_start = this.state.current_date.startOf('isoweek').format('YYYY-MM-DD');
        let week_end = this.state.current_date.endOf('isoweek').format('YYYY-MM-DD');
        console.log("week_start", week_start, "week_end",  week_end);

        const data = await this.orm.searchRead("sale.order", [['create_date', '>=', week_start],
        ['create_date', '<=', week_end]], ['date_order', 'name', 'delivery_partner_id']);
        
        data.forEach(order => {
            let object_date = new Date(order.date_order);
            order.start_of_day = object_date.toISOString().split('T')[0];
        })
        this.state.orm_data = data;
        console.log("%c[data]:", "background: green", data)

        
        const pivotTable = this.createPivotTable(data, periods)
        this.generateOrdersTable(pivotTable, periods);
    }

    createPivotTable(orders, dates) {
        const pivotTable = {}; // Создаем объект для сводной таблицы
    
        orders.forEach(order => { // Перебираем каждый заказ в массиве orders
            // Получаем имя партнера, если это массив, иначе используем "Без партнера"
            const deliveryPartner = Array.isArray(order.delivery_partner_id) ? order.delivery_partner_id[1] : "No partner"; 
            const orderDate = order.start_of_day; // Получаем дату заказа
    
            // Если для этого партнера еще нет записи в сводной таблице, создаем ее
            if (!pivotTable[deliveryPartner]) {
                pivotTable[deliveryPartner] = {}; 
            }
    
            // Если для этого партнера еще нет записи по данной дате, создаем ее
            if (!pivotTable[deliveryPartner][orderDate]) {
                pivotTable[deliveryPartner][orderDate] = []; 
            }
    
            // Добавляем номер заказа в соответствующую ячейку сводной таблицы
            pivotTable[deliveryPartner][orderDate].push(order.name); 
        });
        console.log('pivot table', pivotTable)
        return pivotTable; // Возвращаем сводную таблицу
    }
    
    generateOrdersTable(pivotTable, periods){

        // Create table head
        const table = document.createElement('table');
        table.classList.add('table', 'table-bordered');
        
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr')

        const emptyHeaderCell = document.createElement('th');
        headerRow.appendChild(emptyHeaderCell);

        periods.forEach(period => {
            const th = document.createElement('th');
            th.innerText = period;
            headerRow.appendChild(th);
            
        });
        
        thead.appendChild(headerRow);
        table.appendChild(thead);
     
        const tbody = document.createElement('tbody');
        
    for(const rowValue in pivotTable){
        const tr = document.createElement('tr');
        let trCell = document.createElement('td');
        trCell.innerText = rowValue;
        tr.appendChild(trCell);

        periods.forEach(period => {
            const orders = pivotTable[rowValue][period] || [];
            const joined_orders = (orders.join(", ") || "");
            console.log(joined_orders);
            let trCell = document.createElement('td');
            trCell.innerText = joined_orders;
            tr.appendChild(trCell);
        })
        table.appendChild(tr);
       }

        // Object.keys(ordersData).forEach(deliveryPartner =>{
        //     const tr = document.createElement('tr');
        //     console.log('deliveryPartner', deliveryPartner);
        //     const trCell = document.createElement('td');
        //     trCell.innerText = deliveryPartner;
        //     tr.appendChild(trCell);
            
            // periods.forEach(period => {
            //     let td = document.createElement('td');
            //     let order_id = ordersData[deliveryPartner][period];
            //     console.log('order_id', order_id);
            //     td.innerText = 
            // })

            
        // })
        document.getElementById('orders-table-container').appendChild(table);
    }
}

DeliveryScheduleServices.template = "test_tasks.DeliveryScheduleServicesTemplate";
DeliveryScheduleServices.components = { Layout }

registry.category("actions").add("test_tasks.DeliveryScheduleServices", DeliveryScheduleServices);
console.log("%c[add registry action] DeliveryScheduleServices", "background: green");