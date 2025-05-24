"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DropDownHelper = /** @class */ (function () {
    function DropDownHelper() {
    }
    DropDownHelper.prototype.getLeadSource = function () {
        return [{ id: "99Acres", value: "99Acres" },
            { id: "Magicbriks", value: "Magicbricks" },
            { id: "Commonflor", value: "Commonfloor" },
            { id: "Sulekha", value: "Sulekha" },
            { id: "Makkan", value: "Makkan" },
            { id: "Indiaproperty", value: "Indiaproperty" },
            { id: "Justdial", value: "Justdial" },
            { id: "Mailer", value: "Mailer" },
            { id: "Sms", value: "Sms" },
            { id: "Website", value: "Website" },
            { id: "Broker", value: "Broker" },
            { id: "Vartcual no", value: "Vartcual no" },
            { id: "Tollfree", value: "Tollfree" },
            { id: "Propertywala", value: "Propertywala" },
            { id: "Walkin", value: "Walkin" },
            { id: "PPC LEAD", value: "PPC LEAD" },
            { id: "nobroker.in", value: "nobroker.in" },
            { id: "housing.com", value: "housing.com" },
            { id: "quikr", value: "quikr" },
            { id: "Other source", value: "Other source" }];
    };
    DropDownHelper.prototype.getLeadStatus = function () {
        return [{ id: 1, value: "New" },
            { id: 2, value: "Answered" },
            { id: 3, value: "Scheduled" },
            { id: 4, value: "Deactivated" },
            { id: 5, value: "Closed" },
            { id: 6, value: "Visited" },
            { id: 7, value: "Broker" },
            { id: 8, value: "Rent" },
            { id: 9, value: "Hot" }];
    };
    DropDownHelper.prototype.getLeadType = function () {
        return [
            { id: "Individual", value: "Individual" },
            { id: "Dealer", value: "Dealer" }
        ];
    };
    return DropDownHelper;
}());
exports.DropDownHelper = DropDownHelper;
