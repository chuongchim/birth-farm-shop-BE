import { Router } from "express";
import * as gatewayController from "../controllers/gatewayController";
import middlewareController from "../middleware/middlewareController";
import * as Utils from "../Utils"

import fetch from 'node-fetch';
import paymentGatewayController from "../controllers/paymentGateWayController";


// const Utils = require('./Utils');



const router = Router();

// ADD Gateway
router.post("/", gatewayController.addGateway);

// GET ALL Gateway
router.get("/", gatewayController.getAllGateway);

// GET AN Gateway
router.get("/:id", gatewayController.getGatewayByID);

// UPDATE Gateway
router.put("/:id", gatewayController.updateGateway);

// DELETE Gateway
router.delete("/:id", gatewayController.deleteGateway);


router.post('/createOrder/:id', paymentGatewayController.payment);
    // , function () {

    //     const currentTimeString = new Date().toISOString();
    //     // const orderCode = parseInt(currentTimeString.substring(currentTimeString.length - 6), 10);
    //     const orderCode = "123456";

    //     console.log(orderCode);

    //     const orderAmount = 1000;
    //     const description = "LOL TAM";
    //     const items = ["LOL"];



    //     const body = {
    //         orderCode: 12345,
    //         amount: 1000,
    //         description: 'Payment for a new product',
    //         cancelUrl: '',
    //         returnUrl: '',
    //     }


    //     var bodyToSignature = Utils.createSignatureOfPaymentRequest(body, '807e8dca774da598d04ffb0816cd93020c2c37c34846f6f3536faa0f5d47df76');
    //     const body1 = {
    //         orderCode: 12345,
    //         amount: 1000,
    //         description: 'Payment for a new product',
    //         items: ["ssdfsdf"],
    //         cancelUrl: '',
    //         returnUrl: '',
    //         signature: bodyToSignature,

    //     }

    //     fetch('https://api-merchant.payos.vn/v2/payment-requests/', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'x-client-id': '9493a6a9-258f-4022-b69f-7b5ebb2274e7',
    //             'x-api-key': '0cdcad04-9e1e-4b85-82f2-e10c466a2d16'
    //         },
    //         body: JSON.stringify(body1)
    //     })
    //         .then((response: any) => response.json())
    //         .then((data: any) => {
    //             console.log(data);
    //         });
    // }
    // );

export default router;
