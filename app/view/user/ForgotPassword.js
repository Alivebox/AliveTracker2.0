Ext.define('AliveTracker.view.user.ForgotPassword',{

	extend: 'Ext.container.Container',
	alias: 'widget.forgotpassword',

	initComponent: function(){
        this.items = [
            {
                xtype: 'label',
                text: 'Forgot Password'
            }
        ];
		this.callParent(arguments);
	}
	
});