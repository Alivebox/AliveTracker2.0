/**
 * Created with JetBrains PhpStorm.
 * User: Andres
 * Date: 14/02/13
 * Time: 02:23 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define("AliveTracker.controller.group.AddUsersGroupController", {

    extend: "Ext.app.Controller",

    refs: [
        {
            ref: 'addUsersCombo',
            selector: 'addusersgroup #usersCombo'
        }
    ],

    init: function(){
        this.control({
            'addusersgroup': {
                boxready : this.onAddUsersGroupBoxReady,
                comboUsersKeyUp: this.filterComboUsers,
                addUserClick: this.addUser
            }
        });
    },

    onAddUsersGroupBoxReady:function(abstractcomponent, width, height, options){
        this.addListeners(abstractcomponent);
    },

    addListeners:function(abstractcomponent){
    },

    addUser:function(e, el){
        if(Ext.isEmpty(this.getAddUsersCombo().lastSelection[0])){
            return;
        }
        var tmpUser = this.getAddUsersCombo().lastSelection[0].data;
        var tmpModel = Ext.create('AliveTracker.model.User', {
            name: tmpUser.name,
            role: 'usr'
        });
        var tmpUsersStore = Ext.getStore('AssignedUsers');
        tmpUsersStore.add(tmpModel);
        tmpUsersStore.commitChanges();
    },

    getAddUserPopUp: function(){
        var tmpAddUserPopUp = Ext.create('AliveTracker.view.group.AddUsersGroupPopUp');
        tmpAddUserPopUp.show();
        return tmpAddUserPopUp;
    },

    filterComboUsers: function (argDataToFilter){
        var query = argDataToFilter.toLowerCase();
        var tmpStore = Ext.getStore('Users');
        tmpStore.clearFilter();
        tmpStore.filterBy(function(record, id) {
            var name_check = record.get('name').toLowerCase().indexOf(query)
            if( name_check > -1){
                return true;
            }
            else{
                return false;
            }
        });
    }

});