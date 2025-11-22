// src/app/Shared/State/Selectors/note.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { NoteState } from '../Reducers/note.reducer';

export const selectNoteState = createFeatureSelector<NoteState>('notes');

export const selectAllNotes = createSelector(
  selectNoteState,
  (state: NoteState) => state.notes,
);
