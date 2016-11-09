// CONSTANTS
const
  GET_DATA = 'GET_DATA',
  GET_DATA_SUCCESS = 'GET_DATA_SUCCESS',
  GET_DATA_FAIL = 'GET_DATA_FAIL',
  UPDATE_MESSAGE = 'UPDATE_MESSAGE';

// REDUCER
const initialState = {
  loadingData : false,
  loadedData : false,
  loadDataError : false,
  message : 'RIP Big Pun'
};

export default function reducer(state = initialState, action) {

  switch(action.type) {

    case GET_DATA:
      return { 
        ...state,
        loadingData : true,
        loadedData : false,
        loadDataFailed : false,
        loadDataError : null
      };
    case GET_DATA_SUCCESS:
      return {
        ...state,
        loadingData : false,
        loadedData : true,
        loadDataFailed : false,
        loadDataError : null,
        data : action.data
      };
    case GET_DATA_FAIL:
      return {
        ...state,
        loadingData : false,
        loadedData : false,
        loadDataFailed : true,
        loadDataError : action.error,
        data : null
      };
    case UPDATE_MESSAGE:
      return { 
        ...state, 
        ...action.data 
      };
    default:
      return state;

  }

};


// ACTIONS
// temp array of messages to display
const messages = [ 
    'RIP Guru', 
    'Respect Nas', 
    'Joey Badass has a slick style', 
    'Dilated People Come First',
    'RIP Big Pun',
    'Big Pun is the greatest'
  ]
export const updateMessage = () => ( dispatch, getState ) => {
  let randomIndex = (new Date()).getMilliseconds() % 6;
  dispatch({
    type : UPDATE_MESSAGE,
    data : { message : messages[randomIndex] }
  })
}

/* ----------------- GET DATA ACTIONS START ----------------- */
import Fetcher from '../../util/Request';

export const getData = () => ({ type : GET_DATA });

export const getDataSuccess = data => ({ type : GET_DATA_SUCCESS, data });

export const getDataFail = error => ({ type : GET_DATA_FAIL, error });

// you will only call this method, not the above
export const getDataAsync = ( data, query ) => ( dispatch, getState ) => {
  const fetcher = new Fetcher();

  dispatch(getData());

  fetcher
    .fetch('/example/api', {
      method : 'get',
      query,
      data
    })
    .then((response) => {
      dispatch( getDataSuccess(response)); // { type :"",views : ...}
    })
    .catch((error) => {
      return dispatch(getDataFail({
        error
      }))
    });
}
/* ----------------- GET DATA ACTIONS END ----------------- */