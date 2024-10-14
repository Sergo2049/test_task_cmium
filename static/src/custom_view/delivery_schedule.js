/** @odoo-module */

import { registry } from "@web/core/registry"
import { Layout } from "@web/search/layout"
import { getDefaultConfig } from "@web/views/view"
import { useService } from "@web/core/utils/hooks"


const { Component, useSubEnv, useState, onMounted} = owl

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

        // this.webClient = useService("web_client");
        this.orm = useService("orm");
        this.state = useState({
            orm_data: [],
            currentDate: moment(),
            baseUrl: window.location.origin,

        })

        onMounted(() => {
            document.getElementById('current-date-container').innerText = this.state.currentDate.format('YYYY-MM-DD');
            try {
                this.getDataTable();
            } catch (error) {
                console.error('Error loading orders:', error);
                if (error.cause) {
                    console.error('Cause of error:', error.cause);
                }
            }
        })

        console.log("%c[class DeliveryScheduleServices]", "background: green");
        console.log("%c[this]:", "background: green", this);
    }
    showNotification(){
        console.log("Show notification");
    }

    getPreviousPeriod(){
        let currentDate = this.state.currentDate;
        currentDate = currentDate.subtract(7, 'days').calendar();
        this.getDataTable();
    }

    getNextPeriod(){
        let currentDate = this.state.currentDate;
        currentDate = currentDate.add(7, 'days').calendar();
        this.getDataTable();
    }

    async getDataTable(){

        let currentDate = this.state.currentDate.clone();
        let periods = [];
        for (let i = 0; i < 7; i++) {
            periods.push(currentDate.startOf('week').add(i, 'days').format('YYYY-MM-DD'));
        }
        console.log('periods', periods);

        let week_start = this.state.currentDate.startOf('week').format('YYYY-MM-DD');
        let week_end = this.state.currentDate.endOf('week').format('YYYY-MM-DD');
        console.log("week_start", week_start, "week_end",  week_end);

        const data = await this.orm.searchRead("sale.order", [['create_date', '>=', week_start],
        ['create_date', '<=', week_end]], ['date_order', 'name', 'partner_id']);

        console.log("%c[data]:", "background: green", data)

        if (!Array.isArray(data)) {
            throw new Error("Expected data to be an array");
        }

        data.forEach(order => {
            let object_date = new Date(order.date_order);
            order.start_of_day = object_date.toISOString().split('T')[0];
        })
        this.state.orm_data = data;
        

        
        const pivotTable = this.createPivotTable(data, periods)
        this.generateOrdersTable(pivotTable, periods);
    }



    createPivotTable(orders, dates) {
        let pivotTable = {}; // Создаем объект для сводной таблицы
    
        orders.forEach(order => { // Перебираем каждый заказ в массиве orders
            // Получаем имя партнера, если это массив, иначе используем "Без партнера"
            const deliveryPartner = Array.isArray(order.partner_id) ? order.partner_id[1] : "No partner"; 
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

            pivotTable[deliveryPartner][orderDate].push(order); 
        });
        console.log('pivotTable', pivotTable);
        return pivotTable; // Возвращаем сводную таблицу
    }
    
    generateOrdersTable(pivotTable, periods){

        // Create table head
        const table = document.createElement('table');
        table.classList.add('table', 'table-stripped', 'table-dark', 'table-boarded', 'table-hover');
        
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
            let trCell = document.createElement('th');
            trCell.innerText = rowValue;
            tr.appendChild(trCell);

            periods.forEach(period => {
                const orders = pivotTable[rowValue][period] || [];
                let trCell = document.createElement('td');
                trCell.addEventListener('click', (event) => this.handleCellClick(event));
                orders.forEach((order, index) =>{
                    const orderLink = document.createElement('a');
                    orderLink.href = `${this.state.baseUrl}/web#id=${order.id}&model=sale.order&view_type=form`;
                    orderLink.classList.add('badge', 'badge-warning'); 
                    orderLink.innerText = order.name;
                    orderLink.style.display = 'block'; 
                    trCell.appendChild(orderLink);
                })

                tr.appendChild(trCell);
            })
            tbody.appendChild(tr);
       }

    table.appendChild(tbody);
    document.getElementById('orders-table-container').replaceChildren(table);
    }

    // handleCellClick(event) {

    //     const cell = event.target;

    //     if (!event.target.innerText.trim() && cell.children.lenght === 0){
            
    //             this.webClient.doAction({
    //                 type: "ir.actions.act_window",
    //                 res_model: "sale.order",
    //                 view_mode: "form",
    //                 target: "current",
    //                 views: [[false, "form"]],
    //             });
            
    //     }
    // }
}

DeliveryScheduleServices.template = "test_tasks.DeliveryScheduleServicesTemplate";
DeliveryScheduleServices.components = { Layout }

registry.category("actions").add("test_tasks.DeliveryScheduleServices", DeliveryScheduleServices);
console.log("%c[add registry action] DeliveryScheduleServices", "background: green");