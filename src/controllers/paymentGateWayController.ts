import { Request, Response } from 'express';
import Payment, { PaymentDocument } from '../model/payment';
import Invoice from '../model/invoice';
import * as Utils from "../Utils"
import Order, { OrderDocument } from '../model/order';
import fetch from 'node-fetch';



const paymentGatewayController = {
    addPayment: async (req: Request, res: Response) => {
        try {
            const newPayment = new Payment(req.body);
            const savedPayment: PaymentDocument = await newPayment.save();
            res.status(200).json(savedPayment);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    getAllPayment: async (req: Request, res: Response) => {
        try {
            const payments: PaymentDocument[] = await Payment.find().populate(["orderID", "gateWayID"]);
            res.status(200).json(payments);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    getPaymentByID: async (req: Request, res: Response) => {
        try {
            const payment: PaymentDocument | null = await Payment.findById(req.params.id).populate("orderID gateWayID");
            if (payment) {
                res.status(200).json(payment);
            } else {
                res.status(404).json({ message: "Payment not found" });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },
    updatePayment: async (req: Request, res: Response) => {
        try {
            const updatedPayment: PaymentDocument | null = await Payment.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (updatedPayment) {
                res.status(200).json(updatedPayment);
            } else {
                res.status(404).json({ message: "Payment not found" });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },
    deletePayment: async (req: Request, res: Response) => {
        try {
            await Invoice.updateMany({ paymentID: req.params.id }, { paymentID: null });
            const deletedPayment: PaymentDocument | null = await Payment.findByIdAndDelete(req.params.id);
            if (deletedPayment) {
                res.status(200).json({ message: "Payment deleted successfully" });
            } else {
                res.status(404).json({ message: "Payment not found" });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },

    payment: async (req: Request, res: Response) => {

        const order: OrderDocument | null = await Order.findById(req.params.id);
        console.log(order);
        if (order) {

            const currentTimeString = new Date().toISOString();
            const orderCode = "123456";
            console.log(orderCode);
            const orderAmount = 1000;
            const description = "LOL TAM";
            const items = ["LOL"];

            const body = {
                orderCode: parseInt(order._id, 10),
                amount: order.amount,
                description: 'Payment for your invoice',
                cancelUrl: '',
                returnUrl: '',
            }


            var bodyToSignature = Utils.createSignatureOfPaymentRequest(body, '807e8dca774da598d04ffb0816cd93020c2c37c34846f6f3536faa0f5d47df76');
            const body1 = {
                orderCode: parseInt(order._id, 10),
                amount: order.amount,
                description: 'Payment for your invoice',
                items: order.productList,
                cancelUrl: '',
                returnUrl: '',
                signature: bodyToSignature,

            }

            fetch('https://api-merchant.payos.vn/v2/payment-requests/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-client-id': '9493a6a9-258f-4022-b69f-7b5ebb2274e7',
                    'x-api-key': '0cdcad04-9e1e-4b85-82f2-e10c466a2d16'
                },
                body: JSON.stringify(body1)
            })
                .then((response: any) => response.json())
                .then((data: any) => {
                    res.json(data)
                });



        } else {
            res.status(404).json({ message: "Order not found" });
        }


    }
};

export default paymentGatewayController;

export function addPayment(req: Request, res: Response) {
    paymentGatewayController.addPayment(req, res)
}

export function getAllPayment(req: Request, res: Response) {
    paymentGatewayController.getAllPayment(req, res)
}

export function getPaymentByID(req: Request, res: Response) {
    paymentGatewayController.getPaymentByID(req, res)
}

export function updatePayment(req: Request, res: Response) {
    paymentGatewayController.updatePayment(req, res)
}

export function deletePayment(req: Request, res: Response) {
    paymentGatewayController.deletePayment(req, res)
}
