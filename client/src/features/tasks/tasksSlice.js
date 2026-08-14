import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    list: JSON.parse(localStorage.getItem('tasks')) || [],
};

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, action) => {
            state.list.push(action.payload);
        },
        deleteTask: (state, action) => {
            state.list = state.list.filter((task) => task.id !== action.payload);
        },
        toggleComplete: (state, action) => {
            const task = state.list.find((task) => task.id === action.payload);
            if (task) task.completed = !task.completed;
        },
        editTask: (state, action) => {
            const index = state.list.findIndex((task) => task.id === action.payload.id);
            if (index !== -1) state.list[index] = action.payload;
        },
    },
});

export const { addTask, deleteTask, toggleComplete, editTask } = tasksSlice.actions;
export default tasksSlice.reducer;