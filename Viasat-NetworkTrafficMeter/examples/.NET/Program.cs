using System;
using System.Net;
using System.Net.Sockets;
using System.Text;
using System.Threading;

namespace SocketCommunicationExample
{
    class Program
    {
        static void Main(string[] args)
        {
            try
            {
                /*
                * Para utilizar o traffic_analyzer_v2.py com esse exemplo, remova as seguintes linhas:
                * 23-24, 26-27, 31-32, 34-35, 39-40, 45-48
                */
                // Create three client sockets and connect each socket to a specific port.
                Socket socket1 = new Socket(AddressFamily.InterNetwork, SocketType.Stream, ProtocolType.Tcp);
                socket1.Connect(new IPEndPoint(IPAddress.Parse("127.0.0.1"), 50000));

                Socket socket2 = new Socket(AddressFamily.InterNetwork, SocketType.Stream, ProtocolType.Tcp);
                socket2.Connect(new IPEndPoint(IPAddress.Parse("127.0.0.1"), 50001));

                Socket socket3 = new Socket(AddressFamily.InterNetwork, SocketType.Stream, ProtocolType.Tcp);
                socket3.Connect(new IPEndPoint(IPAddress.Parse("127.0.0.1"), 50002));

                // Start a new thread for each socket to send data to the server.
                Thread t1 = new Thread(() => SendData(socket1));
                Thread t2 = new Thread(() => SendData(socket2));
                Thread t3 = new Thread(() => SendData(socket3));
                t1.Start();
                t2.Start();
                t3.Start();

                // Wait for all threads to complete.
                t1.Join();
                t2.Join();
                t3.Join();

                // Close the sockets.
                socket1.Shutdown(SocketShutdown.Both);
                socket1.Close();
                socket2.Shutdown(SocketShutdown.Both);
                socket2.Close();
                socket3.Shutdown(SocketShutdown.Both);
                socket3.Close();
            }
            catch (Exception e)
            {
                Console.WriteLine($"Exception: {e.Message}");
            }
        }

        static void SendData(Socket socket)
        {
            try
            {
                // Send data to the server.
                string message = $"Hello from port {((IPEndPoint)socket.LocalEndPoint).Port}";
                byte[] buffer = Encoding.ASCII.GetBytes(message);
                socket.Send(buffer);

                // Receive a response from the server.
                buffer = new byte[1024];
                int bytesReceived = socket.Receive(buffer);
                string response = Encoding.ASCII.GetString(buffer, 0, bytesReceived);
                Console.WriteLine($"Received response on port {((IPEndPoint)socket.LocalEndPoint).Port}: {response}");

                // Close the connection only if the server wants to close it.
                while (true)
                {
                    buffer = new byte[1024];
                    bytesReceived = socket.Receive(buffer);
                    response = Encoding.ASCII.GetString(buffer, 0, bytesReceived);
                    Console.WriteLine($"Received response on port {((IPEndPoint)socket.LocalEndPoint).Port}: {response}");
                }
            }
            catch (Exception e)
            {
                Console.WriteLine($"Exception: {e.Message}");
            }
        }
    }
}