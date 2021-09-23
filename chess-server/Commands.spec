//status: string, possible values {'succes', 'failure'}


//==============================================================================================================
//---------------------------------LOGIN COMMANDS
//==============================================================================================================
    //=============================================================//
    NOTE :: AFTER SIGNIN, THE USER SHALL RECEIVE A MAIL, WHERE HE CAN FIND A LINK 
    THAT IF CLICKED, WILL CONFIRM THE USER INSCRPTION

    commande: 'signIn'
    parameters:{
        email, pseudo, password
    }
    return:{
        status,
        errorMessage,
    }

    //=============================================================//
    commande: 'logIn'
    parameters:{
        [email or pseudo], password
    }
    return:{
        status,
        token, 
        errorMessage,
    }

    //=============================================================//
    commande: 'logAsGuest'
    parameters:{
        
    }
    return:{
        status,
        name, //ex: Guest_145
        token, 
        errorMessage,
    }

    //=============================================================//
    commande: 'logOut'
    parameters:{
        token
    }
    return:{
        status,
        errorMessage,
    }

//==============================================================================================================
//---------------------------------ROOM COMMANDS (WAITING ROOM)
//==============================================================================================================

    NOTE:: ALL THE COMMANDS BELOW SHALL HAVE A TOKEN AS A PARAMETER

    //=============================================================//
    commande: 'createRoom'
    parameters:{
        token,
        roomPassword,
    }
    return:{
        status,
        roomID,
        errorMessage,
    }

    //=============================================================//
    commande: 'joinRoom'
    parameters:{
        token,
        roomID,
        roomPassword,
    }
    return:{
        status,
        errorMessage,
    }

    //=============================================================//
    commande: 'joinRoomAsSpec'
    parameters:{
        token,
        roomID,
    }
    return:{
        status,
        errorMessage,
    }

    //=============================================================//
    commande: 'quitRoom'
    parameters:{
        token,
        roomID,
    }
    return:{
        status,
        errorMessage,
    }
    
    //=============================================================//
    anthorization: roomOwner
    commande: 'changeRoomParameters'
    parameters:{
        token,
        roomID,
        roomPassword,

        newRoomParameters,
    }
    return:{
        status,
        errorMessage,
    }

    //=============================================================//
    anthorization: roomOwner
    commande: 'lauchGame'
    parameters:{
        token,
        roomID,
        roomPassword,
    }
    return:{
        status,
        errorMessage,
    }  

//==============================================================================================================
//---------------------------------ROOM COMMANDS (MATCH ROOM)
//==============================================================================================================

    //=============================================================//
    commande: 'lookForMatch'
    parameters:{
        token,
    }
    return:{
        status,
        errorMessage,
    }

    //=============================================================//
    commande: 'cancelLookForMatch'
    parameters:{
        token,
    }
    return:{
        status,
        errorMessage,
    }

//==============================================================================================================
//---------------------------------ROOM COMMANDS (CHAT ROOM)
//==============================================================================================================

    //=============================================================//
    commande: 'sendMessage'
    parameters:{
        token,
        roomID,
        roomPassword,
    }
    return:{
        status,
        errorMessage,
    }

//==============================================================================================================
//---------------------------------ROOM COMMANDS (GAME MODE)
//==============================================================================================================

//A suivre
