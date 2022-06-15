type Room = {
    id: string;
    players: Player[];
    questions: Question[];
    current_question: number;
    scene: number;
}

type Player = {
    name: string;
    score: number;
}

type Question = {
    type: string;
    description: string;
    reward: number;
    groupOne: Player[];
    groupTwo: Player[];
}