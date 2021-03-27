const SET_DATA = "SET_DATA";

let initialState = [];

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DATA: {
      return { ...action.state };
    }
    default: {
      return state;
    }
  }
};


export const setState = (state) => ({ type: SET_DATA, state });

export default dataReducer;