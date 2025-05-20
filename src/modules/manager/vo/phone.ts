import { BadRequestException } from '@nestjs/common';

export default class Phone {
    private readonly PHONE_LENGTH = 11;
    private readonly CELLPHONE_FIRST_DIGIT = '9';
    private value: string;

    constructor(phone: string) {
        if (!this.validatePhone(phone)) {
            throw new BadRequestException('Invalid phone number');
        }
        this.value = this.removeNonDigits(phone);
    }

    private validatePhone(rawPhone: string): boolean {
        if (!rawPhone) return false;
        const phone = this.removeNonDigits(rawPhone);
        if (phone.length !== this.PHONE_LENGTH) return false;
        if (!this.startsWithNine(phone)) return false;
        if (this.allDigitsTheSame(phone)) return false;
        return true;
    }

    private removeNonDigits(phone: string): string {
        return phone.replace(/\D/g, '');
    }

    private startsWithNine(phone: string): boolean {
        return phone.charAt(2) === this.CELLPHONE_FIRST_DIGIT;
    }

    private allDigitsTheSame(phone: string): boolean {
        const [firstDigit] = phone;
        return [...phone].every(d => d === firstDigit);
    }

    getValue(): string {
        return this.value;
    }
}
