import 'package:client/core/model/note_entity.dart';
import 'package:equatable/equatable.dart';
import 'package:meta/meta.dart';

@immutable
abstract class NoteEvent extends Equatable {
  NoteEvent();

  @override
  List<Object> get props => [];
}

class LoadEvent extends NoteEvent {}

//class AddNote extends NoteEvent {
//  final Note note;
//
//  AddNote(this.note) : super([note]);
//}

class AddOrUpdateEvent extends NoteEvent {
  final NoteEntity note;

  AddOrUpdateEvent(this.note);

  @override
  List<Object> get props => [note];
}

class DeleteEvent extends NoteEvent {
  final NoteEntity note;

  DeleteEvent(this.note);

  @override
  List<Object> get props => [note];
}
