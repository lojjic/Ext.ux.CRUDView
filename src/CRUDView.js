/**
 * Ext.ux.CRUDView is a meta-component which exposes a standard CRUD (create, read, update, and delete) interface for the
 * data records in a given {@link Ext.data.Store}.
 *
 * This component provides an out-of-the-box experience which only requires that the {@link #store} config is set; by
 * default it will introspect that store's {@link Ext.data.Model model} and automatically generate a list, detail
 * screen, and add/edit form based on the model's configured {@link Ext.data.Field fields}. However any of these
 * sub-components can be customized; see the {@link #list}, {@link #detail}, and {@link #form} configs for details.
 *
 *     Ext.create('Ext.ux.CRUDView', {
 *         store: 'people'
 *     });
 */
Ext.define('Ext.ux.CRUDView', {
    extend: 'Ext.navigation.View',
    xtype: 'crudview',

    config: {

        /**
         * @cfg {Ext.data.Store/Object/String} store
         * The data store whose data will be exposed for viewing and modifying.
         */
        store: null,

        /**
         * @cfg {String} storeName
         * An optional name to be displayed as the title of the initial list view. If not specified, the title will
         * default to the storeId or local class name of the {@link #store}.
         */
        storeName: null,

        /**
         * @cfg {String} titleField
         * The name of the data model field which will be used as the "title" of each record in the store. If not
         * specified, it will default to the first field defined on the data model.
         */
        titleField: null,

        /**
         * @cfg {Object/Ext.dataview.List} list
         * The configuration for the List component that displays all the records in the {@link #store}. This can be
         * overridden to provide custom list display or behavior; for instance to customize the content displayed for
         * each list item you can specify a custom {@link Ext.dataview.List#itemTpl itemTpl}:
         *
         *     list: {
         *         itemTpl: '{lastName}, {firstName} {middleInitial}.'
         *     }
         */
        list: {
            itemId: 'list',
            disableSelection: true,
            itemTpl: '{[ this.getRecordTitle(values) ]}'
        },

        /**
         * @cfg {Object/Ext.Component} detail
         * The configuration for the detail view of a single data record. Defaults to a simple
         * {@link Ext.Container container} with an auto-generated {@link Ext.Component#tpl tpl} which displays all
         * the record's field values in a table. This can be overridden to provide a custom display; for instance
         * to customize the tpl:
         *
         *     detail: {
         *         tpl: [
         *             '<h2>{lastName}, {firstName} {middleInitial}.</h2>',
         *             '<p>{age} years old</p>',
         *             '<div class="bio">{biography}</div>'
         *         ]
         *     }
         */
        detail: {
            itemId: 'detail',
            scrollable: true,
            styleHtmlContent: true
        },

        /**
         * @cfg {Object/Ext.form.Panel} form
         * The configuration for the form used for editing a record's data or adding a new record to the {@link #store}.
         * By default the fields within this form will be automatically generated based on the configured
         * {@link Ext.data.Field fields} of the store's {@link Ext.data.Model model}. This can be overridden to
         * provide a custom set of fields rather than the generated set, for example:
         *
         *     form: {
         *         items: [{
         *             xtype: 'fieldset',
         *             title: 'Name',
         *             defaultType: 'textfield',
         *             items: [{
         *                 name: 'firstName',
         *                 label: 'First'
         *             }, {
         *                 name: 'middleInitial',
         *                 label: 'M.I.',
         *                 maxLength: 1
         *             }, {
         *                 name: 'lastName',
         *                 label: 'Last'
         *             }]
         *         }, {
         *             xtype: 'fieldset',
         *             title: 'Biography',
         *             items: {
         *                 xtype: 'textareafield',
         *                 name: 'biography'
         *             }
         *         }]
         *     }
         *
         * When specifying a custom set of form fields, the {@link Ext.field.Field#name name} of each field will be
         * used to load and save values between the form and the selected data record.
         */
        form: {
            itemId: 'form'
        },

        /**
         * @cfg {String} addTitle
         * The title that will be displayed in the navigation bar when the {@link #form} for creating a new data
         * record is displayed.
         */
        addTitle: 'Add',

        /**
         * @cfg {Ext.XTemplate/String[]/String} detailTitleTpl
         * A template that will be used to generate the navigation bar title for the {@link #detail} card. This
         * template is passed the data from the currently selected record, and defaults to displaying the value of the
         * {@link #titleField}. Can be overridden to provide a custom title format, for example:
         *
         *     detailTitleTpl: '{firstName} {lastName}'
         */
        detailTitleTpl: '{[ this.getRecordTitle(values) ]}',

        /**
         * @cfg {Ext.XTemplate/String[]/String} editTitleTpl
         * A template that will be used to generate the navigation bar title when the {@link #form} for editing a data
         * record is displayed. This template is passed the data from the currently selected record. It can be
         * overridden to provide a custom title format, for example:
         *
         *     detailTitleTpl: 'Editing {firstName}'
         */
        editTitleTpl: 'Edit {[ this.getRecordTitle(values) ]}',

        /**
         * @cfg {String} fieldInvalidCls
         * The CSS class added to fields in the {@link #form} which fail validation against the data model's
         * field types and {@link Ext.data.Model#validations validations}.
         */
        fieldInvalidCls: Ext.baseCSSPrefix + 'field-invalid',

        /**
         * @cfg {Object} fieldErrorMsgConfig
         * The configuration for the {@link Ext.Component component} displayed below invalid form fields for showing
         * the validation error messages.
         */
        fieldErrorMsgConfig: {
            xtype: 'component',
            cls: Ext.baseCSSPrefix + 'field-error-msg',
            tpl: '{message}',
            showAnimation: 'fadeIn'
        },

        /**
         * @cfg {Ext.Button/Object} addButton
         * The configuration for the "Add" {@link Ext.Button button}.
         */
        addButton: {
            text: 'Add',
            itemId: 'addBtn',
            align: 'right',
            ui: 'action',
            hidden: true,
            showAnimation: 'fadeIn'
        },

        /**
         * @cfg {Ext.Button/Object} deleteButton
         * The configuration for the "Delete" {@link Ext.Button button}.
         */
        deleteButton: {
            text: 'Delete',
            itemId: 'deleteBtn',
            align: 'right',
            ui: 'action',
            hidden: true,
            showAnimation: 'fadeIn'
        },

        /**
         * @cfg {String} deleteConfirmText
         * The text to be displayed in the confirmation dialog shown before deleting a record.
         */
        deleteConfirmText: 'Delete this record?',

        /**
         * @cfg {Ext.Button/Object} editButton
         * The configuration for the "Edit" {@link Ext.Button button}.
         */
        editButton: {
            text: 'Edit',
            itemId: 'editBtn',
            align: 'right',
            ui: 'action',
            hidden: true,
            showAnimation: 'fadeIn'
        },

        /**
         * @cfg {Ext.Button/Object} saveButton
         * The configuration for the "Save" {@link Ext.Button button}.
         */
        saveButton: {
            text: 'Save',
            itemId: 'saveBtn',
            align: 'right',
            ui: 'confirm',
            hidden: true,
            showAnimation: 'fadeIn'
        },

        // Allows the child views to be reused
        autoDestroy: false,

        control: {
            '': {
                activeitemchange: 'onActiveItemChange'
            },
            '#list': {
                itemtap: 'onListItemTap'
            },
            '#addBtn': {
                tap: 'onAddBtnTap'
            },
            '#deleteBtn': {
                tap: 'onDeleteBtnTap'
            },
            '#editBtn': {
                tap: 'onEditBtnTap'
            },
            '#saveBtn': {
                tap: 'onSaveBtnTap'
            },
            '#form field': {
                change: 'onFormFieldChange',
                keyup: 'onFormFieldChange',
                paste: 'onFormFieldChange',
                buffer: 100
            }
        }
    },

    initialize: function() {
        var me = this,
            navBar = me.getNavigationBar();

        me.callParent(arguments);

        // The default navigation bar impl caches the stack of titles, assuming they're
        // somewhat static. Since ours are more dynamic and depend on data records etc.,
        // we'll override getTitleText to handle dynamic values better.
        navBar.getTitleText = Ext.Function.bind(me.getNavBarTitleText, me);

        navBar.add([
            me.getAddButton(),
            me.getDeleteButton(),
            me.getEditButton(),
            me.getSaveButton()
        ]);

        me.push(me.getList());
        me.onActiveItemChange(me, me.getList());
    },

    getNavBarTitleText: function() {
        var me = this,
            store = me.getStore(),
            card = me.getActiveItem(),
            tpl, record;
        switch (card) {
            case me.getList():
                return me.getStoreName() || (store ? (store.getStoreId() || store.$className.split('.').pop()) : '') || '';

            case me.getDetail():
                tpl = me.getDetailTitleTpl();
                record = card.getRecord();
                return (tpl && record) ? tpl.apply(record.getData()) : '';

            case me.getForm():
                if (card.getRecord()) {
                    tpl = me.getEditTitleTpl();
                    record = card.getRecord();
                    return (tpl && record) ? tpl.apply(record.getData()) : '';
                } else {
                    return me.getAddTitle();
                }
        }
        return '';
    },

    getTitleField: function() {
        var value = this._titleField,
            store, firstField;
        if (!value) {
            store = this.getStore();
            if (store) {
                value = store.$crudFirstField;
                if (!value) {
                    firstField = store.getModel().getFields().getAt(0);
                    value = store.$crudFirstField = firstField ? firstField.getName() : null;
                }
            }
        }
        return value;
    },

    applyDetailTitleTpl: function(config) {
        return this.$applyTitleTpl(config);
    },

    applyEditTitleTpl: function(config) {
        return this.$applyTitleTpl(config);
    },

    $applyTitleTpl: function(config) {
        if (config) {
            if (!config.isTemplate) {
                config = Ext.create('Ext.XTemplate', config);
            }
            config.getRecordTitle = Ext.Function.bind(this.getTitleFieldValue, this);
        }
        return config;
    },

    getTitleFieldValue: function(data) {
        return data[this.getTitleField()];
    },

    applyList: function(config) {
        var me = this,
            list = Ext.factory(config, 'Ext.dataview.List', me.getList());
        list.getItemTpl().getRecordTitle = Ext.Function.bind(me.getTitleFieldValue, me);
        list.setStore(me.getStore());
        return list;
    },

    applyDetail: function(config) {
        return Ext.factory(config, 'Ext.Container', this.getDetail());
    },

    updateDetail: function(newDetail, oldDetail) {
        if (oldDetail) {
            delete oldDetail.$crudGenerated;
        }
        this.populateDetailTpl();
    },

    applyForm: function(config) {
        return Ext.factory(config, 'Ext.form.Panel', this.getForm());
    },

    updateForm: function(newForm, oldForm) {
        if (oldForm) {
            delete oldForm.$crudGenerated;
        }
        this.populateForm();
    },

    applyAddButton: function(config) {
        return Ext.factory(config, 'Ext.Button', this.getAddButton());
    },

    applyDeleteButton: function(config) {
        return Ext.factory(config, 'Ext.Button', this.getDeleteButton());
    },

    applyEditButton: function(config) {
        return Ext.factory(config, 'Ext.Button', this.getEditButton());
    },

    applySaveButton: function(config) {
        return Ext.factory(config, 'Ext.Button', this.getSaveButton());
    },

    applyStore: function(store) {
        if (store) {
            store = Ext.data.StoreManager.lookup(store);
        }
        return store;
    },

    updateStore: function(newStore, oldStore) {
        var me = this,
            list = me.getList(),
            navBar = me.getNavigationBar();

        if (oldStore) {
            delete oldStore.$crudFirstField;
        }

        if (list) {
            list.setStore(newStore);
        }

        me.reset();

        // force update of the list's title
        if (navBar) {
            navBar.setTitle(navBar.getTitleText());
        }

        // rebuild the detail tpl and form fields if necessary
        me.populateDetailTpl();
        me.populateForm();
    },

    fieldTypes: {
        'bool': 'checkboxfield',
        'date': 'datepickerfield',
        'int': 'numberfield', //spinnerfield
        'float': 'numberfield'
    },

    populateForm: function() {
        var me = this,
            form = me.getForm(),
            store = me.getStore(),
            model = store && store.getModel(),
            modelFields = model && model.getFields(),
            fieldConfigs;

        if (form && store && modelFields && (form.$crudGenerated || !form.getItems().length)) {
            fieldConfigs = [];
            modelFields.each(function(field) {
                var name = field.getName();
                if (name !== model.getIdProperty()) {
                    fieldConfigs.push({
                        xtype: me.fieldTypes[field.getType().type] || 'textfield',
                        name: name,
                        label: name
                        // TODO mark required if there is a presence validation on the model
                    });
                }
            });
            form.setItems({
                xtype: 'fieldset',
                items: fieldConfigs
            });
            form.$crudGenerated = true;
        }
    },

    populateDetailTpl: function() {
        var me = this,
            detail = me.getDetail(),
            store = me.getStore(),
            model = store && store.getModel(),
            modelFields = model && model.getFields(),
            tpl;

        if (detail && store && modelFields && (!detail.getTpl() || detail.$crudGenerated)) {
            tpl = ['<table class="crud-detail"><tbody>'];
            modelFields.each(function(field) {
                var name = field.getName();
                if (name !== model.getIdProperty()) {
                    tpl.push('<tr><th>', name, '</th><td>{', name, '}</td></tr>');
                }
            });
            tpl.push('</tbody></table>');
            detail.setTpl(tpl);
            detail.$crudGenerated = true;
        }
    },

    clearFormErrors: function() {
        var me = this,
            form = me.getForm();
        form.query('[isErrorMsg]').forEach(function(msg) {
            msg.hide();
        });
        form.query('field').forEach(function(field) {
            field.removeCls(me.getFieldInvalidCls());
        });

    },

    onActiveItemChange: function(navView, item) {
        var me = this;
        me.getAddButton()[item === me.getList() ? 'show' : 'hide']();
        me.getDeleteButton()[item === me.getDetail() ? 'show' : 'hide']();
        me.getEditButton()[item === me.getDetail() ? 'show' : 'hide']();
        me.getSaveButton()[item === me.getForm() ? 'show' : 'hide']();
    },

    onListItemTap: function(list, index, el, record) {
        var detail = this.getDetail();
        detail.setRecord(record);
        this.push(detail);
    },

    onAddBtnTap: function() {
        var me = this,
            form = me.getForm();
        me.clearFormErrors();
        form.setRecord(null);
        form.reset();
        me.push(form);
        me.getSaveButton().enable();
    },

    onDeleteBtnTap: function() {
        Ext.Msg.confirm('', this.getDeleteConfirmText(), function(buttonId) {
            if (buttonId === 'yes') {
                this.getStore().remove(this.getDetail().getRecord());
                this.pop();
            }
        }, this);
    },

    onEditBtnTap: function() {
        var me = this,
            form = me.getForm();
        me.clearFormErrors();
        form.setRecord(me.getDetail().getRecord());
        me.initialFormValues = form.getValues();
        me.push(form);
        me.getSaveButton().disable(); //gets enabled when the form becomes dirty
    },

    onSaveBtnTap: function() {
        var me = this,
            form = me.getForm(),
            store = me.getStore(),
            record = form.getRecord(),
            isAdding = !record,
            invalidCls = me.getFieldInvalidCls(),
            errors;

        if (isAdding) {
            record = store.getModel().create();
        }

        me.clearFormErrors();
        record.beginEdit();
        form.updateRecord(record);
        errors = record.validate();

        if (errors.isValid()) {
            record.endEdit();
            if (isAdding) {
                store.add(record);
            }
            if (record === me.getDetail().getRecord()) {
                me.getDetail().setRecord(record);
            }
            me.pop();
        } else {
            record.cancelEdit();
            errors.each(function(error) {
                var fieldName = error.getField(),
                    field = form.down('field[name="' + fieldName + '"]'),
                    msg = form.down('[forField="' + fieldName + '"]');
                if (field) {
                    field.addCls(invalidCls);
                    if (!msg) {
                        msg = Ext.factory(Ext.applyIf({
                            isErrorMsg: true,
                            forField: fieldName,
                            hidden: true
                        }, me.getFieldErrorMsgConfig()));
                        field.parent.insertAfter(msg, field);
                    }
                    msg.setData({field: fieldName, message: error.getMessage()});
                    msg.show();
                }
            });
        }
    },

    onFormFieldChange: function() {
        // if the form is now dirty, enable the Save button
        this.getSaveButton().setDisabled(
            // TODO is this safe, since it depends on property ordering?
            JSON.stringify(this.initialFormValues) === JSON.stringify(this.getForm().getValues())
        );
    }

});
