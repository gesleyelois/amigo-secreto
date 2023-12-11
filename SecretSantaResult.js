class SecretSantaResult {
    constructor() {
        this.resultDiv = document.getElementById('result');
        this.init();
    }

    showResult() {
        this.resultDiv.innerHTML = '';

        this.resultDiv.innerHTML += '<h1>Resultado do Amigo Secreto</h1>';

        const encryptedResult = localStorage.getItem('secretSantaResult');

        if (encryptedResult) {
            try {
                const resultObj = JSON.parse(encryptedResult);

                if (resultObj && resultObj.participantes) {
                    resultObj.participantes.forEach(participantResult => {
                        const participantName = Object.keys(participantResult)[0];
                        const participantDraw = participantResult[participantName];

                        const resultText = `<strong>${participantName}</strong> para visualizar seu amigo secreto clique <a href="meu-amigo-secreto.html?codigo=${participantDraw}" target="_blank">aqui</a>!`;

                        const link = `${window.location.origin}/amigo-secreto/meu-amigo-secreto.html?codigo=${participantDraw}`;
                        const resultTextToCopy = `*${participantName}* para visualizar seu amigo secreto acesse o link: ${link}`;

                        this.resultDiv.innerHTML += `<p>${resultText} <button onclick="secretSantaResult.copyTextToClipboard(this, '${resultTextToCopy}')">Copiar</button></p>`;
                    });
                } else {
                    this.resultDiv.innerHTML += '<p>Formato de resultado inválido.</p>';
                }
            } catch (error) {
                this.resultDiv.innerHTML += '<p>Erro ao analisar o resultado.</p>';
            }
        } else {
            this.resultDiv.innerHTML = '<p>Nenhum resultado encontrado.</p>';
        }
    }

    copyTextToClipboard(button, text) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);

        textarea.select();
        document.execCommand('copy');

        document.body.removeChild(textarea);

        console.log('Texto copiado para a área de transferência!');

        button.textContent = 'Texto copiado!';

        setTimeout(() => {
            button.textContent = 'Copiar';
        }, 3000);
    }

    init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.showResult();
        });
    }
}

const secretSantaResult = new SecretSantaResult();
