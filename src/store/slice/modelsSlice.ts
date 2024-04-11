import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Model } from '../../types';

interface ModelState {
    models: Model[];
}

const initialState: ModelState = {
    models: JSON.parse(localStorage.getItem('models') || '[]'),
};

const modelsSlice = createSlice({
    name: 'models',
    initialState,
    reducers: {
        setModels: (state, action: PayloadAction<Model[]>) => {
            state.models = action.payload;
            localStorage.setItem('models', JSON.stringify(action.payload));
        },
        addModel: (state, action: PayloadAction<Model>) => {
            state.models.push(action.payload);
            localStorage.setItem('models', JSON.stringify(state.models));
        },
        deleteModel: (state, action: PayloadAction<number>) => {
            state.models = state.models.filter(model => model.id !== action.payload);
            localStorage.setItem('models', JSON.stringify(state.models));
        },
        updateModel: (state, action: PayloadAction<Model>) => {
            const index = state.models.findIndex(model => model.id === action.payload.id);
            if (index !== -1) {
                state.models[index] = action.payload;
                localStorage.setItem('models', JSON.stringify(state.models));
            }
        },
    },
});

export const { setModels, addModel, deleteModel, updateModel } = modelsSlice.actions;
export default modelsSlice.reducer;