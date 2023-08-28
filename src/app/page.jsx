"use client"

import axios from 'axios';
import styles from './page.module.css';
import QRCodeReader from '@/components/leitorQrCode';


function App() {

  let readResults = new Set();

const onNewScanResult = (decodedText, decodedResult) => {
  if (decodedText && !readResults.has(decodedText)) {

    // Decodifica o texto // caue catone silva:12345:5 semestre
    function parseInfo(input) {
      const parts = input.split(':'); // Divide a string usando ':' como separador
      if (parts.length === 3) {
        const [name, ra, semestre] = parts;
        return { name, ra, semestre };
      } else {
        return null; // Retorna null se o formato não for válido
      }
    }
    
    const input = decodedText;
    const parsedInfo = parseInfo(input);

    
    if (parsedInfo) {
      console.log("Nome:", parsedInfo.name);
      console.log("RA:", parsedInfo.ra);
      console.log("Semestre:", parsedInfo.semestre);

      saveAluno(parsedInfo.name, parsedInfo.ra, parsedInfo.semestre);

    } else {
      console.log("Formato de entrada inválido.");
    }

        // salvar no banco o nome ra e semestre 
        async function saveAluno(name, ra, semestre) {

          await axios.post('http://localhost:3003/cadastroAluno', {
            name , 
            ra, 
            semestre
          })
        }

    readResults.add(decodedText);

    // Configura um timer para redefinir o conjunto após 10 horas (36000000 milissegundos)
    setTimeout(() => {
      readResults.clear();
    }, 36000000); // 10 horas em milissegundos
  }
};
  

  return (

    <div className={styles.container} >
      
      <div className={styles.content}>

        <div className={styles.Conteudocontent}>

          <h1>Faça a leitura do ticket aqui</h1>

          <span className={styles.text} htmlFor="username">Aponte o Qr-code para a camera</span>

        </div>

      </div>

      <div className={styles.ticket} id="ticket">

      <h1>Leitor de QR Code</h1>

      <QRCodeReader 
                fps={10}
                qrbox={250}
                disableFlip={false}
                qrCodeSuccessCallback={onNewScanResult}
                />
      </div>

    </div>
  );
}

export default App;
