import { ItemOrderedDTO } from './item-ordered.dto';
import { PaymentDTO } from './payment.dto';
import { RefDTO } from './ref.dto';

export interface OrderDTO{
    customer : RefDTO;
    deliveryAdress : RefDTO;
    payment : PaymentDTO;
    items : ItemOrderedDTO[];

}