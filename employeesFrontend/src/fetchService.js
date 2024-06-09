
export const fetchEmployeesData = async ({ dispatch }) => {
  const API_LINK = 'https://dummy.restapiexample.com/api/v1/employees';
  try {
    const response = await fetch(API_LINK);
    
    if (response.ok) {
      const receivedData = await response.json();
      dispatch({
        type: 'fetch',
        data: receivedData.data
      });
    } else {
      let errorMessage = '';
      if (response.status === 429) {
        errorMessage = `${response.status}: Too many requests. Try again in a few minutes.`;
      } else {
        errorMessage = `${response.status}: ${response.statusText}`;
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
