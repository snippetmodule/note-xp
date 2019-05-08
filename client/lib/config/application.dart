import 'package:fluro/fluro.dart';
import 'routes.dart';

class Application {
  static Router router;

  static void init() {
    router = Router();
    Routes.configureRoutes(router);
  }
}
