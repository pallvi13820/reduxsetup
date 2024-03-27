import {configureStore} from '@reduxjs/toolkit';

import CounterSlice from '../slices/CounterSlice';

const store = configureStore({
  reducer: {
    counter: CounterSlice,
    // Add other reducers here if needed
  },
});

export default store;
