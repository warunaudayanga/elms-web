// noinspection JSUnusedGlobalSymbols,SpellCheckingInspection

import { v4 as uuid } from "uuid";
import { Quiz } from "../../system/shared/interfaces/quiz.interfaces";
import { QuizDraft } from "../../system/shared/types/quiz.types";

export class Globals {
    static SAMPLE_QUIZ_LIST: Quiz[] = [
        {
            id: uuid(),
            question: "In which Italian city can you find the Colosseum?",
            options: ["Rome", "Venice", "Florence", "Milan"],
            answer: ["Venice"],
        },
        {
            id: uuid(),
            question: "In the TV show New Girl, which actress plays Jessica Day?",
            answer: ["Zooey Deschanel"],
        },
        {
            id: uuid(),
            question: "Which of the following is the largest organ in the human body?",
            options: ["Liver", "Skin", "Heart", "Brain"],
            answer: ["Skin"],
            multiple: true,
        },
        {
            id: uuid(),
            question: "What is the tallest mammal?",
            options: ["Elephant", "Giraffe", "Horse", "Rhinoceros"],
            answer: ["Giraffe"],
        },
        {
            id: uuid(),
            question: "What is the name of the smallest planet in our solar system?",
            options: ["Jupiter", "Mars", "Mercury", "Venus"],
            answer: ["Mercury"],
            multiple: true,
        },
        {
            id: uuid(),
            question: "Which of the following animals can change its color?",
            options: ["Lion", "Chimpanzee", "Gorilla", "Chameleon"],
            answer: ["Chameleon"],
        },
        {
            id: uuid(),
            question: "What is the name of the largest ocean on Earth?",
            options: ["Atlantic", "Indian", "Arctic", "Pacific"],
            answer: ["Pacific"],
        },
        {
            id: uuid(),
            question: "Which of the following animals has the longest lifespan?",
            options: ["Tortoise", "Elephant", "Lion", "Crocodile"],
            answer: ["Tortoise"],
        },
        {
            id: uuid(),
            question: "Which of the following is not a primary color?",
            options: ["Red", "Blue", "Green", "Yellow"],
            answer: ["Green"],
        },
        {
            id: uuid(),
            question: "What is the name of the largest desert in the world?",
            options: ["Gobi", "Sahara", "Kalahari", "Mojave"],
            answer: ["Sahara"],
        },
        {
            id: uuid(),
            question: "What is the name of the second highest mountain in the world?",
            options: ["Mount Kilimanjaro", "Mount Everest", "K2", "Mount Denali"],
            answer: ["K2"],
        },
        {
            id: uuid(),
            question: "Which of the following is the largest bird in the world?",
            options: ["Ostrich", "Emu", "Penguin", "Albatross"],
            answer: ["Ostrich"],
        },
        {
            id: uuid(),
            question: "What is the name of the world's largest reef system?",
            options: ["Great Barrier Reef", "Red Sea Coral Reef", "Andros Coral Reef", "Mesoamerican Barrier Reef"],
            answer: ["Great Barrier Reef"],
        },
        {
            id: uuid(),
            question: "What is the name of the longest river in Africa?",
            options: ["Nile", "Congo", "Zambezi", "Niger"],
            answer: ["Nile"],
        },
        {
            id: uuid(),
            question: "Which of the following animals has the highest body temperature?",
            options: ["Horse", "Lion", "Elephant", "Bird"],
            answer: ["Bird"],
        },
        {
            id: uuid(),
            question: "What is the name of the largest rodent in the world?",
            options: ["Gopher", "Hamster", "Capybara", "Beaver"],
            answer: ["Capybara"],
        },
        {
            id: uuid(),
            question: "Which of the following is the largest mammal in the world?",
            options: ["Elephant", "Hippopotamus", "Whale", "Giraffe"],
            answer: ["Whale"],
        },
        {
            id: uuid(),
            question: "What is the name of the smallest country in the world?",
            options: ["Vatican City", "Monaco", "Nauru", "San Marino"],
            answer: ["Vatican City"],
        },
        {
            id: uuid(),
            question: "Which of the following animals is not a mammal?",
            options: ["Kangaroo", "Platypus", "Shark", "Polar Bear"],
            answer: ["Shark"],
        },
        {
            id: uuid(),
            question: "What is the name of the highest mountain in Africa?",
            options: ["Mount Everest", "Mount Kilimanjaro", "Mount Denali", "Mount Aconcagua"],
            answer: ["Mount Kilimanjaro"],
        },
        {
            id: uuid(),
            question: "Which of the following is the largest reptile in the world?",
            options: ["Crocodile", "Turtle", "Lizard", "Snake"],
            answer: ["Crocodile"],
        },
        {
            id: uuid(),
            question: "What is the name of the largest waterfall in the world?",
            options: ["Niagara Falls", "Angel Falls", "Iguazu Falls", "Victoria Falls"],
            answer: ["Victoria Falls"],
        },
        {
            id: uuid(),
            question: "Which of the following countries is not in Europe?",
            options: ["France", "Spain", "Russia", "Mexico"],
            answer: ["Mexico"],
        },
        {
            id: uuid(),
            question: "What is the name of the world's largest island?",
            options: ["Greenland", "Australia", "Iceland", "Madagascar"],
            answer: ["Greenland"],
        },
        {
            id: uuid(),
            question: "Which of the following planets is closest to the Sun?",
            options: ["Venus", "Earth", "Mars", "Mercury"],
            answer: ["Mercury"],
        },
        {
            id: uuid(),
            question: "What is the name of the largest freshwater lake in the world?",
            options: ["Lake Superior", "Caspian Sea", "Lake Victoria", "Lake Baikal"],
            answer: ["Lake Superior"],
        },
        {
            id: uuid(),
            question: "Which of the following is the largest moon in the Solar System?",
            options: ["Ganymede", "Titan", "Europa", "Callisto"],
            answer: ["Ganymede"],
        },
        {
            id: uuid(),
            question: "Which of the following is the largest moon in the Solar System?",
            options: ["Ganymede", "Titan", "Europa", "Callisto"],
            answer: ["Ganymede"],
        },
        {
            id: uuid(),
            question: "What is the name of the largest bird of prey?",
            options: ["Eagle", "Falcon", "Owl", "Vulture"],
            answer: ["Vulture"],
        },
        {
            id: uuid(),
            question: "What is the name of the largest carnivorous marsupial?",
            options: ["Kangaroo", "Wombat", "Koala", "Tasmanian Devil"],
            answer: ["Tasmanian Devil"],
        },
        {
            id: uuid(),
            question: "Which of the following is not a type of cloud?",
            options: ["Cumulus", "Stratus", "Nimbus", "Tsunami"],
            answer: ["Tsunami"],
        },
        {
            id: uuid(),
            question: "What is the name of the highest mountain in North America?",
            options: ["Mount McKinley", "Mount Kilimanjaro", "Mount Everest", "Mount Elbrus"],
            answer: ["Mount McKinley"],
        },
        {
            id: uuid(),
            question: "Which of the following is the smallest continent by land area?",
            options: ["Asia", "Australia", "Europe", "South America"],
            answer: ["Australia"],
        },
        {
            id: uuid(),
            question: "What is the name of the longest river in the world?",
            options: ["Nile", "Amazon", "Yangtze", "Mississippi"],
            answer: ["Nile"],
        },
        {
            id: uuid(),
            question: "Which of the following is the largest fish in the world?",
            options: ["Blue Whale", "Hammerhead Shark", "Great White Shark", "Whale Shark"],
            answer: ["Whale Shark"],
        },
        {
            id: uuid(),
            question: "What is the name of the smallest planet in the Solar System?",
            options: ["Jupiter", "Mars", "Mercury", "Venus"],
            answer: ["Mercury"],
        },
        {
            id: uuid(),
            question: "Which of the following is the largest tree species in the world?",
            options: ["Sequoia", "Banyan", "Oak", "Maple"],
            answer: ["Sequoia"],
        },
        {
            id: uuid(),
            question: "What is the name of the largest continent by land area?",
            options: ["Asia", "Australia", "Europe", "South America"],
            answer: ["Asia"],
        },
        {
            id: uuid(),
            question: "Which of the following animals is not a mammal?",
            options: ["Kangaroo", "Platypus", "Shark", "Polar Bear"],
            answer: ["Shark"],
        },
        {
            id: uuid(),
            question: "What is the name of the highest mountain in Africa?",
            options: ["Mount Everest", "Mount Kilimanjaro", "Mount Denali", "Mount Aconcagua"],
            answer: ["Mount Kilimanjaro"],
        },
        {
            id: uuid(),
            question: "Which of the following is the largest reptile in the world?",
            options: ["Crocodile", "Turtle", "Lizard", "Snake"],
            answer: ["Crocodile"],
        },
        {
            id: uuid(),
            question: "What is the name of the largest waterfall in the world?",
            options: ["Niagara Falls", "Angel Falls", "Iguazu Falls", "Victoria Falls"],
            answer: ["Victoria Falls"],
        },
        {
            id: uuid(),
            question: "Which of the following countries is not in Europe?",
            options: ["France", "Spain", "Russia", "Mexico"],
            answer: ["Mexico"],
        },
        {
            id: uuid(),
            question: "What is the name of the world's largest island?",
            options: ["Greenland", "Australia", "Iceland", "Madagascar"],
            answer: ["Greenland"],
        },
        {
            id: uuid(),
            question: "Which of the following planets is closest to the Sun?",
            options: ["Venus", "Earth", "Mars", "Mercury"],
            answer: ["Mercury"],
        },
        {
            id: uuid(),
            question: "What is the name of the largest freshwater lake in the world?",
            options: ["Lake Superior", "Caspian Sea", "Lake Victoria", "Lake Baikal"],
            answer: ["Lake Superior"],
        },
        {
            id: uuid(),
            question: "Which of the following is the largest moon in the Solar System?",
            options: ["Ganymede", "Titan", "Europa", "Callisto"],
            answer: ["Ganymede"],
        },
        {
            id: uuid(),
            question: "What is the name of the largest bird of prey?",
            options: ["Eagle", "Falcon", "Owl", "Vulture"],
            answer: ["Vulture"],
        },
        {
            id: uuid(),
            question: "What is the name of the largest carnivorous marsupial?",
            options: ["Kangaroo", "Wombat", "Koala", "Tasmanian Devil"],
            answer: ["Tasmanian Devil"],
        },
        {
            id: uuid(),
            question: "Which of the following is not a type of cloud?",
            options: ["Cumulus", "Stratus", "Nimbus", "Tsunami"],
            answer: ["Tsunami"],
        },
    ];

    static SAMPLE_QUIZ_DRAFT_LIST = Globals.SAMPLE_QUIZ_LIST.map(
        (q): QuizDraft => ({ ...q, choice: Boolean(q.options), options: q.options?.map(o => ({ value: o })) ?? [] }),
    );
}
