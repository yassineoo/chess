//status: string, possible values {'succes', 'failure'}
//token: string[64]


//==============================================================================================================
//---------------------------------LOGIN COMMANDS
//==============================================================================================================


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
