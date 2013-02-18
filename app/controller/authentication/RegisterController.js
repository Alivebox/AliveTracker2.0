Ext.define('AliveTracker.controller.authentication.RegisterController', {

    extend:"Ext.app.Controller",

    requires:[
        'AliveTracker.view.authentication.Register'
    ],
    refs: [

        {
            ref: 'email',
            selector: 'registerform [itemId=emailRegister]'
        },
        {
            ref: 'password',
            selector: 'registerform [itemId=passwordRegister]'
        },
        {
            ref:'newsletterselected',
            selector:'registerform [itemId=newsletterSelectedRegister]'
        }
    ],

    /**
     * Initializes components listeners
     */
    init:function () {
        this.control({
            'registerform':{
                registerAction:this.onRegisterAction

            }
        });
    },
    /**
     * Handles the logic of the register action
     */
    onRegisterAction:function () {
        var tmpPassword = this.getPassword().value;
        var tmpEmail = this.getEmail().value;
        var tmpNewsletterSelected = this.getNewsletterselected().value;
        debugger;
    }



});