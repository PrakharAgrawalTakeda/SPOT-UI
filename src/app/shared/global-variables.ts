export class GlobalVariables {



    //SPOT UI APPLICATION VARIABLES

    public static spotui: string =  process.env.NODE_ENV === 'development' ? 'http://localhost:4200/' : 'https://salmon-grass-03d30f90f.1.azurestaticapps.net/'


    //SPOT API APPLICATION VARIABLES


    // public static apiurl: string = process.env.NODE_ENV === 'development' ?

        //Mannat

        'https://spotapi-gateway-dev.azurewebsites.net/api/'

        //Nick&Toader

        'https://localhost:7288/api/'

        // Prakhar Local API

        //'https://spot4api-dev.azurewebsites.net/api/'

        // 'https://localhost:5001/api/'

        // 'https://localhost:44304/api/'

        // 'https://localhost:7288/api/'

        : 'https://spotapi-gateway-dev.azurewebsites.net/api/'

}
