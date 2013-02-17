Ext.define('AliveTracker.view.user.Login',{

	extend: 'Ext.container.Container',
	alias: 'widget.login',

	initComponent: function(){
        this.items = [
            {
                xtype: 'label',
                text: 'Login'
            },
            {
                xtype: 'button',
                text: 'Show Forgot Password Page',
                listeners: {
                    scope: this,
                    click: this.onShowForgotPasswordPageClick
                }
            }
        ];
		this.callParent(arguments);
	},

    onShowForgotPasswordPageClick: function(){
        this.fireEvent('showForgotPasswordPage');
    }
	
});