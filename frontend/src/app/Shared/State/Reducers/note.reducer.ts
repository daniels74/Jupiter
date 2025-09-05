// src/app/Shared/State/Reducers/note.reducer.ts
import { createReducer, on } from '@ngrx/store';
import * as NoteActions from '../Actions/note.actions';
import { Note } from '../../../Core/Interfaces/post';

export interface NoteState {
  notes: Note[];
}

export const initialState: NoteState = {
  notes: [],
};

export const noteReducer = createReducer(
  initialState,
  on(NoteActions.addNote, (state, { note }) => ({
    ...state,
    notes: [...state.notes, note],
  })),
  on(NoteActions.deleteNote, (state, { id }) => ({
    ...state,
    notes: state.notes.filter((n) => n.id !== Number(id)),
  })),
  on(NoteActions.loadNotes, (state, { notes }) => ({
    ...state,
    notes: [...notes],
  })),
);
