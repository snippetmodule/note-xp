import 'package:client/core/model/note_entity.dart';
import 'package:client/generated/json/base/json_convert_content.dart';
import 'package:sembast/sembast.dart';
import '../app_database.dart';

class NoteDao {
  static const String NOTE_STORE_NAME = 'note';

  // A Store with int keys and Map<String, dynamic> values.
  // This Store acts like a persistent map, values of which are Note objects converted to Map
  final _noteStore = intMapStoreFactory.store(NOTE_STORE_NAME);

  // Private getter to shorten the amount of code needed to get the
  // singleton instance of an opened database.
  Future<Database> get _db async => await AppDatabase.instance.database;

  Future insert(NoteEntity note) async {
    await _noteStore.add(await _db, note.toJson());
  }

  Future addOrUpdate(NoteEntity note) async {
    if (note.id > 0) {
      return await insert(note);
    }
    // For filtering by key (ID), RegEx, greater than, and many other criteria,
    // we use a Finder.
    final finder = Finder(filter: Filter.byKey(note.id));
    await _noteStore.update(
      await _db,
      note.toJson(),
      finder: finder,
    );
  }

  Future update(NoteEntity note) async {
    // For filtering by key (ID), RegEx, greater than, and many other criteria,
    // we use a Finder.
    final finder = Finder(filter: Filter.byKey(note.id));
    await _noteStore.update(
      await _db,
      note.toJson(),
      finder: finder,
    );
  }

  Future delete(NoteEntity note) async {
    final finder = Finder(filter: Filter.byKey(note.id));
    await _noteStore.delete(
      await _db,
      finder: finder,
    );
  }

  Future<List<NoteEntity>> getAllSortedByName() async {
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
      final note = JsonConvert.fromJsonAsT(snapshot) as NoteEntity;
      // An ID is a key of a record from the database.
      note.id = snapshot.key;
      return note;
    }).toList();
  }
}
