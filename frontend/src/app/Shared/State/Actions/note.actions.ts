import { createAction, props } from '@ngrx/store';
import { Note } from '../../../Core/Interfaces/post';

// load notes
export const loadNotes = createAction(
  '[Notes] Load Notes',
  props<{ notes: Note[] }>(), // ✅ expects array of notes
);
export const loadNotesSuccess = createAction(
  '[Note] Load Notes Success',
  props<{ notes: Note[] }>(),
);
export const loadNotesFailure = createAction(
  '[Note] Load Notes Failure',
  props<{ error: string }>(),
);

// add note
export const addNote = createAction('[Note] Add Note', props<{ note: Note }>());
export const addNoteSuccess = createAction(
  '[Note] Add Note Success',
  props<{ note: Note }>(),
);
export const addNoteFailure = createAction(
  '[Note] Add Note Failure',
  props<{ error: string }>(),
);

// delete note
export const deleteNote = createAction(
  '[Note] Delete Note',
  props<{ id: number }>(),
);
export const deleteNoteSuccess = createAction(
  '[Note] Delete Note Success',
  props<{ id: number }>(),
);
export const deleteNoteFailure = createAction(
  '[Note] Delete Note Failure',
  props<{ error: string }>(),
);

// edit note
export const updateNote = createAction(
  '[Note] Update Note',
  props<{ note: Note }>()
);

// Optional: if you prefer the common pattern with server round-trip:
export const updateNoteRequest = createAction(
  '[Note] Update Note Request',
  props<{ note: Note }>()
);

export const updateNoteSuccess = createAction(
  '[Note] Update Note Success',
  props<{ note: Note }>()
);

export const updateNoteFailure = createAction(
  '[Note] Update Note Failure',
  props<{ error: any }>()
);
