import 'package:sembast/sembast.dart';
import '../app_database.dart';
import 'package:client/core/model/note.dart';

class NoteDao {
  static const String NOTE_STORE_NAME = 'note';

  // A Store with int keys and Map<String, dynamic> values.
  // This Store acts like a persistent map, values of which are Note objects converted to Map
  final _noteStore = intMapStoreFactory.store(NOTE_STORE_NAME);

  // Private getter to shorten the amount of code needed to get the
  // singleton instance of an opened database.
  Future<Database> get _db async => await AppDatabase.instance.database;

  Future insert(Note note) async {
    await _noteStore.add(await _db, note.toJson(note));
  }

  Future addOrUpdate(Note note) async {
    if (note.id > 0) {
      return await insert(note);
    }
    // For filtering by key (ID), RegEx, greater than, and many other criteria,
    // we use a Finder.
    final finder = Finder(filter: Filter.byKey(note.id));
    await _noteStore.update(
      await _db,
      note.toJson(note),
      finder: finder,
    );
  }

  Future update(Note note) async {
    // For filtering by key (ID), RegEx, greater than, and many other criteria,
    // we use a Finder.
    final finder = Finder(filter: Filter.byKey(note.id));
    await _noteStore.update(
      await _db,
      note.toJson(note),
      finder: finder,
    );
  }

  Future delete(Note note) async {
    final finder = Finder(filter: Filter.byKey(note.id));
    await _noteStore.delete(
      await _db,
      finder: finder,
    );
  }

  Future<List<Note>> getAllSortedByName() async {
    // Finder object can also sort data.
    final finder = Finder(sortOrders: [
      SortOrder('createTime'),
    ]);

    final recordSnapshots = await _noteStore.find(
      await _db,
      finder: finder,
    );

    // Making a List<Note> out of List<RecordSnapshot>
    return recordSnapshots.map((snapshot) {
      final note = Note.fromJson(snapshot.value);
      // An ID is a key of a record from the database.
      note.id = snapshot.key;
      return note;
    }).toList();
  }
}
