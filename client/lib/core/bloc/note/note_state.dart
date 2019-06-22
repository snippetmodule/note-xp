import 'package:client/core/model/note.dart';
import 'package:equatable/equatable.dart';
import 'package:meta/meta.dart';

@immutable
abstract class NoteState extends Equatable {
  NoteState([List props = const []]) : super(props);
}

class NoteLoading extends NoteState {}

class NoteLoaded extends NoteState {
  final List<Note> fruits;

  NoteLoaded(this.fruits) : super([fruits]);
}