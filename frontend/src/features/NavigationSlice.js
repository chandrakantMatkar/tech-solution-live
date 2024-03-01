import { createSlice } from "@reduxjs/toolkit";

const navigationSlice = createSlice({
    name: 'navigate',
    initialState: {
        value: '/',
        url: '/'
    },
    reducers:{

    }
})

export default navigationSlice.reducer;