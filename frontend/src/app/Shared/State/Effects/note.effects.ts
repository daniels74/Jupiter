import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { catchError, map, mergeMap, of } from 'rxjs';
import * as NoteActions from '../Actions/note.actions';
import { Note } from '../../../Core/Interfaces/post';

@Injectable()
export class NoteEffects {
  private origin = 'http://localhost:3000'; // adjust for your API

  loadNotes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NoteActions.loadNotes),
      mergeMap((action) =>
        this.http.get<Note[]>(`${this.origin}/posting`).pipe(
          map((notes) => NoteActions.loadNotesSuccess({ notes })),
          catchError((err) =>
            of(NoteActions.loadNotesFailure({ error: err.message })),
          ),
        ),
      ),
    ),
  );

//   addNote$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(NoteActions.addNote),
//       mergeMap((action) =>
//         this.http.post<Note>(`${this.origin}/posting`, action.note).pipe(
//           map((note) => NoteActions.addNoteSuccess({ note })),
//           catchError((err) =>
//             of(NoteActions.addNoteFailure({ error: err.message })),
//           ),
//         ),
//       ),
//     ),
//   );

//   deleteNote$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(NoteActions.deleteNote),
//       mergeMap((action) =>
//         this.http.delete(`${this.origin}/posting/${action.id}`).pipe(
//           map(() => NoteActions.deleteNoteSuccess({ id: action.id })),
//           catchError((err) =>
//             of(NoteActions.deleteNoteFailure({ error: err.message })),
//           ),
//         ),
//       ),
//     ),
//   );

  constructor(private actions$: Actions, private http: HttpClient) {}
}
