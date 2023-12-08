class SecretSanta {
    constructor() {
        this.participants = [];

        this.setupEvents();
    }

    addParticipant() {
        const input = document.getElementById('participantInput');
        const participant = input.value.trim();

        if (participant !== '') {
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
            listItem.textContent = participant;

            const removeButton = document.createElement('button');
            removeButton.classList.add('close');
            removeButton.textContent = 'X';
            removeButton.addEventListener('click', () => this.removeParticipant(index));

            listItem.appendChild(removeButton);
            list.appendChild(listItem);
        });
    }

    drawSecretSanta() {
        if (this.participants.length < 3) {
            alert('É necessário ter mais que 2 participantes para realizar o sorteio.');
            return;
        }

        const shuffledParticipants = this.shuffle([...this.participants]);
        const result = {};

        for (let i = 0; i < this.participants.length; i++) {
            if (this.participants[i] === shuffledParticipants[i]) {
                const nextIndex = (i + 1) % this.participants.length;
                [shuffledParticipants[i], shuffledParticipants[nextIndex]] = [shuffledParticipants[nextIndex], shuffledParticipants[i]];
            }
            result[this.participants[i]] = shuffledParticipants[i];
        }

        const finalResult = {
            participantes: this.participants.map(participant => ({ [participant]: this.encrypt(result[participant]) }))
        };

        localStorage.setItem('secretSantaResult', JSON.stringify(finalResult));
        window.location.href = 'resultado.html';
    }

    shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
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
