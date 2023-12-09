class SecretSanta {
    constructor() {
        this.participants = [];
        this.setupEvents();
    }

    addParticipant() {
        const input = document.getElementById('participantInput');
        const participant = input.value.trim();

        if (participant !== '') {
            // Verificar se o participante já está na lista
            if (this.participants.includes(participant)) {
                alert('Este participante já foi adicionado.');
                input.value = '';
                return;
            }

            this.participants.push(participant);
            this.updateParticipantsList();
            input.value = '';
        }
    }

    removeParticipant(index) {
        this.participants.splice(index, 1);
        this.updateParticipantsList();
    }

    updateParticipantsList() {
        const list = document.getElementById('participantsList');
        list.innerHTML = '';

        this.participants.forEach((participant, index) => {
            const listItem = document.createElement('li');

            const spanItem = document.createElement('span');
            spanItem.textContent = participant;

            const removeButton = document.createElement('button');
            removeButton.classList.add('close');
            removeButton.textContent = 'X';
            removeButton.addEventListener('click', () => this.removeParticipant(index));

            listItem.appendChild(spanItem);
            listItem.appendChild(removeButton);
            list.appendChild(listItem);
        });
    }

    drawSecretSanta() {
        if (this.participants.length < 3) {
            alert('É necessário ter mais que 2 participantes para realizar o sorteio.');
            return;
        }


        const uniqueParticipants = [...new Set(this.participants)]; // Remover participantes duplicados
        const shuffledParticipants = this.shuffle([...uniqueParticipants]);
        const result = {};

        for (let i = 0; i < uniqueParticipants.length; i++) {
            if (uniqueParticipants[i] === shuffledParticipants[i]) {
                const nextIndex = (i + 1) % uniqueParticipants.length;
                [shuffledParticipants[i], shuffledParticipants[nextIndex]] = [shuffledParticipants[nextIndex], shuffledParticipants[i]];
            }
            result[uniqueParticipants[i]] = shuffledParticipants[i];
        }

        const finalResult = {
            participantes: uniqueParticipants.map(participant => ({ [participant]: this.encrypt(result[participant]) }))
        };

        localStorage.setItem('secretSantaResult', JSON.stringify(finalResult));
        window.location.href = 'resultado.html';
    }

    shuffle(array) {
        const shuffledArray = array.slice(); // Criar uma cópia do array para não modificar o original
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
    }

    encrypt(text) {
        return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(text));
    }

    setupEvents() {
        document.getElementById('addParticipantBtn').addEventListener('click', () => {
            this.addParticipant();
        });

        document.getElementById('drawSecretSantaBtn').addEventListener('click', () => {
            this.drawSecretSanta();
        });
    }
}

new SecretSanta();
