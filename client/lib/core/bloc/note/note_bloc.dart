import 'dart:async';
import 'package:bloc/bloc.dart';
import 'package:client/core/db/dao/note_dao.dart';
import './bloc.dart';

class NoteBloc extends Bloc<NoteEvent, NoteState> {
  final _noteDao = NoteDao();

  @override
  NoteState get initialState => NoteLoading();

  @override
  Stream<NoteState> mapEventToState(NoteEvent event) async* {
    if (event is LoadEvent) {
      yield NoteLoading();
      yield* _reloadNotes();
    } else if (event is AddOrUpdateEvent) {
      await _noteDao.addOrUpdate(event.note);
      yield* _reloadNotes();
    } else if (event is DeleteEvent) {
      await _noteDao.delete(event.note);
      yield* _reloadNotes();
    }
  }

  Stream<NoteState> _reloadNotes() async* {
    final notes = await _noteDao.getAllSortedByName();
    // Yielding a state bundled with the Fruits from the database.
    yield NoteLoaded(notes);
  }
}
