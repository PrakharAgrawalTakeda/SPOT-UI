import { environment } from "environments/environment"

export class GlobalVariables {



    //SPOT UI APPLICATION VARIABLES

    public static spotui: string = environment.SPOT_UI_URL

    //SPOT API APPLICATION VARIABLES


    public static apiurl: string = environment.SPOT_API_URL
    
    //process.env.NODE_ENV === 'development' ?

        //Mannat

        'https://tospotdev-api-gateway.azurewebsites.net/api/'

        //Nick&Toader

        // 'https://localhost:7288/api/'

        // Prakhar Local API

        // 'https://spot4api-dev.azurewebsites.net/api/'

        // 'https://localhost:5001/api/'

        // 'https://localhost:44304/api/'

        // 'https://localhost:7288/api/'

        : 'https://tospotdev-api-gateway.azurewebsites.net/api/'

}
