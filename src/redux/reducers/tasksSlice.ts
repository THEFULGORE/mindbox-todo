import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface todoTask {
	text: string;
	checked: boolean;
}

interface todoState {
	tasks: todoTask[];
}

const initialState: todoState = {
	tasks: [
		{ text: 'one', checked: false },
		{ text: 'two', checked: true },
		{ text: 'three', checked: true },
	],
};

export const tasksSlice = createSlice({
	name: 'tasks',
	initialState,
	reducers: {
		setTodos: (state, action: PayloadAction<any>) => {
			state.tasks.unshift(action.payload);
		},
		setChecked: (state, action: PayloadAction<any>) => {
			state.tasks[action.payload.index].checked = action.payload.checked;
		},
		setCompleted: (state, action: PayloadAction<any>) => {
			state.tasks = action.payload;
		},
	},
});

export const { setTodos, setChecked, setCompleted } = tasksSlice.actions;
