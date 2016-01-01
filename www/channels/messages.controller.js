/**
 * Created by Julius Hernandez on 10/3/2015.
 */
angular.module('ngfireApp')
    .controller("MessagesCtrl",
    ['profile', 'channelName', 'messages',
        function (profile, channelName, messages) {
            var messagesCtrl = this;
            
            messagesCtrl.messages = messages;
            messagesCtrl.channelName = channelName;
            
            //this will be for the messages field at the bottom of the view
            messagesCtrl.message = '';
            
            messagesCtrl.sendMessage = function () {
                if(messagesCtrl.message.length > 0){
                    //rem.$add is a fb array method 
                    messagesCtrl.messages.$add({
                        uid: profile.$id,
                        body: messagesCtrl.message,
                        timestampe: Firebase.ServerValue.TIMESTAMP
                    }).then(function () {
                        messagesCtrl.message = '';
                    });
                }
            }
        }
    ]
);
