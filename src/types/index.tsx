export interface AutomataSchema {
    type: string;
    states: string[];
    symbols: string[];
}

export interface Payload{
    type: 'dfa' | 'nfa';
    states: string[];
    symbols: string[];
    startState: string;
    finalStates: string[];
    transitionTable: { [state: string]: { [symbol: string]: string | string[] } };
}