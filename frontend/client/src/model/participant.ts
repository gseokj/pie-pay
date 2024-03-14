import {Member} from './member'

export interface Participant extends Member{
    payAgree:boolean,
    isDrinkAlcohol:boolean,
    payAmount:number
}