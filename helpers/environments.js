/*
     Title: Environment
     Description:Handle all Environment related things
     Author: Iqbal Hossain
     Date: 08-January-2022
     Modified: 08-January-2022
*/

//dependencies


//module scaffolding
const environments ={};

environments.staging={
    port: 3000,
    envName: 'staging',
    secretKey: 'Hello'
}

environments.production={
    port: 5000,
    envName: 'production',
    secretKey: 'Hello2'

}

//determain with environment was passed
const currentEnvironment= typeof(process.env.NODE_ENV)==='string' ? process.env.NODE_ENV: 'staging';

//export corresponding environment object
const environmentToExport= typeof(environments[currentEnvironment])==='object'? environments[currentEnvironment]: environments.staging;

module.exports=environmentToExport;
