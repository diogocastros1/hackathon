import 'dart:io';

void main() async {
  try {
    // Para utilizar esse exemplo com o traffic_analyzer_v2.py, remova as linhas 8-9
    var futures = <Future>[];
    futures.add(handleSocketConnection(50000));
    futures.add(handleSocketConnection(50001));
    futures.add(handleSocketConnection(50002));
    await Future.wait(futures);
  } catch (e) {
    print('Error: $e');
  }
}

Future<void> handleSocketConnection(int port) async {
  try {
    var socket = await Socket.connect('localhost', port);
    print('Connected to port $port.');

    await for (var data in socket) {
      print('Received from port $port: ${String.fromCharCodes(data)}');
    }
  } catch (e) {
    print('Error in connection to port $port: $e');
  }
}