const net = require('net');
const fs = require('fs');

const HOST = '127.0.0.1';
const PORT_NETWORK_TRAFFIC = 50000;
// const jsonObject = {
//   app: []
// };

// // Define o caminho do arquivo
// const filePath = './db.json';

// // Salva o conteúdo do JSON em um arquivo
// fs.appendFile(filePath, JSON.stringify(jsonObject), 'utf8', (err) => {
//   if (err) {
//     console.error('Erro ao salvar o arquivo JSON:', err);
//     return;
//   }
//   console.log('Arquivo JSON salvo com sucesso.');
// });

// Connect to the server socket
const network_client = new net.Socket();
network_client.connect(PORT_NETWORK_TRAFFIC, HOST, () => {
  console.log('Conectado ao provedor de tráfego por aplicativo.');
});

// Receive data from the server
network_client.on('data', (data) => {
  console.log('Dado recebido do network_client:', data.toString());

  if (data) {
    const regex = /\[([\s\S]+)\]/;  // Expressão regular para encontrar o conteúdo entre colchetes
    const match = data.toString().match(regex);  // Executa o match com a expressão regular

    if (match && match[0]) {
      const jsonString = match[0];

      const jsonObject = {
        app: JSON.parse(jsonString)
      };

      // Define o caminho do arquivo
      const filePath = './db.json';

      // Salva o conteúdo do JSON em um arquivo
      fs.writeFile(filePath, JSON.stringify(jsonObject), 'utf8', (err) => {
        if (err) {
          console.error('Erro ao salvar o arquivo JSON:', err);
          return;
        }
        console.log('Arquivo JSON salvo com sucesso.');
      });
    }
  }
});
// network_client.on('data', (data) => {
//   console.log('Dado recebido do network_client:', data.toString());

//   // Lê o arquivo JSON atual
//   fs.readFile(filePath, 'utf8', (err, fileData) => {
//     if (err) {
//       console.error('Erro ao ler o arquivo JSON:', err);
//       return;
//     }

//     // Converte o conteúdo do arquivo JSON em um objeto
//     const jsonData = JSON.parse(fileData);

//     // Adiciona dados ao objeto JSON
//     // const newAppData = { name: 'App1', download: 100 };  // Exemplo de novos dados
//     if (data) {
//       const regex = /\[([\s\S]+)\]/;  // Expressão regular para encontrar o conteúdo entre colchetes
//       const match = data.toString().match(regex);  // Executa o match com a expressão regular

//       if (match && match[0]) {
//         const jsonString = match[0];

//         jsonData.app.push(JSON.parse(jsonString));

//         // Converte o objeto de volta para JSON
//         const updatedJsonString = JSON.stringify(jsonData, null, 2);

//         // Salva o conteúdo do JSON atualizado no arquivo
//         fs.writeFile(filePath, updatedJsonString, 'utf8', (err) => {
//           if (err) {
//             console.error('Erro ao salvar o arquivo JSON:', err);
//             return;
//           }
//           console.log('Objeto JSON atualizado e salvo com sucesso.');
//         });
//       }
//     }


//   });



// });

// Handle errors
network_client.on('error', (error) => {
  console.error('Erro recebido no network_client:', error);
});

// Close the connection when done
network_client.on('close', () => {
  console.log('Conexão encerrada com o network_client.');
});
