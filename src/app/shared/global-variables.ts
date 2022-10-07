export class GlobalVariables {

    //SPOT UI APPLICATION VARIABLES 
    //public static spotui: string = 'http://localhost:4200/'
    public static spotui: string =  process.env.NODE_ENV === 'development' ? 'http://localhost:4200/' : 'https://salmon-grass-03d30f90f.1.azurestaticapps.net/'

    //SPOT API APPLICATION VARIABLES
    // public static apiurl: string = 'https://spot4api-dev.azurewebsites.net/api/'
    // Prakhar Local API
    //public static apiurl: string = 'https://localhost:5001/api/'
    //public static apiurl: string = 'https://localhost:44304/api/'
    public static apiurl: string = 'https://localhost:7288/api/'
}