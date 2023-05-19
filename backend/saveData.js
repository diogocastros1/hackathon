const net = require('net');
const fs = require('fs');






const HOST = '127.0.0.1';
const PORT_NETWORK_TRAFFIC = 50000;

// Connect to the server socket
const network_client = new net.Socket();
network_client.connect(PORT_NETWORK_TRAFFIC, HOST, () => {
    console.log('Conectado ao provedor de trafégo por aplicativo.');
});

// Receive data from the server
network_client.on('data', (data) => {
    console.log('Dado recebido do network_client:', data.toString());
    const jsonData = JSON.stringify(data);
    
fs.writeFile('./db.json', jsonData, 'utf8', (err) => {
  if (err) {
    console.error('Erro ao salvar o arquivo JSON:', err);
    return;
  }
  console.log('Arquivo JSON salvo com sucesso.');
});

});

// Handle errors
network_client.on('error', (error) => {
    console.error('Erro recebido no network_client:', error);
});

// Close the connection when done
network_client.on('close', () => {
    console.log('Conexão encerrada com o network_client.');
});
