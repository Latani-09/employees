
export const fetchEmployeesData = async ({ dispatch }) => {
  const API_LINK = 'https://dummy.restapiexample.com/api/v1/employees';
  try {
    let response = await fetch(API_LINK);
    
    if (response.ok) {
      let receivedData = await response.json();
      if (receivedData.data) {
        dispatch({
          type: 'fetch',
          data: receivedData.data
        });
      }
    } else {
      console.log(response);
      let errorMessage =''
      if (response.status==429){
        errorMessage = ` ${response.status}: Too many requests.\n Try again in few minutes`;
      }
      else{
        errorMessage = ` ${response.status}: ${response.statusText}`;
      }
      dispatch({
        type: 'error',
        error: errorMessage
      });
    }
  } catch (e) {
    dispatch({
      type: 'error',
      error: e.message
    });
  }
};
