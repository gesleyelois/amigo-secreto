class SecretSanta {
    constructor() {
        this.participants = this.retrieveParticipantsFromStorage() || [];
        this.setupEvents();
        this.updateParticipantsList();
    }

    addParticipant() {
        const input = document.getElementById('participantInput');
        const participant = input.value.trim();

        if (participant !== '') {
            if (this.participants.includes(participant)) {
                alert('Este participante já foi adicionado.');
                input.value = '';
                return;
            }

            this.participants.push(participant);
            this.updateParticipantsList();
            this.saveParticipantsToStorage();
            input.value = '';
        }
    }

    removeParticipant(index) {
        this.participants.splice(index, 1);
        this.updateParticipantsList();
        this.saveParticipantsToStorage();
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

        const uniqueParticipants = [...new Set(this.participants)];
        const shuffledParticipants = this.shuffle([...uniqueParticipants]);
        const result = {};
        const drawnParticipants = new Set();

        for (let i = 0; i < uniqueParticipants.length; i++) {
            let draw = shuffledParticipants[i];

            while (drawnParticipants.has(draw) || uniqueParticipants[i] === draw) {
                // Sortear novamente se já foi sorteado ou se é a própria pessoa
                draw = shuffledParticipants[(i + 1) % uniqueParticipants.length];
            }

            result[uniqueParticipants[i]] = draw;
            drawnParticipants.add(draw);
        }

        const finalResult = {
            participantes: uniqueParticipants.map(participant => ({ [participant]: this.encrypt(result[participant]) }))
        };

        localStorage.setItem('secretSantaResult', JSON.stringify(finalResult));
        window.location.href = 'resultado.html';
    }

    shuffle(array) {
        const shuffledArray = array.slice();
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
    }

    encrypt(text) {
        return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(text));
    }

    saveParticipantsToStorage() {
        localStorage.setItem('secretSantaParticipants', JSON.stringify(this.participants));
    }

    retrieveParticipantsFromStorage() {
        const storedParticipants = localStorage.getItem('secretSantaParticipants');
        return storedParticipants ? JSON.parse(storedParticipants) : null;
    }

    clearSecretSanta() {
        localStorage.clear();
        this.participants = [];
        this.updateParticipantsList();
    }

    setupEvents() {
        document.getElementById('addParticipantBtn').addEventListener('click', () => {
            this.addParticipant();
        });

        document.getElementById('drawSecretSantaBtn').addEventListener('click', () => {
            this.drawSecretSanta();
        });

        document.getElementById('clearSecretSantaBtn').addEventListener('click', () => {
            this.clearSecretSanta();
        });
    }
}

new SecretSanta();
