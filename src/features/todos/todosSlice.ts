import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: any = {
    userdata: JSON.parse(localStorage.getItem('token') as string) || null
}

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    Login(state, action:PayloadAction<any>) {
        state.userdata = action.payload
    },
  },
})

export const { Login } = todosSlice.actions
export default todosSlice.reducer


// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// interface User {
//   id: string;
//   name: string;
//   email: string;
// }

// interface UserState {
//   users: User | null;
//   outhchange: boolean;
// }

// const initialState: UserState = {
//   users: JSON.parse(localStorage.getItem("user") || "null"),
//   outhchange: false,
// };

// const userSlice = createSlice({
//   name: "user",
//   initialState,
//   reducers: {
//     login: (state, action: PayloadAction<any>) => {
//       state.users = action.payload;
//     },
//     logout: (state) => {
//       state.users = null;
//     },
//     outhchange: (state) => {
//       state.outhchange = true;
//     },
//   },
// });

// export const { login, logout, outhchange } = userSlice.actions;
// export default userSlice.reducer;