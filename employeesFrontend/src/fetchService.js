export const fetchEmployeesData = async () => {
    const API_LINK = 'https://dummy.restapiexample.com/api/v1/employees';
    let cache = getCachedData('employeeData');
    if (cache && !cache.isStale) {
      console.log('Data cache found');
      return {data:cache.dataCached};
    } else {
      try {
        let response = await fetch(API_LINK);
        
        // Check if the response is OK
        if (response.ok) {
          let receivedData = await response.json();
          console.log(receivedData.data);
          if (receivedData.data) {
            cacheData('employeeData', receivedData.data);
            console.log('Fetching data');
            return {data:receivedData.data};
          }
        } else  {
          // Handle 429 Too Many Requests
          return {error:response.message}

      } }
      catch (e) {
        console.error(e);
        return { error: e.message };
      }
    }
  }
  
  export const cacheData = (key, data) => {
    const expiry = (Date.now() / 1000 + 300).toString(); // 5 minutes from now
    const cache = { expiry, dataCached: data };
    sessionStorage.setItem(key, JSON.stringify(cache));
  }
  
  export const getCachedData = (key) => {
    let cache = sessionStorage.getItem(key);
    if (cache) {
      const parsedCache = JSON.parse(cache);
      if (parsedCache.expiry > Date.now() / 1000) {
        return { isStale: false, dataCached: parsedCache.dataCached };
      } else {
        return { isStale: true, dataCached: parsedCache.dataCached };
      }
    }
    return null;
  }
  
