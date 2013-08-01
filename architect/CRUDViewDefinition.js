{
    "classAlias": "plugin.crudview",
    "className": "Ext.ux.CRUDView",
    "inherits": "Ext.navigation.View",
    "autoName": "MyCRUDView",
    "disableInitialView": false,
    "disableDuplication": false,
    "toolbox": {
        "name": "CRUD View",
        "iconCls": "icon-store",
        "category": "Views",
        "groups": [
            "Containers",
            "Views",
            "Third Party UX"
        ]
    },
    "configs": [
        {
            "name": "store",
            "type": "store",
            "hidden": false,
            "defaultValue": null,
            "merge": false
        },
        {
            "name": "storeName",
            "type": "string",
            "hidden": false,
            "defaultValue": null,
            "merge": false
        },
        {
            "name": "titleField",
            "type": "string",
            "hidden": false,
            "defaultValue": null,
            "merge": false
        },
        {
            "name": "list",
            "type": "object",
            "hidden": false,
            "defaultValue": "{\n    itemTpl: '{name}'\n}",
            "merge": false
        },
        /*
        {
            "name": "detail",
            "type": "Ext.Component",
            "hidden": false,
            "defaultValue": null,
            "merge": false
        },
        {
            "name": "form",
            "type": "Ext.form.Panel",
            "hidden": false,
            "defaultValue": null,
            "merge": false
        },
        */
        {
            "name": "addTitle",
            "type": "string",
            "hidden": false,
            "defaultValue": null,
            "merge": false
        },
        {
            "name": "detailTitleTpl",
            "type": "template",
            "hidden": false,
            "defaultValue": null,
            "merge": false
        },
        {
            "name": "editTitleTpl",
            "type": "template",
            "hidden": false,
            "defaultValue": null,
            "merge": false
        },
        {
            "name": "fieldInvalidCls",
            "type": "string",
            "hidden": false,
            "defaultValue": null,
            "merge": false
        },
        {
            "name": "fieldErrorMsgConfig",
            "type": "object",
            "hidden": false,
            "defaultValue": null,
            "merge": false
        },
        /*
        {
            "name": "addButton",
            "type": "Ext.Button",
            "hidden": false,
            "defaultValue": null,
            "merge": false
        },
        {
            "name": "deleteButton",
            "type": "Ext.Button",
            "hidden": false,
            "defaultValue": null,
            "merge": false
        },
        */
        {
            "name": "deleteConfirmText",
            "type": "string",
            "hidden": false,
            "defaultValue": null,
            "merge": false
        }
        /*
        {
            "name": "editButton",
            "type": "Ext.Button",
            "hidden": false,
            "defaultValue": null,
            "merge": false
        }
        */
    ]
}
