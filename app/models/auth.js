var request = require('request-promise');
    username = "59f874e19e93a14edbf55ccd",
    password = "da1d5d3a093ad05f59e7827c26b6a6af",
    auth = "Basic " + new Buffer(username + ":" + password).toString("base64");
function get_device_list(){

    request(
    {
        url : "https://backend.sigfox.com/api/devicetypes",
        headers : {
            "Authorization" : auth
        }
    },
    function (error, response, body) {
        console.log(body);
        console.log('statusCode:', response && response.statusCode);  
    }
);}
function get_message(device_id){

      
      var options = {
          uri: 'https://backend.sigfox.com/api/devicetypes/'+device_id+'/messages?limit=2',
          headers: {
            "Authorization" : auth
          }
      } 
        return request(options).catch(function(erro){

        }); 
    }

function coordenat_data(device_id){
    
    get_message(device_id).then(function(response){
        device = JSON.stringify(response);
        console.log(device);
    })
    

        //var n = dados.search('data');
        //console.log(device);
        //console.log(dados);

}
//get_device_list();

coordenat_data('59f86c293c87894c07cf4984');