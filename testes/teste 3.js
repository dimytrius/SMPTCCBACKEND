            lathex = -12.9875;
            lnghex = -38.4611;
            
            var lat1 = lathex;
            var lat2;
            var lng1 = lnghex;
            var lng2;
            if(lat1!=lat2||lng1!=lng2){
                var distance = distance(lathex,lathex,lnghex,lnghex,'K'); 
                distance = Math.round(distance * 1000);
                if(distance>30){
                    device.push(
                        {
                          device: devicename,
                          latitude: lathex,
                          longitude: lnghex,
                          hour: hour,
                          date: date,
                          status: status,
                          battery:battery
                        })
                        lat2=lathex;
                    
                }else{
                    lat2=lathex;
                }
            }
            
            