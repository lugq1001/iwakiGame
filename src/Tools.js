function getQueryString(name) {     
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");     
	var r = window.location.search.substr(1).match(reg);     
	if (r != null)
		return decodeURIComponent(r[2]);     
	return null; 
};

function request(url, params, isPost, callback, errorcallback){  
	cc.log("<Tools> request():" + url + " " + params + " " + isPost);
	if(url == null || url == '')         
		return;               
	var xhr = cc.loader.getXMLHttpRequest();     
	if(isPost){         
		xhr.open("POST",url);     
	}else{         
		xhr.open("GET",url);    
	}    
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); 
	xhr.onreadystatechange = function () {         
		if(xhr.readyState == 4 && xhr.status == 200){            
			var response = xhr.responseText;             
			if(callback)                 
				callback(response);         
		}else if(xhr.readyState == 4 && xhr.status != 200){             
			var response = xhr.responseText;             
			if(errorcallback)                 
				errorcallback(response);         
		}     
	};       
	if(params == null || params == ""){         
		xhr.send();     
	}else{         
		xhr.send(params);     
	} 
};
