import { User } from "../entity";

export interface PaymentData<Meta> {
    item: string;
    amount: string;
    user: User;
    metadata: Meta;
}
