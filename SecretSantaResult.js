class SecretSantaResult {
    constructor() {
        this.resultDiv = document.getElementById('result');
    }

    showResult() {
        // Limpar o conteúdo existente
        this.resultDiv.innerHTML = '';

        this.resultDiv.innerHTML += '<h1>Resultado do Amigo Secreto</h1>';

        // Recuperar resultado do localStorage
        const encryptedResult = localStorage.getItem('secretSantaResult');

        if (encryptedResult) {
            try {
                const resultObj = JSON.parse(encryptedResult);

                if (resultObj && resultObj.participantes) {
                    // Exibir resultados para cada participante
                    resultObj.participantes.forEach(participantResult => {
                        const participantName = Object.keys(participantResult)[0];
                        const participantDraw = participantResult[participantName];

                        // Criar um link com o resultado como parâmetro
                        this.resultDiv.innerHTML += `<p><strong>${participantName}</strong> para visualizar seu amigo secreto clique <a href="meu-amigo-secreto.html?codigo=${participantDraw}" target="_blank">aqui</a>!</p>`;
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

    init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.showResult();
        });
    }
}

new SecretSantaResult().init();
