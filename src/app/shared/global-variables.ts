import { environment } from "environments/environment"

export class GlobalVariables {



    //SPOT UI APPLICATION VARIABLES

    public static spotui: string = environment.SPOT_UI_URL

    //SPOT API APPLICATION VARIABLES


    public static apiurl: string = environment.SPOT_API_URL
    
    //process.env.NODE_ENV === 'development' ?

        
    public static version: string  = 'v 2.0.20'

}
