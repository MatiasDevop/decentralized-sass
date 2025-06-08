import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = "Kirat123"

const router = Router();

const prismaClient = new PrismaClient();

// Signin with wallet
//Signing a message
router.post("/signin", async (req, res) => {
    // Todo: Add sign verification logic here
    const hardcodedWalletAddress = "6HpxEYAkCiPhK3yzk95AAoeMRELogvC8wpTG6H2jnzuT";

    const existingUser = await prismaClient.user.findFirst({
        where:{
            address: hardcodedWalletAddress
        }
    })

    if(existingUser) {
        const token = jwt.sign({
            userId: existingUser.id
        }, JWT_SECRET)

        res.json({
            token
        })
    } else {
        const user = await prismaClient.user.create({
            data: {
                address: hardcodedWalletAddress
            }
        })

        const token = jwt.sign({
            userId: user.id
        }, JWT_SECRET)

        res.json({
            token
        })
    }

});

export default router;
