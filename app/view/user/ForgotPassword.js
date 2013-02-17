Ext.define('AliveTracker.view.user.ForgotPassword',{

	extend: 'Ext.container.Container',
	alias: 'widget.forgotpassword',

	initComponent: function(){
        this.items = [
            {
                xtype: 'label',
                text: 'Forgot Password'
            },
            {
                xtype: 'button',
                text: 'Show Login Page',
                listeners: {
                    scope: this,
                    click: this.onShowForgotPasswordPageClick
                }
            }
        ];
        this.callParent(arguments);
    },

    onShowForgotPasswordPageClick: function(){
        this.fireEvent('showLoginPage');
    }

});