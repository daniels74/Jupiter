import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BaseUrl } from '../../../Root/app.module';
import { WINDOW } from '../../../window-token';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Note } from '../../Interfaces/post';
import { Store } from '@ngrx/store';
import * as NoteActions from '../../../Shared/State/Actions/note.actions';
import { addNote } from '../../../Shared/State/Actions/note.actions';

@Injectable({
  providedIn: 'root',
})
export class UserPostService {
  constructor(
    @Inject(BaseUrl) private local_origin: string,
    @Inject(WINDOW) private window: Window,
    private http: HttpClient,
    private store: Store,
  ) {}

  origin = this.local_origin ? this.local_origin : this.window.location.origin;
  userPostsBehaviorSubject = new BehaviorSubject<any[]>([]);
  userPostsSubject = this.userPostsBehaviorSubject.asObservable();

  saveNewPost(post: string): void {
    this.http
      .post(this.origin + '/posting', {
        description: post,
      })
      .subscribe({
        next: (savedPost: any) => {
          console.log('POST savedPost from backend: ', savedPost);
          // Dispatch action to add post to store
          this.store.dispatch(
            addNote({
              note: {
                id: savedPost.id, // backend id
                description: savedPost.description,
                createdAt: savedPost.createdAt,
                updatedAt: savedPost.updatedAt,
              },
            }),
          );
        },
        error: (err) => console.error('Failed to save post', err),
      });
  }

  // Get Posts for current user
  // getAllUserPosts(): void {
  //   this.http
  //     .get(this.origin + `/posting`)
  //     .pipe(
  //       tap((posts: any) => {
  //         this.userPostsBehaviorSubject.next(posts);
  //         console.log('User Posts from Backend:', posts);
  //         return;
  //       }),
  //     )
  //     .subscribe();
  // }

  fetchUserNotes(): void {
    this.http
      .get<Note[]>(`${this.origin}/posting`) // or `/posting/${userId}` if needed
      .subscribe({
        next: (posts) => {
          // Dispatch into the store
          this.store.dispatch(NoteActions.loadNotes({ notes: posts }));
          console.log('Notes dispatched to store:', posts);
        },
        error: (err) => {
          console.error('Error fetching posts:', err);
        },
      });
  }

  // Delete a note by id
  deletePost(postId: number): void {
    this.http.delete(`${this.origin}/posting/${postId}`).subscribe({
      next: () => {
        this.store.dispatch(NoteActions.deleteNote({ id: postId }));
      },
      error: (err) => console.error(err),
    });
  }

  editPost(post: string | undefined, postId: number | undefined) {
    this.http
      .put(`${this.origin}/posting/${postId}`, { description: post })
      .subscribe({
        next: (updatedPost: any) => {
          this.store.dispatch(
            NoteActions.updateNote({
              note: {
                id: postId,
                description: updatedPost.description,
                createdAt: updatedPost.createdAt,
                updatedAt: updatedPost.updatedAt,
              },
            }),
          );
        },
        error: (err) => console.error('Failed to update post', err),
      });
  }
}
