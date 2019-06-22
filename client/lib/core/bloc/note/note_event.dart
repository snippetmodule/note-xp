import 'package:client/core/model/note.dart';
import 'package:equatable/equatable.dart';
import 'package:meta/meta.dart';

@immutable
abstract class NoteEvent extends Equatable {
  NoteEvent([List props = const []]) : super(props);
}

class LoadEvent extends NoteEvent {}

//class AddNote extends NoteEvent {
//  final Note note;
//
//  AddNote(this.note) : super([note]);
//}

class AddOrUpdateEvent extends NoteEvent {
  final Note note;

  AddOrUpdateEvent(this.note) : super([note]);
}

class DeleteEvent extends NoteEvent {
  final Note note;

  DeleteEvent(this.note) : super([note]);
}
