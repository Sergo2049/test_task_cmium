/** @odoo-module */

import { registry } from "@web/core/registry";
import { RelationalModel } from "@web/views/basic_relational_model";
//import { ListArchParser } from "./list_arch_parser";
//import { ListController } from "./list_controller";
//import { ListRenderer } from "./list_renderer";
import { BeautifulController } from "./beautiful_controller";
import { BeautifulArchParser } from "./beautiful_arch_parser";
import { BeautifulModel } from "./beautiful_model";
import { BeautifulRenderer } from "./beautiful_renderer";

export const BeautifulView = {
    type: "beautiful",
    display_name: "Beautiful",
    icon: "oi oi-view-list",
    accessKey: "l",
    multiRecord: true,
    Controller: BeautifulController,
    Renderer: BeautifulRenderer,
    ArchParser: BeautifulArchParser,
    Model: RelationalModel,
//    buttonTemplate: "web.ListView.Buttons",

    props: (genericProps, view) => {
        const { ArchParser } = view;
        const { arch, relatedModels, resModel } = genericProps;
        const archInfo = new ArchParser().parse(arch, relatedModels, resModel);

        return {
            ...genericProps,
            Model: view.Model,
            Renderer: view.Renderer,
            buttonTemplate: view.buttonTemplate,
            archInfo,
        };
    },
};

registry.category("views").add("beautiful", BeautifulView);


///** @odoo-module */
//
//import { registry } from "@web/core/registry";
//import { BeautifulController } from "./beautiful_controller";
//import { BeautifulArchParser } from "./beautiful_arch_parser";
//import { BeautifulModel } from "./beautiful_model";
//import { BeautifulRenderer } from "./beautiful_renderer";
//
//export const beautifulView = {
//    type: "beautiful",
//    display_name: "Beautiful",
//    icon: "fa fa-picture-o", // the icon that will be displayed in the Layout panel
//    multiRecord: true,
//    Controller: BeautifulController,
//    ArchParser: BeautifulArchParser,
//    Model: BeautifulModel,
//    Renderer: BeautifulRenderer,
//
//    props(genericProps, view) {
//        const { ArchParser } = view;
//        const { arch } = genericProps;
//        const archInfo = new ArchParser().parse(arch);
//
//        return {
//            ...genericProps,
//            Model: view.Model,
//            Renderer: view.Renderer,
//            archInfo,
//        };
//    },
//};
//
//registry.category("views").add("beautifulView", beautifulView);
//console.log("beautiful view add")
