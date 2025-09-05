import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserPostService } from '../../../../../../../Core/Services/UserPost/user-post.service';
import { Note } from '../../../../../../../Core/Interfaces/post';

@Component({
  selector: 'user-note-card-large',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss'],
})
export class NoteCardComponent {
  @Input() note!: Note;

  constructor(private postService: UserPostService) {}

  deleteNote(noteId: number) {
    // optionally pass userId if your backend requires it
    this.postService.deletePost(noteId);
  }
}
