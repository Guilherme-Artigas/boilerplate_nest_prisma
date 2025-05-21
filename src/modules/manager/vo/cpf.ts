import { BadRequestException } from '@nestjs/common';

export default class Cpf {
    private CPF_LENGTH = 11;
    private FACTOR_FIRST_DIGIT = 10;
    private FACTOR_SECOND_DIGIT = 11;
    private value: string;

    constructor(cpf: string) {
        if (!this.validateCpf(cpf)) throw new BadRequestException('Invalid cpf')
        this.value = this.removeNonDigits(cpf);
    }

    validateCpf(rawCpf: string) {
        if (!rawCpf) return false;
        const cpf = this.removeNonDigits(rawCpf);
        if (cpf.length !== this.CPF_LENGTH) return false;
        if (this.allDigitsTheSame(cpf)) return false;
        const digit1 = this.calculateDigit(cpf, this.FACTOR_FIRST_DIGIT);
        const digit2 = this.calculateDigit(cpf, this.FACTOR_SECOND_DIGIT);
        return this.extractActualDigit(cpf) === `${digit1}${digit2}`;
    }

    private removeNonDigits(cpf: string) {
        return cpf.replace(/\D/g, "");
    }

    private allDigitsTheSame(cpf: string) {
        const [firstDigit] = cpf;
        return [...cpf].every(digit => digit === firstDigit);
    }

    private calculateDigit(cpf: string, factor: number) {
        let total = 0;
        for (const digit of cpf) {
            if (factor > 1) total += parseInt(digit) * factor--;
        }
        const remainder = total % 11;
        return (remainder < 2) ? 0 : 11 - remainder;
    }

    private extractActualDigit(cpf: string) {
        return cpf.slice(9);
    }

    getValue() {
        return this.value;
    }
}
