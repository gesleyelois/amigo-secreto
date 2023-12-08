class MySecretSanta {
    constructor() {
        this.resultDiv = document.getElementById('detalhe');
    }

    decrypt(encryptedText) {
        try {
            return CryptoJS.enc.Base64.parse(encryptedText).toString(CryptoJS.enc.Utf8);
        } catch (error) {
            console.error("Erro ao decifrar:", error);
            return "Erro ao decifrar o resultado.";
        }
    }

    init() {
        // Limpar o conteúdo existente
        this.resultDiv.innerHTML = '';

        this.resultDiv.innerHTML += '<h1>Meu amigo secreto é</h1>';

        // Recuperar parâmetro da URL
        const urlParams = new URLSearchParams(window.location.search);
        const resultadoParam = urlParams.get('codigo');

        if (resultadoParam) {
            const decryptedResult = this.decrypt(resultadoParam);
            this.resultDiv.innerHTML += `<p>${decryptedResult}</p>`;
        } else {
            this.resultDiv.innerHTML += '<p>Nenhum parâmetro encontrado.</p>';
        }
    }
}

new MySecretSanta().init();