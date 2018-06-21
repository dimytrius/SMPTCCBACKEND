const geolocation = require ('google-geolocation') ({
    key: 'AIzaSyB7dhi_XOHuYK5nq0NSkUxfgTqwIU2VIt4'
  });
  
  // Configure API parameters
  const params = {
    //considerIp: "false",
    wifiAccessPoints: [
      {
        macAddress: '28:28:5d:d6:39:8a',
        signalStrength: -94,
        signalToNoiseRatio: 0
       
      }
    ]
  };
  console.log(params);
  // Get data
  geolocation (params, (err, data) => {
    if (err) {
      console.log (err);
      return;
    }
  
    console.log (data);
  });