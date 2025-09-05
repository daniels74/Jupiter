import { createAction, props } from '@ngrx/store';
import { Note } from '../../../Core/Interfaces/post';

// load notes
// export const loadNotes = createAction(
//   '[Note] Load Notes',
//   props<{ userId: string }>(),
// );
// note.actions.ts
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
