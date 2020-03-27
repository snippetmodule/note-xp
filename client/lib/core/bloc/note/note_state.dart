import 'package:client/core/model/note_entity.dart';
import 'package:equatable/equatable.dart';
import 'package:meta/meta.dart';

@immutable
abstract class NoteState extends Equatable {
  NoteState();

  @override
  List<Object> get props => [];
}

class NoteLoading extends NoteState {}

class NoteLoaded extends NoteState {
  final List<NoteEntity> fruits;

  NoteLoaded(this.fruits);

  @override
  List<Object> get props => [fruits];
}
